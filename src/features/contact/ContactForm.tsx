"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/layout/Layout';
import ContactForm from '@/features/contact/ContactForm';
import ResponseDialog from '@/features/contact/ResponseDialog';

const ContactPage: React.FC = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [response, setResponse] = useState('');
    const router = useRouter();

    const handleSubmit = async (title: string, content: string) => {
        try {
            // APIルートを呼び出してメール送信とOpenAI APIの処理を行う
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, content }),
            });

            if (!res.ok) {
                throw new Error('Failed to send message');
            }

            const data = await res.json();
            setResponse(data.response);
            setIsDialogOpen(true);
        } catch (error) {
            console.error('Error:', error);
            setResponse('申し訳ございません。メッセージの送信中にエラーが発生しました。後ほど再度お試しください。');
            setIsDialogOpen(true);
        }
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        router.push('/home');
    };

    return (
        <Layout>
            <div className="max-w-2xl mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">お問い合わせ</h1>
                <ContactForm onSubmit={handleSubmit} />
                <ResponseDialog
                    isOpen={isDialogOpen}
                    onClose={handleCloseDialog}
                    response={response}
                />
            </div>
        </Layout>
    );
};

export default ContactPage;