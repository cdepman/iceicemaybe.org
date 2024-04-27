import React from 'react';
import '@fontsource/reem-kufi';
import {
  ChakraProvider,
  Box,
  VStack,
  Heading,
  Image,
  Spacer,
  useColorModeValue,
} from '@chakra-ui/react';
import theme from './theme';
import solarPanels from './svg/solarPanels.svg';
import { ManifestoText } from './components/ManifestoText';
import { Footer } from './components/Footer';
import { CTAButton } from './components/CTAButton';
import { LinkToOurVision } from './components/LinkToOurVision';
import WithSubnavigation from './components/NavBar';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <WithSubnavigation />
      <Box textAlign="center" fontSize="xl">
        <VStack pt={28} spacing={8}>
          <Heading
            w={{
              '2xl': '40%',
              xl: '50%',
              lg: '60%',
              md: '70%',
              sm: '80%',
              base: '80%',
            }}
            fontSize={{ lg: '5xl', md: '3xl', sm: '2xl', base: 'lg' }}
            pb="10px"
            color={useColorModeValue('gray.700', 'gray.200')}
          >
            Let's decommodify ice <br></br> with the help of the sun.
          </Heading>
          <LinkToOurVision />
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
