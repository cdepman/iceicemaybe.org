import { Flex, usePrefersReducedMotion } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';

const arrowIndicatorKeyframes = keyframes`
  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.5);
  }
`;

export const AnimatedIceCube = props => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const clockWiseAnimation = prefersReducedMotion
    ? undefined
    : `${arrowIndicatorKeyframes} infinite 5s linear`;

  return (
    <Flex mr={7}>
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
