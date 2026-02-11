const fs = require('fs').promises;
const path = require('path');
const { cloudinary } = require('../config/cloudinary.config');

let chromium = {};
let puppeteer = {};

// Verify environment
if (process.env.AWS_LAMBDA_FUNCTION_VERSION || process.env.VERCEL || process.env.NODE_ENV === 'production') {
  // Vercel / Lambda environment
  chromium = require('@sparticuz/chromium');
  puppeteer = require('puppeteer-core');
} else {
  // Local development
  try {
    puppeteer = require('puppeteer');
  } catch (e) {
    console.warn('Puppeteer not found, falling back to puppeteer-core or failing.');
  }
}

class PDFService {
  /**
   * Generate PDF from HTML template with data injection
   */
  async generateReport(propertyData, analysisData, userData) {
    let browser = null;
    try {
      // Read HTML template
      const templatePath = path.join(__dirname, '../templates/report.html');
      let htmlTemplate = await fs.readFile(templatePath, 'utf-8');

      // Prepare data for template
      const templateData = this.prepareTemplateData(propertyData, analysisData, userData);

      // Replace placeholders in template
      htmlTemplate = this.injectDataIntoTemplate(htmlTemplate, templateData);

      // Launch Browser
      if (process.env.AWS_LAMBDA_FUNCTION_VERSION || process.env.VERCEL || process.env.NODE_ENV === 'production') {
        browser = await puppeteer.launch({
          args: chromium.args,
          defaultViewport: chromium.defaultViewport,
          executablePath: await chromium.executablePath(),
          headless: chromium.headless,
          ignoreHTTPSErrors: true,
        });
      } else {
        browser = await puppeteer.launch({
          headless: 'new',
          args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
      }

      const page = await browser.newPage();
      
      // Set content and wait for network idle to ensure fonts/CSS load
      await page.setContent(htmlTemplate, { waitUntil: 'networkidle0' });

      // Generate PDF
      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
          top: '20px',
          right: '20px',
          bottom: '20px',
          left: '20px'
        }
      });

      await browser.close();
      browser = null;

      return pdfBuffer;
    } catch (error) {
      console.error('PDF Generation Error:', error);
      if (browser) await browser.close();
      throw new Error('Failed to generate PDF report: ' + error.message);
    }
  }

  /**
   * Prepare data for template injection
   */
  prepareTemplateData(property, analysis, user) {
    const metrics = analysis.metrics || {};
    const inputs = analysis.inputs || {};

    // Calculate derived values
    const capRate = parseFloat(metrics.capRate || 0).toFixed(2);
    const cashOnCash = parseFloat(metrics.cashOnCash || 0).toFixed(2);
    const monthlyCashFlow = parseFloat(metrics.monthlyCashFlow || 0).toFixed(2);
    const annualROI = parseFloat(metrics.annualROI || 0).toFixed(2);

    // Investment breakdown
    const purchasePrice = parseFloat(property.price || 0);
    const downPaymentPercent = parseFloat(inputs.downPaymentPercent || 20);
    const downPayment = (purchasePrice * downPaymentPercent / 100).toFixed(2);
    const closingCostPercent = parseFloat(inputs.closingCostPercent || 3);
    const closingCosts = (purchasePrice * closingCostPercent / 100).toFixed(2);
    const repairCosts = parseFloat(inputs.repairCosts || 0).toFixed(2);
    const totalCashRequired = (parseFloat(downPayment) + parseFloat(closingCosts) + parseFloat(repairCosts)).toFixed(2);

    // Monthly expenses
    const monthlyRent = parseFloat(inputs.monthlyRent || 0).toFixed(2);
    const mortgagePayment = parseFloat(metrics.mortgagePayment || 0).toFixed(2);
    const propertyTax = parseFloat(inputs.propertyTax || 0).toFixed(2);
    const insurance = parseFloat(inputs.insurance || 0).toFixed(2);
    const hoaFees = parseFloat(inputs.hoaFees || 0).toFixed(2);
    const maintenance = parseFloat(inputs.maintenance || 0).toFixed(2);
    const vacancy = parseFloat(inputs.vacancy || 0).toFixed(2);

    // Determine recommendation
    const recommendation = this.generateRecommendation(capRate, cashOnCash, monthlyCashFlow);

    // Format location
    const location = property.location || {};
    const address = location.address || 'N/A';

    return {
      // Report meta
      reportId: `RPT-${Date.now()}`,
      generatedDate: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      analystName: user.name || user.email || 'PropAnalyze User',

      // Property details
      propertyTitle: property.title || 'Investment Property',
      propertyAddress: address,
      propertyPrice: this.formatNumber(property.price),
      propertyType: property.category || 'Residential',
      sqft: this.formatNumber(property.sqft || 0),
      beds: property.beds || 'N/A',
      baths: property.baths || 'N/A',
      yearBuilt: property.year_built || 'N/A',

      // Strategy
      strategy: analysis.strategy || 'Cash',

      // Key metrics
      capRate,
      cashOnCash,
      monthlyCashFlow: this.formatNumber(Math.abs(monthlyCashFlow)),
      cashFlowClass: parseFloat(monthlyCashFlow) >= 0 ? 'positive' : 'negative',
      cashFlowBg: parseFloat(monthlyCashFlow) >= 0 ? '#d4edda' : '#f8d7da',
      annualROI,

      // Investment breakdown
      purchasePrice: this.formatNumber(purchasePrice),
      downPayment: this.formatNumber(downPayment),
      downPaymentPercent,
      closingCosts: this.formatNumber(closingCosts),
      closingCostPercent,
      repairCosts: this.formatNumber(repairCosts),
      totalCashRequired: this.formatNumber(totalCashRequired),

      // Monthly income/expenses
      monthlyRent: this.formatNumber(monthlyRent),
      mortgagePayment: this.formatNumber(mortgagePayment),
      propertyTax: this.formatNumber(propertyTax),
      insurance: this.formatNumber(insurance),
      hoaFees: this.formatNumber(hoaFees),
      maintenance: this.formatNumber(maintenance),
      vacancy: this.formatNumber(vacancy),

      // Recommendation
      recommendationStatus: recommendation.status,
      recommendationText: recommendation.text,
      recommendationBg: recommendation.bg,
      recommendationBorder: recommendation.border,
      recommendationColor: recommendation.color,
      recommendationBadge: recommendation.badge
    };
  }

  /**
   * Generate investment recommendation based on metrics
   */
  generateRecommendation(capRate, cashOnCash, monthlyCashFlow) {
    const cap = parseFloat(capRate);
    const coc = parseFloat(cashOnCash);
    const flow = parseFloat(monthlyCashFlow);

    if (cap >= 8 && coc >= 10 && flow > 0) {
      return {
        status: 'STRONG BUY',
        text: 'This property shows excellent investment potential with strong cap rate, cash-on-cash return, and positive cash flow. Highly recommended for portfolio addition.',
        bg: '#d4edda',
        border: '#28a745',
        color: '#155724',
        badge: 'badge-success'
      };
    } else if (cap >= 6 && coc >= 8 && flow >= 0) {
      return {
        status: 'BUY',
        text: 'This property demonstrates good investment metrics with solid returns. Recommended for consideration with standard due diligence.',
        bg: '#d1ecf1',
        border: '#17a2b8',
        color: '#0c5460',
        badge: 'badge-success'
      };
    } else if (cap >= 4 && coc >= 5) {
      return {
        status: 'HOLD/CONSIDER',
        text: 'This property shows moderate investment potential. Further analysis and market comparison recommended before proceeding.',
        bg: '#fff3cd',
        border: '#ffc107',
        color: '#856404',
        badge: 'badge-warning'
      };
    } else {
      return {
        status: 'PASS',
        text: 'Current metrics do not meet minimum investment criteria. Consider renegotiating price or exploring alternative financing strategies.',
        bg: '#f8d7da',
        border: '#dc3545',
        color: '#721c24',
        badge: 'badge-danger'
      };
    }
  }

  /**
   * Inject data into HTML template
   */
  injectDataIntoTemplate(template, data) {
    let result = template;
    
    // Replace all {{placeholder}} with actual values
    Object.keys(data).forEach(key => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      result = result.replace(regex, data[key]);
    });

    return result;
  }

  /**
   * Format number with commas
   */
  formatNumber(num) {
    const number = parseFloat(num);
    if (isNaN(number)) return '0';
    return number.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
  }

  /**
   * Upload PDF to Cloudinary and return URL
   */
  async uploadToCloudinary(pdfBuffer, fileName) {
    try {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: 'raw',
            folder: 'reports',
            public_id: fileName,
            format: 'pdf'
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result.secure_url);
            }
          }
        );

        uploadStream.end(pdfBuffer);
      });
    } catch (error) {
      console.error('Cloudinary Upload Error:', error);
      throw new Error('Failed to upload PDF to cloud storage');
    }
  }

  /**
   * Generate and upload report
   */
  async generateAndUploadReport(propertyData, analysisData, userData) {
    // Generate PDF
    const pdfBuffer = await this.generateReport(propertyData, analysisData, userData);

    // Create unique filename
    const fileName = `report_${propertyData.id}_${analysisData.id}_${Date.now()}`;

    // Upload to Cloudinary
    const fileUrl = await this.uploadToCloudinary(pdfBuffer, fileName);

    return {
      buffer: pdfBuffer,
      url: fileUrl,
      fileName: `${fileName}.pdf`
    };
  }
}

module.exports = new PDFService();
