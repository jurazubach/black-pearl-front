import React from 'react';
import { styled, Theme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { SxProps } from '@mui/system';

const StyledProductCardRoot = styled(Stack)(({ theme }) => ({
	margin: '1px 4px',
	padding: theme.spacing(1),
	border: `1px solid ${theme.palette.grey[700]}`,
	position: 'relative',
	transition: 'all .2s ease-in',
	opacity: 0.8,
	'&:hover': {
		backgroundColor: theme.palette.grey[800],
		opacity: 1,
	},
	'&:hover .MuiBox-root[data-attr="angles"]': {
		backgroundSize: theme.spacing(6, 6),
	},
}));

const CardAngles = styled(Box)(({ theme }) => {
	const borderColor = theme.palette.grey[500];

	return {
		background: `linear-gradient(to right, ${borderColor} 2px, transparent 2px) 0 0, linear-gradient(to bottom, ${borderColor} 2px, transparent 2px) 0 0, linear-gradient(to left, ${borderColor} 2px, transparent 2px) 100% 0, linear-gradient(to bottom, ${borderColor} 2px, transparent 2px) 100% 0, linear-gradient(to left, ${borderColor} 2px, transparent 2px) 100% 100%, linear-gradient(to top, ${borderColor} 2px, transparent 2px) 100% 100%, linear-gradient(to right, ${borderColor} 2px, transparent 2px) 0 100%, linear-gradient(to top, ${borderColor} 2px, transparent 2px) 0 100%`,
		backgroundRepeat: 'no-repeat',
		backgroundSize: theme.spacing(3, 3),
		position: 'absolute',
		top: '-2px',
		right: '-2px',
		bottom: '-2px',
		left: '-2px',
		transition: 'background-size 0.2s cubic-bezier(0.455, 0.03, 0.515, 0.955)',
	};
});

interface Props {
	children: React.ReactNode | React.ReactNode[];
	sx?: SxProps<Theme>;
	spacing?: number;
}

const BorderCard = ({ sx, children, spacing = 0 }: Props) => (
	<StyledProductCardRoot sx={sx} spacing={spacing}>
		<CardAngles data-attr='angles' />

		{children}
	</StyledProductCardRoot>
);

export default BorderCard;