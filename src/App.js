import React from 'react';
import '@fontsource/reem-kufi'
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  Flex,
  Heading,
  Image,
  Button,
  Link,
} from '@chakra-ui/react';
import { Logo } from './components/Logo';
import { NavBarContainer } from './components/NavbarContainer'
import theme from './theme'
import { SpinLogo } from './components/SpinLogo';
import solarPanels from './solarPanels.svg'

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
            fontSize={{ lg: '6xl', md: '4xl', sm: '3xl', base: '2xl' }}
            pb="10px"
          >
            Let's decommodify ice <br></br> with the help of the sun.
          </Heading>
          <Box position='relative'>
            <SpinLogo />
            <Button p="24px" colorScheme='linkedin' >Join Us</Button>
          </Box>
          <Box
            fontSize={{ xl: '3xl', md: '2xl', sm: 'lg', base: 'md' }}
            textAlign="left"
            padding="2% 10% 2% 10%">
            <Text>
              <Text as="i">Decommodification</Text> is a core principle of Burning Man. In 2022, Burning Man moved closer to full decommodification by removing coffee purchasing from Center Camp. Coffee is provided as a gift by other camps. Ice has not been decommodified. Ice can be purchased on playa at an establishment called Arctica by cash, credit card or Apple pay, but it really kills the decommodification vibe and can be expensive for camps.
            </Text>
            <br></br>
            <Text>
              Another principle of Burning Man is <Text as="i">Leaving No Trace</Text>. The ice that Arctica serves has a large environmental impact because it comes in disposable plastic bags and it must be trucked into the desert on huge, gas-powered refrigerated trucks from Reno. Not great.
            </Text>
            <br></br>
            <Text>
              A third principle of Burning Man is <Text as="i">Gifting</Text>. We are proposing to create a solar-powered ice camp that gifts ice in reusable ice containers. We want to start small, creating enough ice to provide to ourselves and immediate neighbors. In the future, we can potentially scale up and provide more solar ice to the playa.
            </Text>
          </Box>
          <Box>
            <Image src={solarPanels} />
          </Box>
          <Box>
            <Text>This website runs for free on Netlify and is open-source <Link color='blue.300' href='https://github.com/cdepman/iceicemaybe.org'>here.</Link></Text>
          </Box>
        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default App;
