import { Box, keyframes } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const CUBES_PER_ROW = 42;
const ANIMATION_DURATION = 30;
const CUBE_FACE_SIZE = 24;

const CascadeContainer = ({ children }) => (
  <Box
    zIndex="-1"
    pos="absolute"
    marginTop="-36px"
    width="100%"
    height="100%"
    top="0"
  >
    {children}
  </Box>
);

const animationKeyframes = keyframes`
  0% {
    transform: rotateX(-30deg) rotateY(35deg) rotateZ(0deg) translate(-50%, -50%);
    top: 0;
  }
  49.9% {
    top: 100%;
  }
  50% {
    top: 0;
  }
  100% {
    transform: rotateX(1050deg) rotateY(395deg) rotateZ(360deg) translate(-50%, -50%);
    top: 100%;
  }
`;

const CubeContainer = ({
  left,
  animationDelay,
  children,
  faceSize = `${CUBE_FACE_SIZE}px`,
  animationDuration = ANIMATION_DURATION,
}) => (
  <Box
    left={left}
    pos="absolute"
    width={faceSize}
    height={faceSize}
    animation={`${animationKeyframes} ${animationDuration}s linear infinite`}
    style={{ transformStyle: 'preserve-3d', animationDelay: animationDelay }}
  >
    {children}
  </Box>
);

const CubeFaceContainer = ({ children }) => (
  <Box
    pos="absolute"
    left="50%"
    top="50%"
    style={{ transformStyle: 'preserve-3d' }}
  >
    {children}
  </Box>
);

const CubeFace = ({ transform, faceSize = `${CUBE_FACE_SIZE}px` }) => (
  <Box
    pos="absolute"
    left="50%"
    top="50%"
    width={faceSize}
    height={faceSize}
    borderRadius="6px"
    background="linear-gradient(rgba(237, 237, 237, 0.2), rgba(159,184,236,0.2))"
    boxShadow="0 0 4px rgba(255, 255, 255, 0.2), inset 0 0 4px rgba(255, 255, 255, 0.2);"
    style={{ transformStyle: 'preserve-3d' }}
    transform={transform}
  />
);

const IceCube = ({ left, animationDelay }) => (
  <CubeContainer left={left} animationDelay={animationDelay}>
    <CubeFaceContainer>
      <CubeFace transform={`translate3d(0, 0, ${CUBE_FACE_SIZE / 2}px)`} />
      <CubeFace
        transform={`rotateX(90deg) translate3d(0, 0, ${CUBE_FACE_SIZE / 2}px)`}
      />
      <CubeFace
        transform={`rotateX(180deg) translate3d(0, 0, ${CUBE_FACE_SIZE / 2}px)`}
      />
      <CubeFace
        transform={`rotateX(270deg) translate3d(0, 0, ${CUBE_FACE_SIZE / 2}px)`}
      />
      <CubeFace
        transform={`rotateY(90deg) translate3d(0, 0, ${CUBE_FACE_SIZE / 2}px)`}
      />
      <CubeFace
        transform={`rotateY(-90deg) translate3d(0, 0, ${CUBE_FACE_SIZE / 2}px)`}
      />
    </CubeFaceContainer>
  </CubeContainer>
);

export const IceCascadeAnimation = () => {
  const [IceCubes, setIceCubes] = useState([]);
  useEffect(() => {
    const cubes = [...Array(CUBES_PER_ROW)].map((_, i) => (
      <IceCube
        key={`cube-${i}`}
        left={Math.random() * 100 + '%'}
        animationDelay={Math.random() * (ANIMATION_DURATION / 2) + 's'}
      />
    ));
    setIceCubes(cubes);
  }, []);
  return <CascadeContainer>{IceCubes}</CascadeContainer>;
};
