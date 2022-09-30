import React from 'react';
import '@fontsource/reem-kufi';
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  Heading,
  Image,
  Button,
  Link,
  Spacer,
} from '@chakra-ui/react';
import theme from './theme';
import { RotatingSunIcon } from './components/RotatingSunIcon';
import solarPanels from './svg/solarPanels.svg';
import { ManifestoText } from './components/ManifestoText';
import { NavBar } from './components/NavBar';
import { Footer } from './components/Footer';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <NavBar />
        <VStack spacing={8}>
          <Heading
            w={{
              '2xl': '40%',
              xl: '50%',
              lg: '60%',
              md: '70%',
              sm: '80%',
              base: '80%',
            }}
            fontSize={{ lg: '6xl', md: '4xl', sm: '3xl', base: '2xl' }}
            pb="10px"
          >
            Let's decommodify ice <br></br> with the help of the sun.
          </Heading>
          <Box position="relative">
            <RotatingSunIcon />
            <Link
              href="https://docs.google.com/document/d/1KHhBU1M--IhT_PZ0y-VO2CBbqPsPlvbm0KOLGytFYK4/"
              isExternal
            >
              <Button p="24px" colorScheme="linkedin">
                Learn More
              </Button>
            </Link>
          </Box>
          <ManifestoText />
          <Box>
            <Image src={solarPanels} />
          </Box>
          <Footer />
          <Spacer />
        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default App;
