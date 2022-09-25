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
          <Heading
            w={{ '2xl': '40%', xl: '50%', lg: '60%', md: '70%', sm: '80%', base: '80%' }}
            fontSize={{ lg: '7xl', md: '4xl', sm: '3xl', base: '2xl' }}
            pb="10px"
          >
            Let's decommodify ice with the help of the sun.
          </Heading>
          <Box position='relative'>
            <SpinLogo />
            <Button p="24px" colorScheme='linkedin' >Apply Here</Button>
          </Box>
          <Box
            fontSize={{ xl: '3xl', md: '2xl', sm: 'lg' }}
            textAlign="left"
            padding="2% 10% 2% 10%"
            style={{ textIndent: '40px' }}>
            <Text>
              Decommodification is a core tenet of Burning Man. In 2022, Burning Man moved closer to full decommodification by removing coffee purchasing from Center Camp. Coffee is provided as a gift by other camps. Ice has not been decommodified. Ice can be purchased on playa at an establishment called Arctica by cash, credit card or Apple pay, but it really kills the decommodification vibe and is expensive for camps.            </Text>
            <Text>
              Another principle of Burning Man is Leaving No Trace. The ice that Arctica serves has a large environmental impact because it comes in disposable plastic bags and it must be trucked into the desert on huge, gas-powered refrigerated trucks from Reno. Not great.
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
