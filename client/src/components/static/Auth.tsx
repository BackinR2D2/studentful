import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getUserData } from '../../api/getUserData';
import { updateUserData } from '../../features/user';
import { useDispatch } from 'react-redux';
import { Box, Spinner, useToast } from '@chakra-ui/react';

function Auth({
	children,
}: {
	children: string | JSX.Element | JSX.Element[];
}) {
	const dispatch = useDispatch();
	const toast = useToast();
	const [user, setUser] = useState<Record<string, string> | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	const getUserDataHandler = async () => {
		const auth = localStorage.getItem('auth') ?? '';
		setIsLoading(true);
		const userData = await getUserData(auth);
		if (userData?.status === 0) {
			setIsLoading(false);
			setUser(null);
			dispatch(updateUserData(null));
			toast({
				title: userData?.message,
				status: 'error',
				isClosable: true,
				duration: 2000,
				position: 'top-right',
			});
			return;
		}
		dispatch(updateUserData(userData?.data[0]));
		setUser(userData?.data[0]);
		setIsLoading(false);
	};

	useEffect(() => {
		getUserDataHandler();
	}, []);

	if (user === null && isLoading === false) {
		return <Navigate to={'/login'} />;
	} else {
		return (
			<>
				{isLoading ? (
					<Box
						h={'86vh'}
						display='flex'
						alignItems='center'
						justifyContent='center'
					>
						<Spinner w={'8rem'} h={'8rem'} thickness='6px' color='blue.400' />
					</Box>
				) : (
					<>{children}</>
				)}
			</>
		);
	}
}

export default Auth;
