import React from 'react';
import { FileText, Download, CheckCircle } from 'lucide-react';

const ReportGenerationGuide = ({ onClose }) => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#1c1e1d',
        borderRadius: '16px',
        padding: '32px',
        maxWidth: '600px',
        width: '100%',
        border: '1px solid #333',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            backgroundColor: 'rgba(74, 222, 128, 0.1)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <FileText size={24} color="#4ade80" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'white', marginBottom: '4px' }}>
              Generate PDF Reports
            </h2>
            <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
              Professional investment analysis reports
            </p>
          </div>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '600', color: 'white', marginBottom: '16px' }}>
            How it works:
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              {
                step: '1',
                title: 'Adjust Your Analysis',
                description: 'Set your investment assumptions (purchase price, down payment, interest rate, etc.)',
                icon: '📊'
              },
              {
                step: '2',
                title: 'Click Generate Report',
                description: 'Click the "Generate Report" button in the header. Your analysis will be saved automatically.',
                icon: '🎯'
              },
              {
                step: '3',
                title: 'PDF is Created',
                description: 'Our system generates a professional PDF with all your investment metrics and recommendations.',
                icon: '📄'
              },
              {
                step: '4',
                title: 'Download & Share',
                description: 'View your report in the Reports page. Download and share with lenders or partners.',
                icon: '⬇️'
              }
            ].map((item) => (
              <div key={item.step} style={{
                display: 'flex',
                gap: '16px',
                padding: '16px',
                backgroundColor: '#0f1110',
                borderRadius: '12px',
                border: '1px solid #333'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: 'rgba(74, 222, 128, 0.1)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                  flexShrink: 0
                }}>
                  {item.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: '700',
                      color: '#4ade80',
                      backgroundColor: 'rgba(74, 222, 128, 0.1)',
                      padding: '2px 8px',
                      borderRadius: '4px'
                    }}>
                      STEP {item.step}
                    </span>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: '600', color: 'white' }}>
                      {item.title}
                    </h4>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#9ca3af', lineHeight: '1.5' }}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          padding: '16px',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderRadius: '12px',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          marginBottom: '24px'
        }}>
          <h4 style={{ fontSize: '0.9rem', fontWeight: '600', color: '#3b82f6', marginBottom: '8px' }}>
            📋 What's Included in Your Report:
          </h4>
          <ul style={{ 
            margin: 0, 
            paddingLeft: '20px', 
            color: '#93c5fd', 
            fontSize: '0.85rem',
            lineHeight: '1.8'
          }}>
            <li>Property overview and details</li>
            <li>Investment strategy information</li>
            <li>Key financial metrics (Cap Rate, Cash-on-Cash, ROI)</li>
            <li>Complete investment breakdown</li>
            <li>Monthly income & expense analysis</li>
            <li>Automated investment recommendation</li>
            <li>Professional branding and disclaimer</li>
          </ul>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: '12px',
              backgroundColor: '#4ade80',
              border: 'none',
              borderRadius: '8px',
              color: '#000',
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: '0.95rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <CheckCircle size={18} />
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportGenerationGuide;
