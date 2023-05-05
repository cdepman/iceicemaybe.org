import { Box, Link, Button } from '@chakra-ui/react';
import { RotatingSunIcon } from './RotatingSunIcon';

const ICE_ICE_MAYBE_MASTER_GOOGLE_DOC_URL =
  'https://docs.google.com/document/d/1KHhBU1M--IhT_PZ0y-VO2CBbqPsPlvbm0KOLGytFYK4/';

export const CTAButton = () => (
  <Box position="relative">
    <RotatingSunIcon />
    <Link href={ICE_ICE_MAYBE_MASTER_GOOGLE_DOC_URL} isExternal>
      <Button p="24px" colorScheme="linkedin">
        Get Involved
      </Button>
    </Link>
  </Box>
);
