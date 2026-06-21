import '@fontsource/reem-kufi';
import {
  ChakraProvider,
  Box,
  VStack,
  Heading,
  Image,
  useColorModeValue,
} from '@chakra-ui/react';
import theme from '../theme';
import solarPanels from '../svg/solarPanels.svg';
import { ManifestoText } from '../components/ManifestoText';
import { Footer } from '../components/Footer';
import { CTAButton } from '../components/CTAButton';
import { LinkToBuildManual } from '../components/LinkToBuildManual';
import WithSubnavigation from '../components/NavBar';
import { PageMeta } from '../components/PageMeta';

export const Home = () => {
  const headingColor = useColorModeValue('gray.700', 'gray.200');
  return (
    <ChakraProvider theme={theme}>
      <PageMeta
        title="Ice Ice Maybe | Decommodified Solar Ice"
        description="Decommodified solar ice for Burning Man, built around open-source tools and camp-scale collaboration."
        path="/"
        image="/IceIceMaybeImage.png"
        imageAlt="Ice Ice Maybe solar ice project"
      />
      <WithSubnavigation />
      <Box textAlign="center" fontSize="xl">
        <VStack pt={28} spacing={8}>
          <Heading
            as="h1"
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
            color={headingColor}
          >
            Let's decommodify ice <br></br> with the help of the sun.
          </Heading>
          <CTAButton />
          <LinkToBuildManual />
          <ManifestoText />
          <Box>
            <Image src={solarPanels} />
          </Box>
          <Footer />
        </VStack>
      </Box>
    </ChakraProvider>
  );
};
