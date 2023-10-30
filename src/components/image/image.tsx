import { forwardRef, useMemo } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { getRatio } from './utils';
import { ImageProps } from './types';

const Image = forwardRef<HTMLSpanElement, ImageProps>(
	(
		{
			ratio,
			overlay,
			disabledEffect = false,
			//
			alt,
			src,
			afterLoad,
			delayTime,
			threshold,
			beforeLoad,
			delayMethod,
			placeholder,
			wrapperProps,
			scrollPosition,
			effect = 'blur',
			visibleByDefault,
			wrapperClassName,
			useIntersectionObserver,
			placeholderSrc,
			sx,
			...other
		},
		ref,
	) => {
		const placeholderSrcMemo = useMemo(() => {
			if (placeholderSrc) {
				return placeholderSrc;
			}

			return disabledEffect ? '/assets/transparent.png' : '/assets/placeholder.svg';
		}, [placeholderSrc, disabledEffect]);
		const theme = useTheme();

		const overlayStyles = !!overlay && {
			'&:before': {
				content: '\'\'',
				top: 0,
				left: 0,
				width: 1,
				height: 1,
				zIndex: 1,
				position: 'absolute',
				background: overlay || alpha(theme.palette.grey[900], 0.48),
			},
		};

		const content = (
			<Box
				component={LazyLoadImage}
				//
				alt={alt}
				src={src}
				delayTime={delayTime}
				threshold={threshold}
				delayMethod={delayMethod}
				placeholder={placeholder}
				wrapperProps={wrapperProps}
				scrollPosition={scrollPosition}
				visibleByDefault={visibleByDefault}
				effect={disabledEffect ? undefined : effect}
				useIntersectionObserver={useIntersectionObserver}
				wrapperClassName={wrapperClassName || 'component-image-wrapper'}
				placeholderSrc={placeholderSrcMemo}
				beforeLoad={beforeLoad}
				afterLoad={afterLoad}
				sx={{
					transition: 'all 0.2s ease-in-out',
					width: 1,
					height: 1,
					objectFit: 'cover',
					verticalAlign: 'bottom',
					...(!!ratio && {
						top: 0,
						left: 0,
						position: 'absolute',
					}),
				}}
			/>
		);

		return (
			<Box
				ref={ref}
				component='span'
				className='component-image'
				sx={{
					transition: 'all 0.2s ease-in-out',
					overflow: 'hidden',
					position: 'relative',
					verticalAlign: 'bottom',
					display: 'inline-block',
					...(!!ratio && {
						width: 1,
					}),
					'& span.component-image-wrapper': {
						backgroundPosition: 'center',
						width: 1,
						height: 1,
						verticalAlign: 'bottom',
						backgroundSize: 'cover !important',
						...(!!ratio && {
							pt: getRatio(ratio),
						}),
					},
					...overlayStyles,
					...sx,
				}}
				{...other}
			>
				{content}
			</Box>
		);
	},
);

export default Image;
