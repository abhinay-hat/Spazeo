'use client'

import { Suspense, useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { PerspectiveCamera } from 'three'
import { OrbitControls, useTexture } from '@react-three/drei'
import { useViewer } from '@/hooks/useViewer'
import { Spinner } from '@/components/ui/Spinner'

interface Props {
  imageUrl: string
  height?: string
}

function PanoramaSphere({ imageUrl }: { imageUrl: string }) {
  const texture = useTexture(imageUrl)
  return (
    <mesh scale={[-1, 1, 1]}>
      <sphereGeometry args={[500, 60, 40]} />
      <meshBasicMaterial map={texture} side={2} />
    </mesh>
  )
}

function CameraController() {
  const { camera } = useThree()
  const { zoomLevel } = useViewer()
  useEffect(() => {
    if (camera instanceof PerspectiveCamera) {
      // eslint-disable-next-line react-hooks/immutability
      camera.fov = 75 / zoomLevel
      camera.updateProjectionMatrix()
    }
  }, [camera, zoomLevel])
  return null
}

function Controls() {
  const { isAutoRotating } = useViewer()
  return (
    <OrbitControls
      enableZoom={false}
      enablePan={false}
      rotateSpeed={-0.3}
      dampingFactor={0.1}
      enableDamping
      autoRotate={isAutoRotating}
      autoRotateSpeed={0.4}
    />
  )
}

export function PanoramaViewer({ imageUrl, height = '500px' }: Props) {
  return (
    <div className="viewer-container" style={{ height }}>
      <Suspense
        fallback={
          <div className="flex h-full items-center justify-center">
            <Spinner size="lg" />
          </div>
        }
      >
        <Canvas camera={{ fov: 75, near: 0.1, far: 1000 }}>
          <CameraController />
          <Controls />
          <PanoramaSphere imageUrl={imageUrl} />
        </Canvas>
      </Suspense>
    </div>
  )
}

export default PanoramaViewer
