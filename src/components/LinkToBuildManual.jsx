import { Box, Link, Button, Text } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';

export const LinkToBuildManual = () => (
  <Box>
    <Link
      as={RouterLink}
      to="/off-grid-ice-rig"
      _hover={{ textDecoration: 'none' }}
    >
      <Button
        p="24px"
        variant="outline"
        colorScheme="linkedin"
        rightIcon={<ArrowForwardIcon />}
      >
        🧊 Read the Off-Grid Ice Rig build manual
      </Button>
    </Link>
    <Text fontSize={{ md: 'sm', base: 'xs' }} color="gray.500" pt={2}>
      Open-source field build — reservoir, pump &amp; ice machine off solar.
    </Text>
  </Box>
);
