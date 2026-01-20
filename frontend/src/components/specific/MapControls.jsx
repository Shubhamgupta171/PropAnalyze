import React from 'react';
import { Layers, Plus, Minus, Crosshair } from 'lucide-react';

const MapControls = ({ onZoomIn, onZoomOut }) => {
    const containerStyle = {
        position: 'absolute',
        bottom: '20px',
        right: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        zIndex: 10
    };

    const btnStyle = {
        width: '40px',
        height: '40px',
        backgroundColor: '#181a19',
        border: '1px solid #2a2d2c',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
        transition: 'all 0.2s',
        cursor: 'pointer'
    };

    return (
        <div style={containerStyle}>
            <button style={btnStyle} title="Layers"><Layers size={20} /></button>
            <div style={{...containerStyle, position: 'static', flexDirection: 'column', gap: 0, borderRadius: '20px', overflow: 'hidden', border: '1px solid #2a2d2c'}}>
                 <button onClick={onZoomIn} style={{...btnStyle, borderRadius: 0, border: 'none', borderBottom: '1px solid #2a2d2c'}} title="Zoom In"><Plus size={20} /></button>
                 <button onClick={onZoomOut} style={{...btnStyle, borderRadius: 0, border: 'none'}} title="Zoom Out"><Minus size={20} /></button>
            </div>
             <button style={btnStyle} title="Locate"><Crosshair size={20} /></button>
        </div>
    );
};

export default MapControls;
