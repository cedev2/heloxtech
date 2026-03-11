import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, ExternalLink, ArrowRight } from 'lucide-react';
import { content } from '../constants/content';

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost/HT/backend/api/products.php')
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error("Error fetching products:", err));
    }, []);

    const displayedProducts = products.length > 0 ? products : content.products;
    return (
        <section id="products" className="section" style={{ background: 'var(--primary)', color: 'white' }}>
            <div className="container">
                <div className="section-title">
                    <h4 style={{ color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '1rem' }}>Our Products</h4>
                    <h2 style={{ color: 'white', fontSize: '2.5rem' }}>Innovative Software Solutions</h2>
                    <p style={{ maxWidth: '700px', margin: '1rem auto', opacity: 0.8 }}>
                        Proprietary products built by {content.brand.name} Tech to streamline your business operations.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                    gap: '2rem'
                }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                        {displayedProducts.map((product, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                style={{
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '1.5rem',
                                    padding: '2rem',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                                whileHover={{
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    translateY: -5,
                                    borderColor: 'var(--accent)'
                                }}
                            >
                                {product.image ? (
                                    <img
                                        src={`http://localhost/HT/backend${product.image}`}
                                        alt={product.name}
                                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: -1, opacity: 0.3 }}
                                    />
                                ) : null}
                                <div style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    right: '1rem',
                                    background: 'var(--accent)',
                                    color: 'var(--primary)',
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '9999px',
                                    fontSize: '0.75rem',
                                    fontWeight: 800
                                }}>
                                    {product.badge}
                                </div>
                                <h3 style={{ color: 'white', marginBottom: '1rem', marginTop: '1rem' }}>{product.name}</h3>
                                <p style={{ opacity: 0.8, marginBottom: '1.5rem' }}>{product.description}</p>
                                <a href="#contact" className="btn btn-outline" style={{
                                    padding: '0.5rem 1.25rem',
                                    fontSize: '0.875rem',
                                    borderColor: 'rgba(255, 255, 255, 0.3)',
                                    color: 'white',
                                    textDecoration: 'none',
                                    display: 'inline-block'
                                }}>Explore Product</a>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Products;
