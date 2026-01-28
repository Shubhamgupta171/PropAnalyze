import React, { useState, useEffect } from 'react';
import { Layers, Plus, ExternalLink, Trash2, FolderPlus, FileText } from 'lucide-react';
import portfolioService from '../services/portfolio.service';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Portfolios = () => {
    const [portfolios, setPortfolios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [newPortfolio, setNewPortfolio] = useState({ name: '', description: '' });
    const navigate = useNavigate();

    const fetchPortfolios = async () => {
        try {
            setLoading(true);
            const response = await portfolioService.getPortfolios();
            setPortfolios(response.data.portfolios);
        } catch (error) {
            console.error('Error fetching portfolios:', error);
            toast.error('Failed to load portfolios');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPortfolios();
    }, []);

    const handleCreatePortfolio = async (e) => {
        e.preventDefault();
        try {
            await portfolioService.createPortfolio(newPortfolio);
            toast.success('Portfolio created successfully');
            setIsCreateModalOpen(false);
            setNewPortfolio({ name: '', description: '' });
            fetchPortfolios();
        } catch (error) {
            toast.error('Failed to create portfolio');
        }
    };

    const handleDeletePortfolio = async (id) => {
        if (!window.confirm('Are you sure you want to delete this portfolio?')) return;
        try {
            await portfolioService.deletePortfolio(id);
            toast.success('Portfolio deleted');
            setPortfolios(portfolios.filter(p => p.id !== id));
        } catch (error) {
            toast.error('Failed to delete portfolio');
        }
    };

    return (
        <div style={{ padding: '2rem', backgroundColor: 'var(--bg-dark)', minHeight: '100vh', color: 'white' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '0.5rem' }}>Portfolios</h1>
                    <p style={{ color: '#9ca3af' }}>Manage your property groups and track aggregate performance.</p>
                </div>
                <button 
                    onClick={() => setIsCreateModalOpen(true)}
                    style={{ 
                        backgroundColor: 'var(--primary-green)', 
                        color: '#000', 
                        padding: '10px 20px', 
                        borderRadius: '999px',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        cursor: 'pointer',
                        border: 'none'
                    }}
                >
                    <Plus size={18} /> New Portfolio
                </button>
            </header>

            {loading ? (
                <div style={{ color: '#4ade80', textAlign: 'center', padding: '40px' }}>Loading portfolios...</div>
            ) : portfolios.length === 0 ? (
                <div style={{ 
                    textAlign: 'center', 
                    padding: '80px 20px', 
                    backgroundColor: 'var(--bg-card)', 
                    borderRadius: '16px',
                    border: '1px dashed #333'
                }}>
                    <FolderPlus size={48} color="#4b5563" style={{ marginBottom: '1rem' }} />
                    <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>No Portfolios Yet</h2>
                    <p style={{ color: '#9ca3af', marginBottom: '1.5rem' }}>Create your first portfolio to start grouping properties.</p>
                    <button 
                        onClick={() => setIsCreateModalOpen(true)}
                        style={{ color: 'var(--primary-green)', background: 'none', border: '1px solid var(--primary-green)', padding: '8px 20px', borderRadius: '999px', cursor: 'pointer' }}
                    >
                        Create Portfolio
                    </button>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
                    {portfolios.map(item => (
                        <div key={item.id} style={{
                            backgroundColor: 'var(--bg-card)',
                            borderRadius: '16px',
                            border: '1px solid var(--border-color)',
                            padding: '24px',
                            transition: 'transform 0.2s, border-color 0.2s',
                            cursor: 'default',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                                <div style={{ 
                                    width: '48px', height: '48px', 
                                    backgroundColor: 'rgba(74, 222, 128, 0.1)', 
                                    borderRadius: '12px', 
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: 'var(--primary-green)'
                                }}>
                                    <Layers size={24} />
                                </div>
                                <button 
                                    onClick={() => handleDeletePortfolio(item.id)}
                                    style={{ background: 'none', border: 'none', color: '#4b5563', cursor: 'pointer', hover: { color: '#ef4444' } }}
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>

                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '8px' }}>{item.name}</h3>
                            <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginBottom: '20px', height: '40px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {item.description || 'No description provided.'}
                            </p>

                            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', padding: '12px', backgroundColor: '#181a19', borderRadius: '8px' }}>
                                <div>
                                    <div style={{ fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Properties</div>
                                    <div style={{ fontSize: '1.1rem', fontWeight: '700' }}>{item.property_count || 0}</div>
                                </div>
                                <div style={{ width: '1px', backgroundColor: '#333' }}></div>
                                <div>
                                    <div style={{ fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</div>
                                    <div style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--primary-green)' }}>Active</div>
                                </div>
                            </div>

                            <button 
                                onClick={() => navigate(`/map?portfolio=${item.id}`)}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    backgroundColor: 'transparent',
                                    border: '1px solid #333',
                                    borderRadius: '8px',
                                    color: 'white',
                                    fontSize: '0.9rem',
                                    fontWeight: '500',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <ExternalLink size={16} /> View Details
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Create Modal */}
            {isCreateModalOpen && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        backgroundColor: '#1c1e1d', padding: '32px', borderRadius: '16px',
                        width: '100%', maxWidth: '450px', border: '1px solid #333'
                    }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Create New Portfolio</h2>
                        <form onSubmit={handleCreatePortfolio}>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', fontSize: '0.9rem', color: '#9ca3af', marginBottom: '8px' }}>Portfolio Name</label>
                                <input 
                                    type="text"
                                    required
                                    value={newPortfolio.name}
                                    onChange={(e) => setNewPortfolio({...newPortfolio, name: e.target.value})}
                                    style={{ width: '100%', padding: '12px', backgroundColor: '#0f1110', border: '1px solid #333', borderRadius: '8px', color: 'white' }}
                                    placeholder="e.g. Phoenix Rentals"
                                />
                            </div>
                            <div style={{ marginBottom: '2rem' }}>
                                <label style={{ display: 'block', fontSize: '0.9rem', color: '#9ca3af', marginBottom: '8px' }}>Description (Optional)</label>
                                <textarea 
                                    value={newPortfolio.description}
                                    onChange={(e) => setNewPortfolio({...newPortfolio, description: e.target.value})}
                                    style={{ width: '100%', padding: '12px', backgroundColor: '#0f1110', border: '1px solid #333', borderRadius: '8px', color: 'white', minHeight: '100px' }}
                                    placeholder="Brief description of this portfolio..."
                                />
                            </div>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <button 
                                    type="button"
                                    onClick={() => setIsCreateModalOpen(false)}
                                    style={{ flex: 1, padding: '12px', background: 'none', border: '1px solid #333', borderRadius: '8px', color: 'white', cursor: 'pointer' }}
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    style={{ flex: 1, padding: '12px', backgroundColor: 'var(--primary-green)', border: 'none', borderRadius: '8px', color: 'black', fontWeight: '600', cursor: 'pointer' }}
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Portfolios;
