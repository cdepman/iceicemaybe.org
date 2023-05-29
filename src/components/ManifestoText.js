import { Text, Box } from '@chakra-ui/react';
export const ManifestoText = () => (
  <Box
    fontSize={{ xl: '3xl', md: '2xl', sm: 'lg', base: 'md' }}
    textAlign="left"
    padding="2% 10% 2% 10%"
  >
    <Text>
      <Text as="i">Decommodification</Text> is a core principle of Burning Man.
      In 2022, Burning Man moved closer to full decommodification by removing
      coffee purchasing from Center Camp. Coffee is now provided as a gift by
      other camps. Ice has yet to be decommodified - camps purchase it on playa
      at an establishment called Arctica by cash, Visa/Mastercard or
      Apple/Google pay. This kills the decommodification vibe and can be a
      burden for camps to retrieve every day - not to mention the price has been
      going up. We are proposing to decommodify ice by making it close to the
      cost of water through open-source solar-powered production methods.
    </Text>
    <br></br>
    <Text>
      Another principle of Burning Man is <Text as="i">Leaving No Trace</Text>.
      The ice that Arctica serves has a large environmental impact because it
      comes in disposable plastic bags and it must be trucked into the desert on
      huge, gas-powered refrigerated trucks. Our open source solar ice
      production plans will enable camps to make ice on playa sustainably
      without such a high environmental impact.
    </Text>
    <br></br>
    <Text>
      In the spirit of <Text as="i">Radical Self-reliance</Text> we are
      empowering other camps with our open source schematics to manufacture
      their own ice on playa without the need for relying on Arctica, legal
      tender, Visa/Mastercard, or Google and Apple.
    </Text>
    <br></br>
    <Text>
      In the spirit of <Text as="i">Gifting</Text>, one of Ice Ice Maybe's major
      gifts at Burning Man will be our open source plans for solar ice
      production. We will also be gifting ice in various fun formats. We want to
      start small, creating enough ice to provide to ourselves and as gifts to
      other camps and individuals. In future iterations, we can scale up and
      provide more ice making capabilities as well as help other camps product
      their own. We'll one day make enough ice to have a snowball fight on
      playa, maybe 😉.
    </Text>
  </Box>
);
