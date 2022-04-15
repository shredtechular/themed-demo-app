import { useState, useEffect, useRef, useContext } from 'react';
import { Text, Box, Heading, Image, Flex, Center } from '@chakra-ui/react'
import { DemoContext } from '../App.js';

export default function ThemedDemo() {
	const { context } = useContext(DemoContext);
	const [audioPlaying, setAudioPlaying] = useState(false);
	const audioRef = useRef();

	const imageClick = () => {
		if (context.soundEnabled) {
			const src = (context.selectedItem.sound || context.clickSound);
			if (src.length > 0 && audioRef.current.readyState === 4) {
				if (!audioPlaying) {
					audioRef.current.src = src;
					audioRef.current.play();
					setAudioPlaying(true);
				}
			}
		}
	}

	const HeroImage = () => {
		const imageSrc = (context.selectedItem != context.NOP) ? context.selectedItem.image : context.defaultItemImage;
		let cursor = '';
		let clickHandler = null;
		let clickMessage = null;

		if (context.soundEnabled) {
			cursor = 'pointer';
			clickHandler = imageClick;
			clickMessage = <Center><Text className='blink' mt={1} fontSize={{ base: 40, md: 60, lg: 100 }} lineHeight={1} fontWeight='bold'>CLICK ME!</Text></Center>;
		}

		return <Box onClick={clickHandler} cursor={cursor}>
			<Center>
				<Image mt={3} height='auto' maxWidth={{ base: '40%', md: '60%' }} src={imageSrc} />
			</Center>
			{clickMessage}
		</Box>;
	}

	useEffect(() => {
		let isMounted = true;
		if (context.soundEnabled && !audioRef.current) {
			audioRef.current = new Audio();

			//hack for iOS Safari sound woes...
			audioRef.current.autoplay = true;
			audioRef.current.src = 'data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRbAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQMSkAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV';

			audioRef.current.addEventListener('ended', () => {
				audioRef.current.currentTime = 0;
				if (isMounted) setAudioPlaying(false)
			});
		}
		return () => { isMounted = false };
	}, [context.soundEnabled]);

	return (
		<Box>
			<Center bg='brand.title_bg1' h={{ base: '40px', md: '60px' }}>
				<Text color='brand.title' fontSize={{ base: 30, md: 45 }} letterSpacing='tight'>
					WELCOME TO THE
				</Text>
			</Center>

			<Flex
				className='heroSection'
				bgPosition='center'
				bgRepeat='no-repeat'
				bgSize='cover'
				justify='center'
				bgImage={context.heroImage}
				h={{ base: '100px', md: '200px', lg: '300px' }}>
				<Center>
					<Heading
						className='themeName'
						fontSize={{ base: 70, md: 140, lg: 180 }}
						letterSpacing='tighter'
						fontWeight={{ base: 'bold', md: 'extrabold' }}
						fontStyle='italic'
						color='brand.title'>
						{context.theme}
					</Heading>
				</Center>
			</Flex>

			<Center bg='brand.title_bg2' h={{ base: '40px', md: '60px' }}>
				<Text fontSize={{ base: 30, md: 45 }} color='brand.title' letterSpacing='tight'>
					DEMO APP
				</Text>
			</Center>

			<HeroImage />
		</Box>
	);
}