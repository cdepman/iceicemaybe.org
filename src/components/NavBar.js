import {
  Box,
  Flex,
  Text,
  IconButton,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ArrowForwardIcon,
} from '@chakra-ui/icons';
import { Logo } from './Logo';
import { makeSomeIce } from '../util/MakeSomeIce';
import { AnimatedIceCube } from './AnimatedIceCube';

export default function NavBar() {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Box position="fixed" zIndex={2} w="100%">
      <Flex
        background="white"
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Logo />
          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>
        <Stack flex={{ base: 1, md: 1 }}>
          <Flex
            justify={'flex-end'}
            direction={'row'}
            spacing={5}
            onClick={makeSomeIce}
          >
            <Flex cursor="pointer" fontSize={'12px'} align={'center'}>
              <Box display={{ base: 'none', md: 'flex' }}>Make Some Ice</Box>
              <ArrowForwardIcon ml={2} mr={2} />
            </Flex>
            <Box cursor="pointer" position="relative">
              <AnimatedIceCube top={{ base: '-13px', md: '-10px' }} />
            </Box>
          </Flex>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.700', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');

  return (
    <Stack align="center" direction={'row'} spacing={4}>
      {NAV_ITEMS.map(navItem => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Link
                p={2}
                display={'inline-flex'}
                href={navItem.href ?? '#'}
                isExternal={navItem.external}
                fontWeight={600}
                fontSize={{ md: 'xs', lg: 'md' }}
                color={linkColor}
                _hover={{
                  textDecoration: 'underline',
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                rounded={'xl'}
                minW={'sm'}
                textAlign={'left'}
              >
                <Stack>
                  {navItem.children.map(child => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Link
      href={href}
      role={'group'}
      display={'block'}
      p={2}
      isExternal
      rounded={'md'}
      _hover={{
        bg: useColorModeValue('pink.50', 'gray.900'),
      }}
    >
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            transition={'all .3s ease'}
            _groupHover={{ color: 'pink.400' }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}
        >
          <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}
    >
      {NAV_ITEMS.map(navItem => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
      <Flex
        py={2}
        as={Link}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Text
          onClick={makeSomeIce}
          fontWeight={600}
          color={useColorModeValue('gray.700', 'gray.200')}
        >
          Make Some Ice
        </Text>
      </Flex>
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href, external }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? '#'}
        justify={'space-between'}
        isExternal={external}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.800', 'gray.200')}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}
        >
          {children &&
            children.map(child => (
              <Link isExternal key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const NAV_ITEMS = [
  {
    label: 'Yearly Reports',
    external: false,
    children: [
      {
        label: '2023 Video Walkthrough',
        subLabel: 'First ice',
        href: 'https://www.youtube.com/watch?v=3S0cNhsHE9w',
      },
      {
        label: '2023 Writeup',
        subLabel: '300 lbs made!',
        href: 'https://docs.google.com/document/d/1v5CLqG7MKlwkY2MrCoq2D7YrU3C1jwpyJzqoLto2U-w/edit',
      },
    ],
  },
  {
    label: 'Open Source Plans',
    external: true,
    href: 'https://docs.google.com/presentation/d/10c6dhRPw7Wm4fZ_Hd5VRPPZENMB1cdKKAUs1QJF0Bwk/edit#slide=id.g249f672fe0c_0_71',
  },
];
