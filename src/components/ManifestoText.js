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
      camps. Ice has yet to be decommodified and can be purchased on playa at an
      establishment called Arctica by cash, credit card or Apple pay, but it
      really kills the decommodification vibe, has been getting more expensive,
      and can be a burden for camps to get every day.
    </Text>
    <br></br>
    <Text>
      Another principle of Burning Man is <Text as="i">Leaving No Trace</Text>.
      The ice that Arctica serves has a large environmental impact because it
      comes in disposable plastic bags and it must be trucked into the desert on
      huge, gas-powered refrigerated trucks. Not great.
    </Text>
    <br></br>
    <Text>
      A third principle of Burning Man is <Text as="i">Gifting</Text>. We are
      proposing to create a solar-powered ice camp that gifts ice in reusable
      containers. We want to start small, creating enough ice to provide to
      ourselves and immediate neighbors. In the future, we can potentially scale
      up and provide more solar ice to the playa.
    </Text>
  </Box>
);
