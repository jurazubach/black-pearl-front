export default function isElementVisible(el?: Element) {
	if (!el) {
		return false;
	}

	const rect = el.getBoundingClientRect();
	const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
	const windowWidth = (window.innerWidth || document.documentElement.clientWidth);

	// Проверяем, находится ли элемент в пределах видимой области по вертикали и горизонтали
	return (
		(rect.top >= 0 && rect.top <= windowHeight) ||
		(rect.bottom >= 0 && rect.bottom <= windowHeight)
	) && (
		(rect.left >= 0 && rect.left <= windowWidth) ||
		(rect.right >= 0 && rect.right <= windowWidth)
	);
}
