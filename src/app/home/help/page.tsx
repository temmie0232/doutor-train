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
                        商品のアイコンが並べられており、左上には期間限定マーク、左下にはサイズ、右上にはその商品の理解度が表示されます。<br /><br />
                        理解度はクイズ(後述)を行っていない場合は未(未実施)と表示される。クイズでのスコアが100%の場合は100%と表示される。<br /><br />
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
                        このページでは、<a href="https://ja.wikipedia.org/wiki/%E9%96%93%E9%9A%94%E5%8F%8D%E5%BE%A9" className='underline'>アクティブリコール・間隔反復・分散学習</a>
                        アルゴリズムを利用して効率よく商品の作り方を覚えられます。<br /><br />
                        ユーザーのフィードバックから理解度を計算して、自動的に次回の最適な出題日を設定してくれます。<br /><br />
                        ホットドリンク/アイスドリンク/フード の３項目に分かれており、それぞれの項目で対応した問題が出題されます。<br /><br />
                        問題が自動的に毎日追加されるので、少しずつこなしていきましょう、毎日続けることが大事です。<br /><br />
                        繰り返し思い出すことは脳みそに負担がかかるので疲れやすく飽きやすいですが、学習効果はかなり高いのでくじけず頑張りましょう。<br /><br />
                        深いことは考えずに問題を解くだけでOKです。<br /><br />
                        ただコツとして、クイズに回答する前に頭の中で一旦出題された商品を作ってみて、その順番通りに選択肢を選ぶようにすると学習効果が更に高まります！<br />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>アプリについて</AccordionTrigger>
                    <AccordionContent>
                        ポートフォリオ作成の延長線上で作成したものです。<br />
                        デバッグに時間が割けなかったため、いくつかバグが残っていると思います。<br />
                        LINE内のメンバー以外(部外者)にこのアプリのURLを共有しないでください。
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                    <AccordionTrigger>語記/バグ を見つけた場合</AccordionTrigger>
                    <AccordionContent>
                        手打ちの部分もあるので、誤りもあると思います。見つけた場合は<br />
                        メールかLINEで教えて下さい。<br />
                        mail : temmie0232@gmail.com<br />
                        LINE : やぎ
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6">
                    <AccordionTrigger>トレーニングのアルゴリズム</AccordionTrigger>
                    <AccordionContent>
                        1. 概要<br />
                        このシステムは、効率的な学習を促進するために設計された間隔反復法を採用しています。記憶定着度に応じて、学習項目（カード）の復習間隔を動的に調整します。<br /><br />
                        2. カードの状態<br />
                        各カードは以下の属性を持ちます：<br />

                        ・isNew: 新規カードか復習カードかを示すブール値<br />
                        ・correctCount: 新規カード時の正解回数<br />
                        ・easeFactor: カードの難易度係数（デフォルト: 2.5）<br />
                        ・interval: 次回の復習までの間隔（日数）<br />
                        ・dueDate: 次回の復習予定日<br /><br />

                        3. 学習プロセス<br />
                        3.1 新規カード<br />

                        1.新規カードは最初に「新規キュー」に配置されます。<br />
                        2.ユーザーが100%のスコアを獲得した場合：<br />

                        ・correctCountが1増加します。<br />
                        ・correctCountが2に達した場合、カードは復習カードに変わります。<br />
                        ・そうでない場合、カードは新規キューの最後に移動します。<br />


                        3.100%未満のスコアの場合、カードは新規キューの最後に移動します。<br /><br />

                        3.2 復習カード<br />

                        1.復習カードは「復習キュー」に配置されます。<br />
                        2.ユーザーは問題に回答後、自身の理解度を4段階で評価します：<br />

                        ・完全に忘れていた<br />
                        ・思い出すのに苦労した<br />
                        ・少し努力して思い出した<br />
                        ・完璧に覚えていた<br />


                        ・この評価に基づいて、次回の復習間隔が計算されます。<br /><br />

                        4. 間隔計算アルゴリズム<br />
                        復習カードの次回表示間隔は以下のように計算されます：<br />

                        1.ユーザーの評価（1-4）に基づいて新しい間隔を計算：<br />

                        ・評価1: 間隔 = 1日<br />
                        ・評価2: 間隔 = max(1, floor(前回の間隔 * 0.5))<br />
                        ・評価3: 間隔 = 前回の間隔 * 難易度係数<br />
                        ・評価4: 間隔 = 前回の間隔 * 難易度係数 * 1.3<br />


                        2.難易度係数（easeFactor）の更新：<br />
                        新しい難易度係数 = 古い難易度係数 + (0.1 - (5 - 評価) * (0.08 + (5 - 評価) * 0.02))<br />
                        ただし、難易度係数の最小値は1.3とします。<br />
                        3.次回の復習予定日を計算：<br />
                        現在の日付 + 新しい間隔<br /><br />

                        5. キューの管理<br />

                        ・新規キュー：最大6枚のカードを保持<br />
                        ・復習キュー：最大12枚のカードを保持<br />
                        毎日、新しいカードが自動的に追加され、期限の過ぎたカードが復習キューに移動します。<br /><br />

                        6. 学習の進行<br />

                        1.新規カードは、2回連続で100%のスコアを獲得するまで新規キューに留まります。<br />
                        2.復習カードは、ユーザーの評価に基づいて間隔が調整されます。<br />
                        3.頻繁に正解すると間隔が長くなり、間違えると短くなります。<br />
                        4.これにより、よく覚えているカードは徐々に出現頻度が下がり、苦手なカードはより頻繁に表示されるようになります。<br /><br />

                        このシステムにより、ユーザーの記憶定着度に応じた効率的な学習が可能となり、長期的な記憶の定着を促進します。
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