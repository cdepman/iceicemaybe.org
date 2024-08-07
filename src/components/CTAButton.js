import { Box, Link, Button } from '@chakra-ui/react';
import { RotatingSunIcon } from './RotatingSunIcon';

export const CTAButton = () => (
  <Box position="relative">
    <RotatingSunIcon />
    <Link href="https://givebutter.com/ice-ice-maybe-founders-fund" isExternal>
      <Button p="24px" colorScheme="linkedin">
        Contribute here!
      </Button>
    </Link>
  </Box>
);
