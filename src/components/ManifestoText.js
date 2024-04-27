import { Text, Box, useColorModeValue } from '@chakra-ui/react';
export const ManifestoText = () => (
  <Box
    fontSize={{ xl: '3xl', md: '2xl', sm: 'lg', base: 'md' }}
    textAlign="left"
    padding="2% 10% 2% 10%"
    color={useColorModeValue('gray.700', 'gray.200')}
  >
    <Text>
      We're Ice Ice Maybe and we're harvesting sunshine to make clean ice at
      Burning Man.
    </Text>
    <br></br>
    <Text>
      <Text as="u" color="#00a0dc">
        <a href="https://burningman.org/about/10-principles/">
          Decommodification
        </a>
      </Text>{' '}
      is a core principle of Burning Man. In 2022, Burning Man moved closer to
      full decommodification by removing coffee purchasing from Center Camp -
      coffee is provided as a gift by a number of camps. Ice has yet to be
      decommodified - camps purchase it on playa from an establishment called
      Arctica by cash, Visa/Mastercard or Apple/Google pay. Such commercial
      exchange goes directly against the principle of decommodification. Getting
      ice can be a major burden for camps to retrieve every day - not to mention
      the price has been going up. We are proposing to decommodify ice by making
      it close to the cost of water through open-source solar-powered production
      methods.
    </Text>
    <br></br>
    <Text>
      Another principle of Burning Man is{' '}
      <Text as="u" color="#00a0dc">
        <a href="https://burningman.org/about/10-principles/">
          Leaving No Trace
        </a>
      </Text>
      . The ice that Arctica serves has a large environmental impact because it
      comes in single-use plastic bags and it must be trucked into the desert on
      huge, gas-guzzling refrigerated trucks. Our open source solar ice
      production plans will enable camps to make ice on playa sustainably
      without such a high environmental impact.
    </Text>
    <br></br>
    <Text>
      In the spirit of{' '}
      <Text as="u" color="#00a0dc">
        <a href="https://burningman.org/about/10-principles/">
          Radical Self-reliance
        </a>
      </Text>{' '}
      we are empowering other camps with our open source schematics to
      manufacture their own ice on playa without the need for relying on
      Arctica, Visa/Mastercard, or Google/Apple.
    </Text>
    <br></br>
    <Text>
      In the spirit of{' '}
      <Text as="u" color="#00a0dc">
        <a href="https://burningman.org/about/10-principles/">Gifting</a>
      </Text>
      , one of Ice Ice Maybe's major gifts at Burning Man will be our open
      source plans for solar ice production. We will also be gifting ice in
      various fun formats. We want to start small, creating enough ice to
      provide to ourselves and as gifts to other camps and individuals. In
      future iterations, we can scale up and streamline our ice making
      capabilities as well as help more camps produce their own. One day we'll
      make enough ice to have a snowball fight on playa, maybe.
    </Text>
  </Box>
);
