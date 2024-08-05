import React from 'react';
import Layout from '@/components/layout/Layout';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const HelpPage: React.FC = () => {
    return (
        <Layout>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>マニュアルについて</AccordionTrigger>
                    <AccordionContent>
                        マニュアルでは、ドリング・フードの作り方を学べます。
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>トレーニングについて</AccordionTrigger>
                    <AccordionContent>
                        自分の知識がどのくらい定着しているかをクイズを通して確認できます。
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>アプリについて</AccordionTrigger>
                    <AccordionContent>
                        多分このアプリグレーなので,LINE内のメンバー以外(部外者)にこのアプリのURLを共有しないでください。
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger>アカウントのパスワードを忘れた場合は？</AccordionTrigger>
                    <AccordionContent>
                        パスワードのリセットは実装しないので新しいアカウントで始めてください。
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                    <AccordionTrigger>誤情報を見つけた場合</AccordionTrigger>
                    <AccordionContent>
                        メールで 誤:〇〇 正:〇〇 のように送ってください。
                        temmie0232@gmail.com
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </Layout>
    );
};

export default HelpPage;