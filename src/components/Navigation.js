import { useContext, useEffect, useState } from 'react'
import { DemoContext } from '../App.js';
import {
	Box,
	Flex,
	Image,
	HStack,
	Link,
	IconButton,
	useDisclosure,
	Stack
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import SettingsDrawer from './Drawer.js';
import Broken from './Broken.js';

export default function Navigation() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { context } = useContext(DemoContext);
	const [showUIBroken, setShowUIBroken] = useState(false);
	const hasNavLinks = (context.navLinks?.length > 0);

	useEffect(() => {
		if (!context.demoBroken && showUIBroken) {
			setShowUIBroken(false);
		}
	}, [context.demoBroken]);

	function firstLinkClicked() {
		setShowUIBroken(context.demoBroken);
	}

	const ServerBroken = () => {
		return context.demoServerBroken ? <div><Broken server='true' /></div> : null;
	}

	const UIBroken = () => {
		return showUIBroken ? <div><Broken /></div> : null;
	}

	const NavLinksWithBrokenLink = () => {
		return hasNavLinks ?
			context.navLinks.map((link, index) =>
				<Link {...(index === 0 && { onClick: firstLinkClicked })}
					key={link} px={2} py={1} rounded='md' _hover={{ textDecoration: 'none' }} href='#'>{link}
				</Link>)
			: null;
	}

	const CloseMenuButton = () => { 
		return hasNavLinks ?
			<IconButton
				border='2px' borderColor='gray.300'
				size={'md'}
				icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
				aria-label={'Open Menu'}
				display={{ md: 'none' }}
				onClick={isOpen ? onClose : onOpen} />
			: null;
	}

	return (
		<Box px={2} w='full' textAlign='center' justifyContent='center'>
			<ServerBroken />
			<UIBroken />
			<Flex h={20} alignItems='center' justifyContent='space-between'>
				<CloseMenuButton />
				<Flex>
					<Image marginLeft='8px' src='ld_logo_dark.png' height='1.5rem' width='9.75rem' className='ldLogoImage' />
				</Flex>
				<HStack spacing={3} alignItems='center' display='flex'>
					<HStack
						as='nav'
						spacing={1}
						display={{ base: 'none', md: 'flex' }}>
						<NavLinksWithBrokenLink />
					</HStack>

					<SettingsDrawer />

					<Image
						htmlHeight={64}
						htmlWidth={50}
						src={context.avatar} />
				</HStack>
			</Flex>

			{isOpen &&
				<Box pb={4} display={{ md: 'none' }}>
					<Stack as={'nav'} spacing={4}>
						<NavLinksWithBrokenLink />
					</Stack>
				</Box>
			}
		</Box>
	)
}
