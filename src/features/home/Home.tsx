"use client"
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import WelcomeMessage from '@/features/home/WelcomeMessage';
import MenuButtons from '@/features/home/MenuButtons';
import NameInputModal from '@/features/home/NameInputModal';
import { MdCoffee } from 'react-icons/md';

const HomePage = () => {
  const { user, saveUserName, getUserName } = useAuth();
  const [showNameModal, setShowNameModal] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const checkUserName = async () => {
      if (user) {
        const name = await getUserName();
        if (name) {
          setUserName(name);
        } else {
          setShowNameModal(true);
        }
      }
    };
    checkUserName();
  }, [user, getUserName]);

  const handleNameSubmit = async (name: string) => {
    await saveUserName(name);
    setUserName(name);
    setShowNameModal(false);
  };

  return (
    <Layout>
      <div className="flex flex-col h-full justify-between px-4">
        <div className="flex-grow flex flex-col justify-center items-center">
          <div className="mb-8 text-center">
            <MdCoffee className="text-6xl mt-10 mb-3 mx-auto text-brown-600" />
            <WelcomeMessage user={user} userName={userName} />
          </div>
          <MenuButtons />
        </div>
      </div>
      <NameInputModal isOpen={showNameModal} onClose={handleNameSubmit} />
    </Layout>
  );
};

export default HomePage;