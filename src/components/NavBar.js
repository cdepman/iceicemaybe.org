import { Flex, Heading } from '@chakra-ui/react';
import { Logo } from './Logo';
import { NavBarContainer } from './NavbarContainer';
import { MakeSomeIceButton } from './MakeSomeIceButton';

export const NavBar = () => (
  <NavBarContainer>
    <Flex justify="space-between" w="100%">
      <Flex align="center">
        <Logo />
        <Heading color="blackAlpha.800" fontSize="xl" pl="4">
          Ice Ice Maybe
        </Heading>
      </Flex>
      <MakeSomeIceButton />
    </Flex>
  </NavBarContainer>
);
