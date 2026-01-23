import React, { useState, useRef } from 'react';
import { X, Upload, Plus } from 'lucide-react';
import propertyService from '../../services/property.service';
import toast from 'react-hot-toast';

const CreatePropertyModal = ({ isOpen, onClose, onPropertyCreated }) => {
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        beds: '',
        baths: '',
        sqft: '',
        description: '',
        asset_class: 'Residential',
        location: JSON.stringify({
            type: 'Point',
            coordinates: [-122.4194, 37.7749], // San Francisco default
            address: 'San Francisco, CA'
        })
    });
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        if (e.target.files) {
            setImages([...images, ...Array.from(e.target.files)]);
        }
    };

    const removeImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        images.forEach(image => data.append('images', image));

        try {
            const response = await propertyService.createProperty(data);
            toast.success('Property created successfully!');
            onPropertyCreated(response.data.property);
            onClose();
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || 'Failed to create property');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(4px)'
        }}>
            <div style={{
                backgroundColor: '#181a19',
                width: '90%',
                maxWidth: '600px',
                borderRadius: '16px',
                border: '1px solid #3a3f3e',
                display: 'flex',
                flexDirection: 'column',
                maxHeight: '90vh'
            }}>
                <div style={{
                    padding: '20px',
                    borderBottom: '1px solid #3a3f3e',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <h2 style={{ color: '#fff', fontSize: '1.25rem', fontWeight: 600 }}>Add New Property</h2>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer' }}>
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} style={{ padding: '20px', overflowY: 'auto' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                        <div style={{ gridColumn: 'span 2' }}>
                            <label style={{ display: 'block', color: '#9ca3af', marginBottom: '6px', fontSize: '0.875rem' }}>Title</label>
                            <input 
                                type="text" 
                                name="title" 
                                value={formData.title} 
                                onChange={handleChange} 
                                required
                                style={{ width: '100%', padding: '10px', backgroundColor: '#212423', border: '1px solid #3a3f3e', borderRadius: '8px', color: '#fff' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', color: '#9ca3af', marginBottom: '6px', fontSize: '0.875rem' }}>Price ($)</label>
                            <input 
                                type="number" 
                                name="price" 
                                value={formData.price} 
                                onChange={handleChange} 
                                required
                                style={{ width: '100%', padding: '10px', backgroundColor: '#212423', border: '1px solid #3a3f3e', borderRadius: '8px', color: '#fff' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', color: '#9ca3af', marginBottom: '6px', fontSize: '0.875rem' }}>Beds</label>
                            <input 
                                type="number" 
                                name="beds" 
                                value={formData.beds} 
                                onChange={handleChange} 
                                style={{ width: '100%', padding: '10px', backgroundColor: '#212423', border: '1px solid #3a3f3e', borderRadius: '8px', color: '#fff' }}
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', color: '#9ca3af', marginBottom: '6px', fontSize: '0.875rem' }}>Images (Max 10)</label>
                        <div style={{ 
                            display: 'flex', 
                            flexWrap: 'wrap', 
                            gap: '10px', 
                            padding: '16px', 
                            border: '2px dashed #3a3f3e', 
                            borderRadius: '12px',
                            minHeight: '100px'
                        }}>
                            {images.map((img, i) => (
                                <div key={i} style={{ position: 'relative', width: '80px', height: '80px' }}>
                                    <img 
                                        src={URL.createObjectURL(img)} 
                                        alt="preview" 
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} 
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => removeImage(i)}
                                        style={{ 
                                            position: 'absolute', 
                                            top: '-5px', 
                                            right: '-5px', 
                                            backgroundColor: '#ef4444', 
                                            color: '#fff', 
                                            border: 'none', 
                                            borderRadius: '50%', 
                                            width: '20px', 
                                            height: '20px',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <X size={12} />
                                    </button>
                                </div>
                            ))}
                            {images.length < 10 && (
                                <button 
                                    type="button"
                                    onClick={() => fileInputRef.current.click()}
                                    style={{ 
                                        width: '80px', 
                                        height: '80px', 
                                        backgroundColor: '#212423', 
                                        border: '1px solid #3a3f3e', 
                                        borderRadius: '8px', 
                                        display: 'flex', 
                                        justifyContent: 'center', 
                                        alignItems: 'center',
                                        color: '#6b7280',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <Plus size={24} />
                                </button>
                            )}
                        </div>
                        <input 
                            type="file" 
                            multiple 
                            ref={fileInputRef} 
                            style={{ display: 'none' }} 
                            onChange={handleImageChange}
                            accept="image/*"
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        style={{ 
                            width: '100%', 
                            padding: '12px', 
                            backgroundColor: '#4ade80', 
                            color: '#1c1e1d', 
                            border: 'none', 
                            borderRadius: '8px', 
                            fontWeight: 700,
                            cursor: 'pointer',
                            marginTop: '10px'
                        }}
                    >
                        {loading ? 'Creating...' : 'Create Property'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreatePropertyModal;
