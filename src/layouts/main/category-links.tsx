
import Box from '@mui/material/Box';
import React, { useMemo } from 'react';
import { useParams } from 'next/navigation';
import _get from 'lodash/get';
import { useTheme } from '@mui/material/styles';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { RouterLink } from 'src/routes/components';
import { CatalogTitles, ECatalogSection, TCatalogSection } from 'src/types/catalog';
import { hideScroll } from 'src/theme/css';

const CategoryLinks = () => {
	const theme = useTheme();

	const query = useParams();
	const matchCatalogSection: string | undefined = _get(query, 'pageFilters', [])[0];

	const renderLinksMemo = useMemo(() => Object.values(ECatalogSection).map((catalogSection) => {
		const title = CatalogTitles[catalogSection as TCatalogSection];

		const styleOptions = {};
		if (!!matchCatalogSection && matchCatalogSection === catalogSection) {
			Object.assign(styleOptions, {
				borderBottom: `2px solid ${theme.palette.primary.main}`,
				'& > span': {
					color: theme.palette.grey[100],
				}
			});
		}

		const href = `/catalog/${catalogSection}`;

		return (
			<Box component='li' key={href} sx={{
				padding: theme.spacing(0.5, 1, 0.5, 0.5),
				'&:not(:first-of-type)': {
					padding: theme.spacing(0.5, 1),
				},
				'&:last-of-type': {
					padding: theme.spacing(0.5, 0, 0.5, 1),
				},
			}}>
				<Link
					component={RouterLink}
					href={href}
					sx={{
						transition: 'color .3s ease',
						borderBottom: `2px solid ${theme.palette.background.default}`,
						'&:hover': {
							textDecoration: 'none',
						},
						...styleOptions,
					}}
				>
					<Typography variant='body2' component='span' sx={{
						color: theme.palette.grey[500],
						position: 'relative',
						cursor: 'pointer',
					}}>{title}</Typography>
				</Link>
			</Box>
		)
	}), [matchCatalogSection, theme]);

	return (
		<Box sx={{
			userSelect: 'none',
			width: '100%',
			position: 'relative',
			backgroundColor: theme.palette.grey[900],
			borderTop: `1px solid ${theme.palette.divider}`,
			borderBottom: `1px solid ${theme.palette.divider}`,
			px: theme.spacing(1),
			...hideScroll.x,
		}}>
			<Box component='ul' sx={{
				width: '100%',
				listStyle: 'none',
				padding: 0,
				margin: 0,
				display: 'flex',
				justifyContent: { xs: 'flex-start', sm: 'center' },
				flexWrap: 'nowrap',
				whiteSpace: 'nowrap',
				userSelect: 'none'
			}}>
				{renderLinksMemo}
			</Box>
		</Box>
	);
}

export default CategoryLinks;