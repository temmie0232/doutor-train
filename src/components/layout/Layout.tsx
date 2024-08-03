import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 mt-16 mb-20">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;