import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import NextLink from 'next/link';
import React from 'react';
import { useTheme } from '@mui/material/styles';
import { IArticleItem } from 'src/types/article';
import BorderCard from '../border-card';
import Image from '../image';

interface Props {
	blogPost: IArticleItem;
}

const CardPost = ({ blogPost }: Props) => {
	const theme = useTheme();

	return (
		<BorderCard sx={{
			width: 'unset !important',
			'&:hover .MuiLink-root[data-attr="link"]': { color: theme.palette.grey[100] },
			'&:hover .component-image.MuiBox-root': { transform: 'scale(1.1)' },
		}}>
			<Box sx={{ overflow: 'hidden', height: '300px' }}>
				<Image
					src={blogPost.imageSrc}
					disabledEffect
					decoding='async'
					loading='lazy'
					sx={{ transition: 'all .2s ease-in', height: '100%', width: '100%' }}
				/>
			</Box>
			<Stack direction='row' spacing={1} sx={{ p: 1, pb: 0, zIndex: 1 }}>
				<Stack direction='row' alignItems='center' spacing={1} sx={{ pr: 1, borderRight: `1px solid ${theme.palette.divider}` }}>
					<Typography color='primary' variant='h2' sx={{ height: theme.spacing(5), lineHeight: theme.spacing(5) }}>20</Typography>
					<Stack direction='column' sx={{ justifyContent: 'center' }}>
						<Typography color='grey.300' variant='subtitle2'>грудня</Typography>
						<Typography color='grey.300' variant='subtitle2'>2023</Typography>
					</Stack>
				</Stack>

				<Link underline='hover' variant='h6' sx={{
					color: 'grey.300',
					userSelect: 'none',
					transition: 'all 0.2s ease-in',
					height: theme.spacing(7),
					overflow: 'hidden',
					whiteSpace: 'normal',
					textOverflow: 'ellipsis',
				}} component={NextLink} href={`/blog/article/${blogPost.alias}`} data-attr='link'>
					{blogPost.title}
				</Link>
			</Stack>
		</BorderCard>
	);
}

export default CardPost;
