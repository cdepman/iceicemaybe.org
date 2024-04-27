import React from 'react';
import { Image } from '@chakra-ui/react';
import logo from '../img/ice-ice-maybe-small.png';

export const Logo = props => {
  return <Image position="relative" top={7} w={100} src={logo} {...props} />;
};
