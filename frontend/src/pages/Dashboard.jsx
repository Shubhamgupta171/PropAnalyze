import MapHeader from '../components/specific/MapHeader';
import MapControls from '../components/specific/MapControls';
import PropertyCard from '../components/specific/PropertyCard';
import MapBackground from '../components/common/MapBackground';
import MapInteractionOverlay from '../components/specific/MapInteractionOverlay';
import { MapPin } from 'lucide-react';

const Dashboard = () => {
    // Mock Pins configuration
    const pins = [
        { id: 1, price: '$850k', x: '20%', y: '40%' },
        { id: 2, price: '$1.2M', x: '65%', y: '25%' },
        { id: 3, price: '$620k', x: '75%', y: '60%' },
    ];

  return (
    <MapBackground>
      <MapHeader />


      {/* Pins Layer */}
      {pins.map(pin => (
          <div key={pin.id} style={{
              position: 'absolute',
              left: pin.x,
              top: pin.y,
              backgroundColor: '#1f2221',
              padding: '6px 12px',
              borderRadius: '20px',
              border: '1px solid #333',
              color: '#fff',
              fontWeight: '600',
              fontSize: '0.75rem',
              cursor: 'pointer',
              transform: 'translate(-50%, -50%)',
              boxShadow: '0 2px 4px rgba(0,0,0,0.5)'
          }}>
              {pin.price}
          </div>
      ))}

      {/* Active Property Card (Centered/Mocked as selected) */}
      <div style={{
          position: 'absolute',
          top: '55%', /* Slightly below center */
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 5
      }}>
          <div style={{
              position: 'absolute', 
              top: 0, 
              left: '50%', 
              transform: 'translate(-50%, -100%)',
              marginBottom: '10px'
          }}>
               {/* Active Pin Indicator */}
               <div style={{
                   backgroundColor: '#f97316', /* Orange accent for selected as per image */
                   color: '#fff',
                   padding: '6px 16px',
                   borderRadius: '20px',
                   fontWeight: 'bold',
                   fontSize: '0.85rem',
                   boxShadow: '0 0 15px rgba(249, 115, 22, 0.4)',
                   whiteSpace: 'nowrap'
               }}>
                   $450k
               </div>
               
               {/* Arrow pointing down */}
               <div style={{
                   width: 0, 
                   height: 0, 
                   borderLeft: '8px solid transparent',
                   borderRight: '8px solid transparent',
                   borderTop: '8px solid #f97316',
                   margin: '0 auto'
               }}></div>
          </div>

          <PropertyCard />
      </div>

      <MapControls />
      {/* For demo purposes, we can toggle this or show it initially */}
      {/* <MapInteractionOverlay /> */}
    </MapBackground>
  );
};

export default Dashboard;
