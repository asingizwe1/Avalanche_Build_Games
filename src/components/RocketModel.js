import React from 'react';
import { useGLTF } from '@react-three/drei';

const RocketModel = ({ position = [0, 0, 0], scale = 1 }) => {
    const gltf = useGLTF('/rocket.glb'); // Make sure rocket.glb is in /public

    return (
        <primitive
            object={gltf.scene}
            position={position}
            scale={scale}
        />
    );
};

export default RocketModel;