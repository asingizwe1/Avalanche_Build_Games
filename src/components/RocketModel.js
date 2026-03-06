import React from 'react';
import { useGLTF } from '@react-three/drei';

const RocketModel = ({ position = [0, 0, 0] }) => {
    const gltf = useGLTF('/rocket.glb');

    return (
        <group position={position} rotation={[0, Math.PI / 2, 0]} scale={0.005}>
            <primitive object={gltf.scene} />
        </group>
    );
};

export default RocketModel;