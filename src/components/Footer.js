import { Box, Text, Link } from '@chakra-ui/react';

export const Footer = () => (
  <Box>
    <Text fontSize="sm">
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
);
