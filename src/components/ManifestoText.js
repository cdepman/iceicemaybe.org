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
      coffee purchasing from Center Camp. Coffee is provided as a gift by other
      camps. Ice has yet to be decommodified - camps purchase it on playa at an
      establishment called Arctica by cash, credit card or Apple pay. This kills
      the decommodification vibe and can be a burden for camps to retrieve every
      day - not to mention the price has been going up. We are proposing to
      decommodify ice by providing it for free.
    </Text>
    <br></br>
    <Text>
      Another principle of Burning Man is <Text as="i">Leaving No Trace</Text>.
      The ice that Arctica serves has a large environmental impact because it
      comes in disposable plastic bags and it must be trucked into the desert on
      huge, gas-powered refrigerated trucks. We are proposing to manufacture ice
      on playa with solar power and deliver it in insulated reusable containers.
    </Text>
    <br></br>
    <Text>
      A third principle of Burning Man is <Text as="i">Gifting</Text>. One of
      Ice Ice Maybe's major gifts at Burning Man will be ice. We want to start
      small, creating enough ice to provide to ourselves and surrounding
      neighbors. We can scale up and provide more solar ice to the playa in the
      future. One vision is to have many automated solar ice vending stations
      positioned around the residential areas of Burning Man.
    </Text>
  </Box>
);
