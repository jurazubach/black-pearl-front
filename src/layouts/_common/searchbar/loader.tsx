import React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const StyledLoaderRoot = styled(Box)(({ theme }) => ({
	display: 'inline-block',
	position: 'relative',
	width: '80px',
	height: '58px',
	'& .MuiBox-root': {
		'@keyframes lds-ellipsis1': {
			'0%': {
				transform: 'scale(0)',
			},
			'100%': {
				transform: 'scale(1)'
			}
		},
		'@keyframes lds-ellipsis3': {
			'0%': {
				transform: 'scale(1)',
			},
			'100%': {
				transform: 'scale(0)'
			}
		},
		'@keyframes lds-ellipsis2': {
			'0%': {
				transform: 'translate(0, 0)',
			},
			'100%': {
				transform: 'translate(24px, 0)',
			}
		},
		position: 'absolute',
		top: '24px',
		width: '13px',
		height: '13px',
		borderRadius: '50%',
		background: theme.palette.primary.main,
		animationTimingFunction: 'cubic-bezier(0, 1, 1, 0)',

		'&:nth-child(1)': {
			left: '8px',
			animation: 'lds-ellipsis1 0.6s infinite',
		},
		'&:nth-child(2)': {
			left: '8px',
			animation: 'lds-ellipsis2 0.6s infinite',
		},
		'&:nth-child(3)': {
			left: '32px',
			animation: 'lds-ellipsis2 0.6s infinite',
		},
		'&:nth-child(4)': {
			left: '56px',
			animation: 'lds-ellipsis3 0.6s infinite',
		},
	}
}));

const Loader = () => {
	return (
		<Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
			<StyledLoaderRoot>
				<Box />
				<Box />
				<Box />
				<Box />
			</StyledLoaderRoot>
		</Box>
	);
};

export default Loader;