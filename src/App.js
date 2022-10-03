import React from 'react';
import '@fontsource/reem-kufi';
import {
  ChakraProvider,
  Box,
  VStack,
  Heading,
  Image,
  Spacer,
} from '@chakra-ui/react';
import theme from './theme';
import solarPanels from './svg/solarPanels.svg';
import { ManifestoText } from './components/ManifestoText';
import { NavBar } from './components/NavBar';
import { Footer } from './components/Footer';
import { CTAButton } from './components/CTAButton';

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
          <CTAButton />
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
