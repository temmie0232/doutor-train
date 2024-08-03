"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WelcomeMessage from '@/features/home/WelcomeMessage';
import MenuButtons from '@/features/home/MenuButtons';
import AccountRequiredAlert from '@/components/elements/AccountRequiredAlert';

const HomePage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [showAlert, setShowAlert] = useState(false);

  const handleTrainingClick = () => {
    if (user?.isAnonymous) {
      setShowAlert(true);
    } else {
      router.push('/home/training');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 pt-16 pb-20 flex flex-col justify-center">
        <div className="mb-16 text-center">
          <WelcomeMessage user={user} />
        </div>
        <MenuButtons onTrainingClick={handleTrainingClick} />
      </main>
      <Footer />
      <AccountRequiredAlert open={showAlert} onOpenChange={setShowAlert} />
    </div>
  );
};

export default HomePage;