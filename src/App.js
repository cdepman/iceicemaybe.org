import React from 'react';
import '@fontsource/reem-kufi'
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  Flex,
  Heading,
  Button,
} from '@chakra-ui/react';
import { Logo } from './components/Logo';
import { NavBarContainer } from './components/NavbarContainer'
import theme from './theme'
import { SpinLogo } from './components/SpinLogo';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <NavBarContainer>
          <Flex align='center'>
            <Logo />
            <Heading color="blackAlpha.800" fontSize="xl" pl="4">Ice Ice Maybe</Heading>
          </Flex>
        </NavBarContainer>
        <VStack spacing={8}>
          <Heading w={{ '2xl': '40%', xl: '50%', lg: '60%', md: '70%', sm: '80%', base: '80%' }} fontSize={{ lg: '7xl', md: '4xl', sm: '3xl' }}>
            Let's decommodify ice with the help of the sun.
          </Heading>
          <Box position='relative'>
            <SpinLogo />
            <Button colorScheme='linkedin' >Apply Here</Button>
          </Box>
          <Box
            fontSize={{ xl: '3xl', md: '2xl', sm: 'lg' }}
            textAlign="left"
            padding="5%"
            style={{ textIndent: '50px' }}>
            <Text>
              One of the principles of Burning Man is Decommodification. In 2022 the Burning Man org got closer to full decommodification by getting rid of coffee purchasing at Center Camp. Coffee is provided by coffee camps. One of the last things that needs to be de-commodified is ice. Ice can be purchased on playa at an establishment called Arctica by cash, credit card or Apple pay, but it really kills the decommodification vibe and is expensive for camps.
            </Text>
            <Text>
              Another principle of Burning Man is Leaving No Trace. Burning Man camps do a pretty good job of cleaning up their MOOP (trash), but only a handful have been able to leave a small carbon footprint by switching to solar. If we think of the emissions being released as nearly-invisible MOOP, then most camps do a crap job, since almost everyone uses gas generators to get their power. The ice that Arctica serves comes in disposable plastic bags and has a large environmental impact because it must be trucked into the desert on refrigerated trucks from Reno. Not great.
            </Text>
            <Text>
              A third principle of Burning Man is Gifting. We are proposing to create a solar-powered ice camp that gifts ice with reusable ice containers. We want to start small, creating enough ice to provide to ourselves and immediate neighbors. In the future, we can potentially scale up and provide more solar ice to the playa.
            </Text>
          </Box>
        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default App;
