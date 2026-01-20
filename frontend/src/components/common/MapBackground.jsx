import React from 'react';

const MapBackground = ({ children, opacity = 0.3, zoom = 1, offset = { x: 0, y: 0 } }) => {
  return (
    <div style={{ 
      position: 'relative', 
      width: '100%', 
      height: '100%', 
      backgroundColor: '#0f1110', 
      overflow: 'hidden',
      cursor: 'grab'
    }}>
      {/* Transformation Layer */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        transformOrigin: '0 0',
        transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
        transition: 'transform 0.1s ease-out',
        pointerEvents: 'none'
      }}>
        <div style={{ 
          position: 'absolute', 
          inset: '-2000px', /* Oversized to handle panning */
          backgroundImage: 'linear-gradient(#1f2221 1px, transparent 1px), linear-gradient(90deg, #1f2221 1px, transparent 1px)', 
          backgroundSize: '40px 40px',
          opacity: opacity
        }}></div>
        
         <svg style={{position: 'absolute', top: 0, left: 0, width: '1000%', height: '1000%', opacity: 0.2, pointerEvents: 'none'}}>
              <path d="M0,300 Q400,250 800,400 T1200,300" stroke="#333" strokeWidth="4" fill="none"/>
              <path d="M200,0 Q250,300 100,600" stroke="#333" strokeWidth="4" fill="none"/>
              <path d="M600,0 Q550,400 700,800" stroke="#333" strokeWidth="4" fill="none"/>
         </svg>
      </div>

      {children}
    </div>
  );
};

export default MapBackground;
