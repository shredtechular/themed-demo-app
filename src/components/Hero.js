import React, { useContext, useState, useEffect, useRef } from 'react';
import QRCode from 'react-qr-code';
import { chakra, Box, Heading, Image, Flex, Center, Link } from '@chakra-ui/react'
import { DemoContext } from '../App';

export default function Hero() {
	const { context } = useContext(DemoContext);
	const [audioPlaying, setAudioPlaying] = useState(false);
	const audioRef = useRef();
	const qrCodeURL = process.env.REACT_APP_GITHUB_PAGES_URL;

	let canPlaySound = (context.soundEnabled === true && context.clickSound.length > 0);

	const imageClick = () => {
		if (canPlaySound && audioRef.current.readyState === 4) {
			if (!audioPlaying) {
				audioRef.current.src = context.clickSound;
				audioRef.current.play();
				setAudioPlaying(true);
			}
		}
	}

	useEffect(() => {
		if (canPlaySound) {
			audioRef.current = new Audio();
			audioRef.current.autoplay = true;
			audioRef.current.src = "data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRbAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQMSkAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV";
			audioRef.current.addEventListener('ended', () => {
				audioRef.current.currentTime = 0;
				setAudioPlaying(false)
			});
		}
	}, [context.soundEnabled, context.clickSound]);

	return (
		<Box textAlign="center">
			<Center bg="brand.title_bg1"
				h={{ base: '40px', md: '60px' }}>
				<chakra.h1 fontWeight="medium" color="brand.title" fontSize={{ base: 30, md: 50 }}>
					Welcome to the {context.soundEnabled}
				</chakra.h1>
			</Center>

			<Flex
				className="heroSection"
				bgPosition="center"
				bgRepeat="no-repeat"
				bgSize="cover"
				justify="center"
				bgImage={context.heroImage}
				h={{ base: '100px', md: '200px', lg: '300px' }}>
				<Center>
					<Heading
						className='themeName'
						fontSize={{ base: 80, md: 100, lg: 180 }}
						letterSpacing="tighter"
						fontWeight={{ base: "bold", md: "extrabold " }}
						fontStyle="italic"
						color="brand.title">
						{context.theme}
					</Heading>
				</Center>
			</Flex>

			<Center bg="brand.title_bg2" h={{ base: '40px', md: '60px' }} p="6">
				<Heading fontSize={{ base: 30, md: 50 }} color="brand.title">
					Demo App!
				</Heading>
			</Center>

			{context.showQRCode &&
				<Center margin={3}>
					<QRCode value={qrCodeURL} />
				</Center>
			}

			{(canPlaySound) ?
				<Box onClick={imageClick} cursor="pointer">
					<Center>
						<Image
							mt={3}
							height="auto"
							p={0}
							mb={0}
							maxWidth={{ base: '40%', md: '60%' }}
							cursor="pointer"
							src={
								context.selectedItem != context.NOP ?
									context.items.find((item) => item.name === context.selectedItem).image
									: context.defaultItemImage
							} />
					</Center>
					<Center>
						<chakra.span cursor="pointer" lineHeight={1} fontSize={{ base: 20, md: 30 }}>Click Me!</chakra.span>
					</Center>
				</Box>
				:
				<Center>
					<Image
						mt={3}
						height="auto"
						p={0}
						mb={0}
						maxWidth={{ base: '40%', md: '60%' }}
						src={
							context.selectedItem != context.NOP ?
								context.items.find((item) => item.name === context.selectedItem).image
								: context.defaultItemImage
						}
					/>
				</Center>
			}

		</Box>
	);
}