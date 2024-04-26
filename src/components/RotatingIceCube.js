import React from 'react';
import { Flex, keyframes, usePrefersReducedMotion } from '@chakra-ui/react';

const clockWiseSpin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const counterClockWiseSpin = keyframes`
  from { transform: rotate(360deg); }
  to { transform: rotate(0deg); }
`;

export const RotatingIceCube = props => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const clockWiseAnimation = prefersReducedMotion
    ? undefined
    : `${clockWiseSpin} infinite 12s linear`;

  const counterClockWiseAnimation = prefersReducedMotion
    ? undefined
    : `${counterClockWiseSpin} infinite 12s linear`;

  return (
    <>
      <Flex
        right={0}
        top={-2}
        zIndex="1"
        position="absolute"
        animation={clockWiseAnimation}
        {...props}
      >
        🧊
      </Flex>
      <Flex
        left={0}
        top={-2}
        zIndex="1"
        position="absolute"
        animation={counterClockWiseAnimation}
        {...props}
      >
        🧊
      </Flex>
      <Flex
        left={0}
        bottom={-2}
        zIndex="1"
        position="absolute"
        animation={clockWiseAnimation}
        {...props}
      >
        🧊
      </Flex>
      <Flex
        right={0}
        bottom={-2}
        zIndex="1"
        position="absolute"
        animation={counterClockWiseAnimation}
        {...props}
      >
        🧊
      </Flex>
    </>
  );
};
