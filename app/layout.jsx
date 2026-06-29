import './globals.css';
import PageTransitionOverlay from '@/components/PageTransitionOverlay';

export const metadata = {
    title: 'Data Analyst & Full Stack Developer | Jainil Patel',
    description: 'Personal portfolio of Jainil Patel, a Computer Science student and Full Stack Developer. Explore projects, skills, and contact details.',
    icons: {
        icon: '/favicon.png',
        shortcut: '/favicon.png',
        apple: '/logo.png',
    },
};

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <PageTransitionOverlay />
                {children}
            </body>
        </html>
    );
}
