// components/InfoPanel.js
import React from 'react';
import '../styles/SolarSystemExplorer.css';

const InfoPanel = ({ selectedPlanet, onClose }) => {
    if (!selectedPlanet) return null;

    const planet = {
        Mercury: { size: 0.38, orbitRadius: 5.8, speed: 0.04, description: 'Smallest planet, closest to the sun.' },
        Venus: { size: 0.95, orbitRadius: 10.8, speed: 0.015, description: 'Hottest planet with thick clouds.' },
        Earth: { size: 1.0, orbitRadius: 15.0, speed: 0.01, description: 'Our home planet, supports life.' },
        Mars: { size: 0.53, orbitRadius: 22.8, speed: 0.008, description: 'Known as the Red Planet.' },
        Jupiter: { size: 2.0, orbitRadius: 77.8, speed: 0.002, description: 'Largest planet with many moons.' },
        Saturn: { size: 1.7, orbitRadius: 143.4, speed: 0.0009, description: 'Famous for its rings.' },
        Uranus: { size: 1.2, orbitRadius: 287.1, speed: 0.0004, description: 'Rotates on its side.' },
        Neptune: { size: 1.1, orbitRadius: 449.8, speed: 0.0001, description: 'Farthest known gas giant.' },
    }[selectedPlanet];

    return (
        <div className="nasa-info-panel" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={onClose}>✖</button>
            <h3>{selectedPlanet}</h3>
            <p className="planet-description">{planet.description}</p>
            <div className="nasa-info-grid">
                <div><span>Diameter:</span><span>{planet.size} Earths</span></div>
                <div><span>Orbit Radius:</span><span>{planet.orbitRadius} AU</span></div>
                <div><span>Orbit Speed:</span><span>{planet.speed} units/sec</span></div>
            </div>
        </div>
    );
};

export default InfoPanel;