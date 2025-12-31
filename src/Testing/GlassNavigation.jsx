// src/Components/GlassNavigation/GlassNavigation.jsx
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaLayerGroup, FaWifi, FaMusic } from 'react-icons/fa';
import './GlassNavigation.css';

const GlassNavigation = ({ items }) => {
    const location = useLocation();

    // Default navigation items if not provided
    const defaultItems = [
        {
            id: 'home',
            label: 'Home',
            icon: <FaHome />,
            path: '/'
        },
        {
            id: 'classes',
            label: 'Classes',
            icon: <FaLayerGroup />,
            path: '/classes'
        },
        {
            id: 'events',
            label: 'Events',
            icon: <FaWifi />,
            path: '/#events'
        },

        {
            id: 'blog',
            label: 'Blog',
            icon: <FaMusic />,
            path: '/blog'
        }
    ];

    const navigationItems = items || defaultItems;

    return (
        <div className="glass-nav-wrapper">
            <div className="glass-container glass-container--rounded glass-container--medium">
                <div className="glass-filter"></div>
                <div className="glass-overlay"></div>
                <div className="glass-specular"></div>
                <div className="glass-content">
                    {navigationItems.map((item) => {
                        const isActive = location.pathname === item.path;

                        return (
                            <Link
                                key={item.id}
                                to={item.path}
                                className={`glass-item ${isActive ? 'glass-item--active' : ''}`}
                            >
                                <div className="glass-item__icon">
                                    {item.icon}
                                </div>
                                <span className="glass-item__label">{item.label}</span>
                            </Link>
                        );
                    })}
                    <Link
                        to="/#events"
                        className="glass-item"
                    >
                        <div className="glass-item__icon">{item.icon}</div>
                        <span className="glass-item__label">Events</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default GlassNavigation;