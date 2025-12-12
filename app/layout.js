import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Chatbot from '@/components/Chatbot';
import PopupModal from '@/components/PopupModal';

export const metadata = {
    title: 'Shree Diagnostic - Your Health, Our Priority',
    description: 'Shree Diagnostic is a trusted pathology laboratory providing accurate and timely diagnostic services in Ambikapur. Book your tests online.',
    keywords: 'pathology lab, blood test, diagnostic center, health checkup, Ambikapur, Shree Diagnostic',
    authors: [{ name: 'Shree Diagnostic' }],
    openGraph: {
        title: 'Shree Diagnostic - Your Health, Our Priority',
        description: 'Trusted pathology laboratory providing accurate diagnostic services',
        type: 'website',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className="scroll-smooth">
            <body className="min-h-screen flex flex-col relative">
                {/* Background Image with Low Opacity */}
                <div
                    className="fixed inset-0 z-0 pointer-events-none"
                    style={{
                        backgroundImage: 'url(/lalpath1.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        opacity: 0.05,
                    }}
                />

                <AuthProvider>
                    <PopupModal />
                    <Header />
                    <main className="flex-grow relative z-10">
                        {children}
                    </main>
                    <Footer />
                    <WhatsAppButton />
                    <Chatbot />
                </AuthProvider>
            </body>
        </html>
    );
}

