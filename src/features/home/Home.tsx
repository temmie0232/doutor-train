"use client";

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WelcomeMessage from '@/features/home/WelcomeMessage';
import MenuButtons from '@/features/home/MenuButtons';

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 pt-16 pb-20 flex flex-col justify-center">
        <div className="mb-16 text-center">
          <WelcomeMessage user={user} />
        </div>
        <MenuButtons />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;