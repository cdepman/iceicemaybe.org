import { Flex, Heading, Switch } from '@chakra-ui/react';
import { Logo } from './Logo';
import { NavBarContainer } from './NavbarContainer';

export const NavBar = ({ pleaseMakeIce, setPleaseMakeIce }) => (
  <NavBarContainer>
    <Flex align="center">
      <Logo />
      <Heading color="blackAlpha.800" fontSize="xl" pl="4">
        Ice Ice Maybe
      </Heading>
    </Flex>
    <Flex>
      <Switch
        size="lg"
        isChecked={pleaseMakeIce}
        onChange={item => setPleaseMakeIce(item.target.checked)}
      />
    </Flex>
  </NavBarContainer>
);
