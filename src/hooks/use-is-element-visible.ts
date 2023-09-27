import { useState, useEffect, useRef } from 'react';

function useIsElementVisible() {
	const ref = useRef<HTMLElement>();

	const [isVisible, setVisible] = useState<boolean>(false);
	const [lastScrollTop, setLastScrollTop] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			setLastScrollTop(window.pageYOffset || document.documentElement.scrollTop);

			if (!ref.current) {
				return;
			}

			const rect = ref.current.getBoundingClientRect();
			const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
			const windowWidth = (window.innerWidth || document.documentElement.clientWidth);

			const isElementVisible = (
				(rect.top >= 0 && rect.top <= windowHeight) ||
				(rect.bottom >= 0 && rect.bottom <= windowHeight)
			) && (
				(rect.left >= 0 && rect.left <= windowWidth) ||
				(rect.right >= 0 && rect.right <= windowWidth)
			);

			setVisible(isElementVisible);
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [ref, lastScrollTop]);

	return [ref, isVisible];
}

export default useIsElementVisible;
