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
            <Button p="24px" colorScheme="linkedin">
              Join Us
            </Button>
          </Box>
          <ManifestoText />
          <Box>
            <Image src={solarPanels} />
          </Box>
          <Box>
            <Text fontSize="md">
              This website runs for free on Netlify and is open-source{' '}
              <Link
                target="_blank"
                color="blue.300"
                href="https://github.com/cdepman/iceicemaybe.org"
              >
                here.
              </Link>
            </Text>
          </Box>
          <Spacer></Spacer>
        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default App;
