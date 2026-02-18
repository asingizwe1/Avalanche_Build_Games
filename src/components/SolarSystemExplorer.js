import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, useTexture, PerspectiveCamera, Text, Float } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { GLTFLoader } from 'three-stdlib';
import '../styles/SolarSystemExplorer.css';

// NASA-inspired color palette
const nasaColors = {
  background: '#0b3d91',
  textPrimary: '#ffffff',
  textSecondary: '#fc3d21',
  uiElements: '#1a6cf0',
  orbitPaths: 'rgba(255, 255, 255, 0.2)'
};

// Planet data with NASA-inspired parameters
const planetsData = [
  { name: 'Mercury', size: 0.38, orbitRadius: 5.8, speed: 0.04, color: '#a8a8a8', texture: '/textures/mercury.jpg' },
  { name: 'Venus', size: 0.95, orbitRadius: 10.8, speed: 0.015, color: '#e6c229', texture: '/textures/venus.jpg' },
  { name: 'Earth', size: 1.0, orbitRadius: 15.0, speed: 0.01, color: '#3498db', texture: '/textures/earth.jpg' },
  { name: 'Mars', size: 0.53, orbitRadius: 22.8, speed: 0.008, color: '#e74c3c', texture: '/textures/mars.jpg' },
  { name: 'Jupiter', size: 2.0, orbitRadius: 77.8, speed: 0.002, color: '#f39c12', texture: '/textures/jupiter.jpg' },
  { name: 'Saturn', size: 1.7, orbitRadius: 143.4, speed: 0.0009, color: '#f1c40f', texture: '/textures/saturn.jpg', rings: true },
  { name: 'Uranus', size: 1.2, orbitRadius: 287.1, speed: 0.0004, color: '#1abc9c', texture: '/textures/uranus.jpg' },
  { name: 'Neptune', size: 1.1, orbitRadius: 449.8, speed: 0.0001, color: '#3498db', texture: '/textures/neptune.jpg' }
];

const Planet = ({ planet, selected, setSelected }) => {
  const planetRef = useRef();
  const [hovered, setHover] = useState(false);
  
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    planetRef.current.position.x = Math.cos(elapsedTime * planet.speed) * planet.orbitRadius;
    planetRef.current.position.z = Math.sin(elapsedTime * planet.speed) * planet.orbitRadius;
  });

  return (
    <group>
      <mesh
        ref={planetRef}
        scale={selected === planet.name ? [planet.size * 1.5, planet.size * 1.5, planet.size * 1.5] : [planet.size, planet.size, planet.size]}
        onClick={() => setSelected(planet.name)}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          color={planet.color} 
          map={useTexture(planet.texture)} 
          emissive={planet.color} 
          emissiveIntensity={0.1}
        />
      </mesh>
      
      {(hovered || selected === planet.name) && (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <Text
            position={[0, planet.size + 1, 0]}
            color={nasaColors.textPrimary}
            fontSize={0.5}
            anchorX="center"
            anchorY="middle"
            outlineColor={nasaColors.textSecondary}
            outlineWidth={0.02}
          >
            {planet.name}
          </Text>
        </Float>
      )}
      
      {planet.rings && (
        <mesh rotation={[Math.PI / 2, 0, 0]} position={planetRef.current?.position}>
          <ringGeometry args={[planet.size * 1.2, planet.size * 1.8, 64]} />
          <meshStandardMaterial color="#d4b483" side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  );
};

const Sun = () => {
  return (
    <group>
      <mesh>
        <sphereGeometry args={[4, 32, 32]} />
        <meshStandardMaterial 
          color="#ffff00" 
          emissive="#fc3d21" 
          emissiveIntensity={2} 
        />
      </mesh>
      <pointLight color="#ffffff" intensity={2} distance={100} />
      <Text
        position={[0, 6, 0]}
        color={nasaColors.textPrimary}
        fontSize={1}
        anchorX="center"
        anchorY="middle"
        outlineColor={nasaColors.textSecondary}
        outlineWidth={0.05}
      >
        SUN
      </Text>
    </group>
  );
};

const OrbitPath = ({ radius }) => {
  const points = [];
  for (let i = 0; i <= 64; i++) {
    const angle = (i / 64) * Math.PI * 2;
    points.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
  }
  points.push(points[0]);
  
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
  
  return (
    <line geometry={lineGeometry}>
      <lineBasicMaterial attach="material" color={nasaColors.orbitPaths} opacity={0.5} transparent linewidth={1} />
    </line>
  );
};

const NASAEyesScene = ({ selected, setSelected }) => {
  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      
      <Sun />
      
      {planetsData.map((planet) => (
        <group key={planet.name}>
          <OrbitPath radius={planet.orbitRadius} />
          <Planet planet={planet} selected={selected} setSelected={setSelected} />
        </group>
      ))}
      
      <Stars radius={500} depth={100} count={10000} factor={8} saturation={0} fade speed={2} />
    </>
  );
};

const InfoPanel = ({ selectedPlanet }) => {
  if (!selectedPlanet) return null;
  
  const planet = planetsData.find(p => p.name === selectedPlanet);
  
  return (
    <div className="nasa-info-panel">
      <h3>{planet.name}</h3>
      <div className="nasa-info-grid">
        <div>
          <span>Diameter:</span>
          <span>{planet.size.toFixed(2)} Earth diameters</span>
        </div>
        <div>
          <span>Orbit Radius:</span>
          <span>{planet.orbitRadius.toFixed(1)} AU</span>
        </div>
        <div>
          <span>Orbital Period:</span>
          <span>{(2 * Math.PI / planet.speed / 60).toFixed(1)} seconds</span>
        </div>
      </div>
      <div className="nasa-divider" />
      <p>Click anywhere to exit</p>
    </div>
  );
};

const SolarSystemExplorer = () => {
  const [selected, setSelected] = useState(null);
  const [date, setDate] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="nasa-container">
      <div className="nasa-header">
        <div className="nasa-logo">
          <span className="nasa-red">AstroLearn</span> Eyes on the Solar System
        </div>
        <div className="nasa-date">
          {date.toUTCString()}
        </div>
      </div>
      
      <div className="nasa-canvas-container" onClick={() => selected && setSelected(null)}>
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 50, 150]} fov={45} />
          <OrbitControls 
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            zoomSpeed={0.6}
            panSpeed={0.5}
            rotateSpeed={0.4}
            minDistance={30}
            maxDistance={500}
          />
          <EffectComposer>
            <Bloom intensity={0.5} luminanceThreshold={0.9} />
          </EffectComposer>
          <Suspense fallback={null}>
            <NASAEyesScene selected={selected} setSelected={setSelected} />
          </Suspense>
        </Canvas>
        
        {selected && <InfoPanel selectedPlanet={selected} />}
      </div>
      
      <div className="nasa-controls">
        <div className="nasa-control-group">
          <button className="nasa-button">Time Controls</button>
          <button className="nasa-button">View Options</button>
          <button className="nasa-button">Bookmarks</button>
        </div>
        <div className="nasa-instructions">
          <p>Click on planets to select • Scroll to zoom • Right-click drag to pan</p>
        </div>
      </div>
    </div>
  );
};

export default SolarSystemExplorer;