import React from 'react';
import { Flex, keyframes, usePrefersReducedMotion } from '@chakra-ui/react';
import { makeSomeIce } from '../util/MakeSomeIce';

const arrowIndicatorKeyframes = keyframes`
  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.5);
  }
`;

export const RotatingIceCubes = props => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const clockWiseAnimation = prefersReducedMotion
    ? undefined
    : `${arrowIndicatorKeyframes} infinite 3s linear`;

  return (
    <Flex mr={7} onClick={makeSomeIce}>
      <Flex
        zIndex="1"
        fontSize={24}
        position="absolute"
        animation={clockWiseAnimation}
        {...props}
      >
        🧊
      </Flex>
    </Flex>
  );
};
