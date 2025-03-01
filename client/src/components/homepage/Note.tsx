import {
	Box,
	Skeleton,
	Text,
	useColorModeValue,
	useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { getLastNote } from '../../api/getLastNote';
import { formatDate } from '../../utils/formatDate';
import { useNavigate } from 'react-router-dom';

function Note() {
	const [note, setNote] = useState<Record<string, any>>({});
	const [loading, setLoading] = useState<boolean>(false);
	const toast = useToast();
	const navigate = useNavigate();

	const getLastNoteHandler = async () => {
		setLoading(true);
		const lastNote = await getLastNote();
		if (lastNote?.error) {
			toast({
				title: 'Error',
				description: lastNote.error,
				status: 'error',
				duration: 3000,
				isClosable: true,
			});
			return;
		}
		setNote(lastNote?.data[0]);
		setLoading(false);
	};

	useEffect(() => {
		getLastNoteHandler();
	}, []);

	const noteBg = useColorModeValue('white', '#252A34');
	const noteBorder = useColorModeValue('#ccc', '#393E46');
	const textColor = useColorModeValue('#1d2025', '#EDEDED');
	const hoverShadow = useColorModeValue(
		'0 4px 12px rgba(0,0,0,0.15)',
		'0 4px 12px rgba(255,255,255,0.15)'
	);
	const bgImage = useColorModeValue(
		'linear-gradient(rgba(0, 0, 255, 0.15) 1px, transparent 1px)',
		'linear-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)'
	);
	const tagColor = useColorModeValue('gray.600', 'gray.400');
	const createdAtColor = useColorModeValue('gray.500', 'gray.400');

	return (
		<Skeleton isLoaded={!loading}>
			<Text fontWeight={600} fontSize={'16px'}>
				Ultima notita
			</Text>
			<Box
				key={note.id as number}
				className='noteContainer'
				p='1rem'
				minH='10rem'
				bg={noteBg}
				color={textColor}
				border={`1px solid ${noteBorder}`}
				borderRadius='8px'
				cursor='pointer'
				transition='all 0.3s ease'
				_hover={{ transform: 'scale(1.02)', boxShadow: hoverShadow }}
				onClick={() => navigate(`/note/${note.id}`)}
				position='relative'
				boxShadow='lg'
				_before={{
					content: '""',
					position: 'absolute',
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
					backgroundImage: bgImage,
					backgroundSize: '100% 24px',
					opacity: 0.6,
					pointerEvents: 'none',
				}}
			>
				<Box
					className='noteTitle'
					textAlign='center'
					fontWeight={600}
					fontSize='1.2rem'
					fontFamily='Inter'
					mb='0.5rem'
					pos={'relative'}
					bottom={'-6px'}
				>
					{note.title as string}
				</Box>

				<Box
					className='noteContent'
					fontSize='1rem'
					fontFamily="'Courier New', monospace"
					lineHeight='1.5'
					whiteSpace='pre-line'
				>
					{note?.content as string}
				</Box>

				{note?.tag && (
					<Box
						className='noteTag'
						textAlign='right'
						fontWeight={300}
						fontSize='12px'
						mt='0.5rem'
						fontStyle='italic'
						color={tagColor}
					>
						{note.tag as string}
					</Box>
				)}

				<Box
					className='noteCreatedAt'
					textAlign='right'
					mt='4px'
					fontSize='14px'
					color={createdAtColor}
				>
					{formatDate(note.created_at as string)}
				</Box>
			</Box>
		</Skeleton>
	);
}

export default Note;
