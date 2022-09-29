import { Flex, Heading } from '@chakra-ui/react';
import { Logo } from './Logo';
import { NavBarContainer } from './NavbarContainer';

export const NavBar = () => (
  <NavBarContainer>
    <Flex align="center">
      <Logo />
      <Heading color="blackAlpha.800" fontSize="xl" pl="4">
        Ice Ice Maybe
      </Heading>
    </Flex>
  </NavBarContainer>
);
