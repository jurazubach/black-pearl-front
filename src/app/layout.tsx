// i18n
import 'src/locales/i18n';

// scrollbar
import 'simplebar-react/dist/simplebar.min.css';

// lightbox
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

// map
import 'mapbox-gl/dist/mapbox-gl.css';

// editor
import 'react-quill/dist/quill.snow.css';

// carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// image
import 'react-lazy-load-image-component/src/effects/blur.css';

import { LocalizationProvider } from 'src/locales';
import ThemeProvider from 'src/theme';
import { primaryFont } from 'src/theme/typography';
import ProgressBar from 'src/components/progress-bar';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import SnackbarProvider from 'src/components/snackbar/snackbar-provider';
import { CheckoutProvider } from 'src/context/checkout-context';
import { DialogProvider } from 'src/context/dialog-context';
import { DrawerProvider } from 'src/context/drawer-context';
import CheckoutDrawer from 'src/components/checkout/checkout-drawer';

export const metadata = {
	title: 'NVRMORE',
	description:
		'Відкрийте світ розкіші та елегантності з Black Pearl. Ми пропонуємо унікальний люксовий одяг зі звичайною метою вивести ваш стиль на новий рівень. Вишуканість, деталі та індивідуальний підхід - ось те, чим ми відзначаємось.',
	keywords: 'Люксовий одяг,Елегантний стиль,Розкішні вироби,Український бренд,Унікальний дизайн,Індивідуальний підхід,Стильний образ,Бренд NVRMORE',
	themeColor: '#000000',
	manifest: '/manifest.json',
	viewport: {
		width: 'device-width',
		initialScale: 1,
		maximumScale: 1,
	},
	icons: [
		{
			rel: 'icon',
			url: '/favicon/favicon.ico',
		},
		{
			rel: 'icon',
			type: 'image/png',
			sizes: '16x16',
			url: '/favicon/favicon-16x16.png',
		},
		{
			rel: 'icon',
			type: 'image/png',
			sizes: '32x32',
			url: '/favicon/favicon-32x32.png',
		},
		{
			rel: 'apple-touch-icon',
			sizes: '180x180',
			url: '/favicon/apple-touch-icon.png',
		},
	],
};

type Props = {
	children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
	return (
		<html lang='en' className={primaryFont.className}>
		<body>
		<LocalizationProvider>
			<ThemeProvider>
				<MotionLazy>
					<SnackbarProvider>
						<CheckoutProvider>
							<DrawerProvider>
								<DialogProvider>
									<CheckoutDrawer />
									<ProgressBar />
									{children}
								</DialogProvider>
							</DrawerProvider>
						</CheckoutProvider>
					</SnackbarProvider>
				</MotionLazy>
			</ThemeProvider>
		</LocalizationProvider>
		</body>
		</html>
	);
}
