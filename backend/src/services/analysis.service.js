const Property = require('../models/property.model');
const AppError = require('../utils/AppError');

class AnalysisService {
  async calculateROI(propertyId, reqData = {}) {
    const property = await Property.findById(propertyId);
    if (!property) {
      throw new AppError('Property not found', 404);
    }

    const purchasePrice = Number(reqData.purchasePrice) || Number(property.price);
    const rehabCost = Number(reqData.rehabCost) || 0;
    
    // Financing
    const downPaymentPercent = Number(reqData.downPayment) || 20; 
    const interestRate = Number(reqData.interestRate) || 6.5; 
    const loanTermYears = 30;

    const downPaymentAmt = purchasePrice * (downPaymentPercent / 100);
    const loanAmount = purchasePrice - downPaymentAmt;
    
    // Mortgage
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTermYears * 12;
    const monthlyMortgage = monthlyRate > 0 
      ? loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
      : loanAmount / numberOfPayments;
    
    // Income & Expenses
    const monthlyRent = Number(reqData.monthlyRent) || (purchasePrice * 0.008); 
    const vacancyRate = Number(reqData.vacancyRate) || 0.05;
    const managementFee = Number(reqData.managementFee) || 0.08;
    const annualTaxes = Number(reqData.annualTaxes) || (purchasePrice * 0.012);
    const annualInsurance = Number(reqData.annualInsurance) || 1200;

    // Calculations
    const annualGrossRent = monthlyRent * 12;
    const effectiveGrossIncome = annualGrossRent * (1 - vacancyRate);
    
    const operatingExpenses = 
      annualTaxes + 
      annualInsurance + 
      (effectiveGrossIncome * managementFee) + 
      (effectiveGrossIncome * 0.05); // Maintenance

    const noi = effectiveGrossIncome - operatingExpenses;
    const annualDebtService = monthlyMortgage * 12;
    const cashFlow = noi - annualDebtService;
    
    const totalCashInvested = downPaymentAmt + rehabCost + (purchasePrice * 0.03);
    
    const capRate = purchasePrice > 0 ? (noi / purchasePrice) * 100 : 0;
    const cashOnCash = totalCashInvested > 0 ? (cashFlow / totalCashInvested) * 100 : 0;

    return {
      property: {
        title: property.title,
        price: property.price,
        address: property.location?.address
      },
      inputs: {
        purchasePrice,
        rehabCost,
        downPaymentPercent,
        interestRate,
        loanAmount
      },
      metrics: {
        annualGrossRent,
        effectiveGrossIncome,
        operatingExpenses: parseFloat(operatingExpenses.toFixed(2)),
        detailedExpenses: {
          taxes: parseFloat(annualTaxes.toFixed(2)),
          insurance: parseFloat(annualInsurance.toFixed(2)),
          management: parseFloat((effectiveGrossIncome * managementFee).toFixed(2)),
          maintenance: parseFloat((effectiveGrossIncome * 0.05).toFixed(2))
        },
        noi: parseFloat(noi.toFixed(2)),
        annualDebtService: parseFloat(annualDebtService.toFixed(2)),
        monthlyMortgage: parseFloat(monthlyMortgage.toFixed(2)),
        monthlyCashFlow: parseFloat((cashFlow / 12).toFixed(2)),
        annualCashFlow: parseFloat(cashFlow.toFixed(2)),
        totalCashInvested: parseFloat(totalCashInvested.toFixed(2)),
        capRate: parseFloat(capRate.toFixed(2)),
        cashOnCash: parseFloat(cashOnCash.toFixed(2))
      }
    };
  }

  async calculateMaxOffer(propertyId, targetCoC, reqData = {}) {
    // Basic approximation: Iteratively find price that hits target CoC
    // Or solve algebraically: CashFlow / totalCashInvested = targetCoC
    // (NOI - DebtService) / (DownPayment + Rehab + Closing) = targetCoC
    // For now, simple implementation logic:
    const property = await Property.findById(propertyId);
    const rehabCost = Number(reqData.rehabCost) || 0;
    const target = Number(targetCoC) / 100;
    
    // Simplistic solve for purchase price (P):
    // This is complex due to mortgage dependence on P. 
    // We'll use a 20-step binary search or fixed approximation for MAO.
    let low = 0;
    let high = property.price * 2;
    let iterations = 0;
    let mao = property.price;

    while (iterations < 20) {
      mao = (low + high) / 2;
      const result = await this.calculateROI(propertyId, { ...reqData, purchasePrice: mao });
      if (result.metrics.cashOnCash / 100 > target) {
        low = mao;
      } else {
        high = mao;
      }
      iterations++;
    }

    return {
      maxAllowableOffer: mao,
      belowAsk: property.price - mao,
      targetCoC
    };
  }


  async getMarketStats() {
    const query = `
      SELECT 
        COUNT(*) as numProperties,
        AVG(price) as avgPrice,
        MIN(price) as minPrice,
        MAX(price) as maxPrice,
        AVG(CASE WHEN sqft > 0 THEN price / sqft ELSE NULL END) as avgPricePerSqFt
      FROM properties;
    `;
    const { rows } = await require('../config/db').query(query);
    
    const stats = rows[0];
    if (stats) {
      // PostgreSQL numeric results are strings, convert to numbers
      return {
        numProperties: parseInt(stats.numproperties || 0),
        avgPrice: parseFloat(stats.avgprice || 0),
        minPrice: parseFloat(stats.minprice || 0),
        maxPrice: parseFloat(stats.maxprice || 0),
        avgPricePerSqFt: parseFloat(stats.avgpricepersqft || 0)
      };
    }
    return null;
  }

  async saveAnalysis(userId, propertyId, strategy, metrics, inputs) {
    const query = `
      INSERT INTO analyses (user_id, property_id, strategy, metrics, inputs)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const { rows } = await require('../config/db').query(query, [userId, propertyId, strategy, JSON.stringify(metrics), JSON.stringify(inputs)]);
    return rows[0];
  }

  async getHistory(userId) {
    const query = `
      SELECT a.*, p.title as property_title, p.location->>'address' as address, (p.images)[1] as img
      FROM analyses a
      JOIN properties p ON a.property_id = p.id
      WHERE a.user_id = $1
      ORDER BY a.updated_at DESC;
    `;
    const { rows } = await require('../config/db').query(query, [userId]);
    return rows;
  }

  async deleteAnalysis(userId, analysisId) {
    const query = 'DELETE FROM analyses WHERE id = $1 AND user_id = $2';
    await require('../config/db').query(query, [analysisId, userId]);
  }
}

module.exports = new AnalysisService();
