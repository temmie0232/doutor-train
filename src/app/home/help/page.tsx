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
                        マニュアルでは、ドトールのメニューについての詳細を確認できます。<br /><br />
                        上部の検索バーで商品の検索、ソートなどができます。<br /><br />
                        商品のアイコンをクリックすることで商品の詳細ページに遷移し、その商品の詳細・作り方などを確認できます。<br /><br />
                        商品の詳細ページの下にクイズに挑戦できるボタンがあり、それをクリックするとクイズ形式で理解度を確認できます。<br /><br />
                        クイズの結果は理解度として、マニュアルの商品リストが表示されるページで商品の右上に表示されるようになります。<br /><br />
                        100%を目指してみましょう！
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>トレーニングについて</AccordionTrigger>
                    <AccordionContent>
                        !!! マニュアルを一通り触れた人向け !!!<br /><br />
                        このページでは、間隔反復アルゴリズムを利用して効率よく商品の作り方を覚えられます。<br /><br />
                        ユーザーのフィードバックから理解度を計算して、自動的に次回の最適な出題日を設定してくれます。<br /><br />
                        ホットドリンク/アイスドリンク/フード の３項目に分かれており、それぞれの項目で対応した問題が出題されます。<br /><br />
                        問題が自動的に毎日追加されるので、少しずつこなしていきましょう！毎日続けることが大事です！<br /><br />
                        繰り返し思い出すことは脳みそに負担がかかるので疲れやすく飽きやすいですが、学習効果はかなり高いのでくじけず頑張りましょう。<br /><br />
                        深いことは考えずに問題を解くだけでOKです。<br /><br />
                        ただコツとして、クイズに回答する前に頭の中で一旦出題された商品を作ってみて、その順番通りに選択肢を選ぶようにすると学習効果が更に高まります！<br />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>アプリについて</AccordionTrigger>
                    <AccordionContent>
                        LINE内のメンバー以外(部外者)にこのアプリのURLを共有しないでください。
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                    <AccordionTrigger>語記を見つけた場合</AccordionTrigger>
                    <AccordionContent>
                        手打ちの部分もあるので、誤りもあると思います。見つけた場合は<br />
                        メールかLINEで 誤:〇〇 正:〇〇 のように送ってください。<br />
                        mail : temmie0232@gmail.com<br />
                        LINE : やぎ
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6">
                    <AccordionTrigger>トレーニングのアルゴリズム</AccordionTrigger>
                    <AccordionContent>
                        後で更新
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-7">
                    <AccordionTrigger>リポジトリ</AccordionTrigger>
                    <AccordionContent>
                        <a href="https://github.com/temmie0232/doutor-train">https://github.com/temmie0232/doutor-train</a>
                    </AccordionContent>
                </AccordionItem>

            </Accordion>
        </Layout>
    );
};

export default HelpPage;