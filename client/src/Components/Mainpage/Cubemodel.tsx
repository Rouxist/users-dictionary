import { useRef } from 'react';

// import * as THREE from 'three';
import { Canvas, useFrame } from 'react-three-fiber';


function CubeModel() {
    const ref = useRef<THREE.Mesh>(null!)

    function Box() {

        useFrame((state, delta) => {
            ref.current.rotation.x += 0.005
            ref.current.rotation.y += 0.0075
            ref.current.rotation.z += 0.0025
        })

        return (
            <mesh scale={3} ref={ref} >
                {/* onPointerOver={() => setIshover(true)} onPointerOut={() => setIshover(false)} */}
                <boxGeometry />
                {/* <meshNormalMaterial /> */}
                <meshMatcapMaterial color={0xababe0} />
                {/* <boxBufferGeometry attach='geometry' />
                <meshLambertMaterial attach='material' color='hotpink' /> */}
            </mesh>

        )
    }

    return (
        <Canvas >
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 15, 10]} angle={0.3} />
            <Box />
        </Canvas>
    );
}

export default CubeModel;