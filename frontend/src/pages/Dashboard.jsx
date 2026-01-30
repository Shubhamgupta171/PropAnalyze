import React, { useState, useEffect } from 'react';
import MapHeader from '../components/specific/MapHeader';
import MapControls from '../components/specific/MapControls';
import PropertyCard from '../components/specific/PropertyCard';
import MapBackground from '../components/common/MapBackground';
import MapInteractionOverlay from '../components/specific/MapInteractionOverlay';
import { MapPin, Plus } from 'lucide-react';
import propertyService from '../services/property.service';
import toast from 'react-hot-toast';
import CreatePropertyModal from '../components/specific/CreatePropertyModal';

const Dashboard = () => {
    const [properties, setProperties] = useState([]);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Zoom and Pan State
    const [zoom, setZoom] = useState(1);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await propertyService.getAllProperties({ limit: 100 });
                const fetchedProperties = response.status === 'success' ? response.data.properties : [];
                setProperties(fetchedProperties);
                if (fetchedProperties.length > 0) {
                    setSelectedProperty(fetchedProperties[0]);
                }
            } catch (error) {
                console.error('Error fetching properties:', error);
                toast.error('Failed to load properties for dashboard');
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    // Zoom Handlers
    const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 3));
    const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.5));

    // Pan Handlers
    const handleMouseDown = (e) => {
        setIsDragging(true);
        setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        setOffset({
            x: e.clientX - dragStart.x,
            y: e.clientY - dragStart.y
        });
    };

    const handleMouseUp = () => setIsDragging(false);

    // Helper to generate consistent, scattered positions based on ID
    const getPropertiesWithPositions = (props) => {
        return props.map((p) => {
            // Simple hash function to generate stable pseudo-random positions from UUID
            const hash = p.id.split('-').reduce((acc, part) => acc + parseInt(part, 16), 0);
            const x = 15 + (hash % 70); // Scatter between 15% and 85%
            const y = 20 + ((hash * 7) % 60); // Scatter between 20% and 80%
            
            return {
                ...p,
                x: `${x}%`,
                y: `${y}%`
            };
        });
    };

    // Helper to format price for pins
    const formatPriceForPin = (price) => {
        if (price >= 1000000) {
            return `$${(price / 1000000).toFixed(1)}M`;
        }
        return `$${(price / 1000).toFixed(0)}k`;
    };

    const propertiesWithPos = getPropertiesWithPositions(properties);

  return (
    <div 
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }}
    >
      <MapBackground zoom={zoom} offset={offset}>
        <MapHeader />

        {/* Pins Transformation Layer - Match Background */}
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
            {/* Pins Layer */}
            {!loading && propertiesWithPos.map(prop => {
                const isActive = selectedProperty?.id === prop.id;
                return (
                    <div 
                        key={prop.id} 
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProperty(prop);
                        }}
                        style={{
                            position: 'absolute',
                            left: prop.x,
                            top: prop.y,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            transform: 'translate(-50%, -100%)', // Tip of arrow at coordinates
                            zIndex: isActive ? 100 : 1,
                            pointerEvents: 'auto',
                            cursor: 'pointer',
                            transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                        }}
                    >
                        {/* The Property Card anchored to the pin when active */}
                        {isActive && (
                            <div style={{
                                width: '300px',
                                marginBottom: '14px',
                                transform: `scale(${1/zoom})`, // Scale card inversely to zoom to keep perceived size
                                transformOrigin: 'bottom center',
                                pointerEvents: 'auto',
                                filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))'
                            }}>
                                <PropertyCard property={prop} />
                                {/* Arrow pointing from card to pin */}
                                <div style={{
                                    width: 0, 
                                    height: 0, 
                                    borderLeft: '10px solid transparent',
                                    borderRight: '10px solid transparent',
                                    borderTop: '10px solid #1c1e1d', /* Match card background */
                                    margin: '0 auto',
                                    marginTop: '-1px'
                                }}></div>
                            </div>
                        )}

                        <div style={{
                            backgroundColor: isActive ? '#f97316' : 'rgba(24, 26, 25, 0.95)',
                            padding: '6px 14px',
                            borderRadius: '24px',
                            border: isActive ? '2px solid #fff' : '1px solid #3a3f3e',
                            color: '#fff',
                            fontWeight: '700',
                            fontSize: '0.8rem',
                            whiteSpace: 'nowrap',
                            boxShadow: isActive ? '0 0 20px rgba(249, 115, 22, 0.6)' : '0 4px 6px rgba(0,0,0,0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            transition: 'all 0.2s',
                            transform: isActive ? 'scale(1.1)' : 'scale(1)'
                        }}>
                            {formatPriceForPin(prop.price)}
                        </div>
                    </div>
                );
            })}
        </div>

        {loading && (
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: '#4ade80',
                fontWeight: 600
            }}>
                Loading Map Listings...
            </div>
        )}

        <MapControls onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />
        
        {/* Floating Action Button for Adding Property */}
        <button 
            onClick={() => setIsModalOpen(true)}
            style={{
                position: 'absolute',
                top: '100px',
                right: '25px',
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: '#4ade80',
                color: '#1c1e1d',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(74, 222, 128, 0.4)',
                zIndex: 100,
                transition: 'all 0.2s'
            }}
            onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
        >
            <Plus size={24} />
        </button>

        <CreatePropertyModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            onPropertyCreated={(newProp) => {
                setProperties([...properties, newProp]);
                setSelectedProperty(newProp);
            }}
        />
      </MapBackground>
    </div>
  );
};

export default Dashboard;
