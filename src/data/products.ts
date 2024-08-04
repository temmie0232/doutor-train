export interface Product {
    name: string;
    image: string;
    category: 'ice' | 'hot' | 'food';
    sizes: string[];
    isLimited?: boolean;
    isOnSale: boolean;
    description: string;
}

export const products: Product[] = [
    { name: 'ブレンドコーヒー', image: '/images/1.jpg', category: 'hot', sizes: ['R', 'L'], isOnSale: true, description: 'マイルドな口あたりが特徴で、どなたにも親しんでいただけるコーヒーです。' },
    { name: 'アメリカンコーヒー', image: '/images/2.jpg', category: 'hot', sizes: ['R'], isOnSale: true, description: '苦味が少なく、すっきりとした味わいのコーヒーです。' },
    { name: 'ティー', image: '/images/3.jpg', category: 'hot', sizes: ['R'], isOnSale: true, description: 'ダージリン、アッサムなどをブレンドしてバランスをとった、すっきりと飲みやすい紅茶です。' },
    { name: 'ルイボスティー', image: '/images/4.jpg', category: 'hot', sizes: ['R'], isOnSale: true, description: 'データがありません。' },
    { name: 'ロイヤルミルクティー', image: '/images/5.jpg', category: 'hot', sizes: ['R'], isOnSale: true, description: '紅茶の上品な香りとミルクのコクが楽しめます。' },
    { name: '豆乳ティー', image: '/images/6.jpg', category: 'hot', sizes: ['R', 'L'], isOnSale: true, description: '豆乳でつくったロイヤルミルクティーです。' },
    { name: 'ホットミルク', image: '/images/7.jpg', category: 'hot', sizes: ['R', 'L'], isOnSale: true, description: 'データがありません。' },
    { name: 'ホット豆乳', image: '/images/8.jpg', category: 'hot', sizes: ['R', 'L'], isOnSale: true, description: 'データがありません。' },
    { name: 'ココア', image: '/images/9.jpg', category: 'hot', sizes: ['R', 'L'], isOnSale: true, description: '口当たりまろやかなココアです。' },
    { name: '沖縄黒糖ラテ', image: '/images/10.jpg', category: 'hot', sizes: ['R', 'L'], isOnSale: true, description: '黒糖の深い味わいとまろやかさが広がる、風味豊かなラテです。' },
    { name: 'ハニーカフェ・オレ', image: '/images/11.jpg', category: 'hot', sizes: ['R', 'L'], isOnSale: true, description: '最後までハチミツの風味が広がります。' },
    { name: '宇治抹茶ラテ', image: '/images/12.jpg', category: 'hot', sizes: ['R', 'L'], isOnSale: true, description: '宇治抹茶とミルクがマッチした絶妙な味わいです。' },
    { name: '宇治抹茶豆乳ラテ', image: '/images/13.jpg', category: 'hot', sizes: ['R', 'L'], isOnSale: true, description: '定番人気の宇治抹茶ラテを豆乳で仕立てました。' },
    { name: '豆乳ラテ', image: '/images/14.jpg', category: 'hot', sizes: ['R', 'L'], isOnSale: true, description: '豆乳でつくったカフェラテです。' },
    { name: 'カフェモカ', image: '/images/15.jpg', category: 'hot', sizes: ['R', 'L'], isOnSale: true, description: 'オリジナルのココアにエスプレッソを加えホイップとカプチーノパウダーをトッピング。こだわりのコーヒーとココアを絶妙にマッチさせた、ほどよい甘さが特長です。' },
    { name: 'エスプレッソコーヒー', image: '/images/16.jpg', category: 'hot', sizes: ['R'], isOnSale: true, description: 'コーヒーの旨みを凝縮し、豊潤な香りとすっきりとした苦味が感じられます。' },
    { name: 'カフェ・ラテ', image: '/images/17.jpg', category: 'hot', sizes: ['R', 'L'], isOnSale: true, description: 'しっかりしたコーヒー感が自慢のまろやかな味です。' },
    { name: '本日のコーヒー', image: '/images/18.jpg', category: 'hot', sizes: ['R'], isOnSale: true, description: 'データがありません。' },

    { name: 'アイスコーヒー', image: '/images/19.jpg', category: 'ice', sizes: ['R', 'L'], isOnSale: true, description: '苦味を抑え、香ばしさと甘味を感じられるアイスコーヒーです。' },
    { name: 'アイスティー', image: '/images/20.jpg', category: 'ice', sizes: ['R', 'L'], isOnSale: true, description: 'フルーティーな香りとコクのある味わいが特長のアイスティーです。' },
    { name: 'アイスルイボスティー', image: '/images/21.jpg', category: 'ice', sizes: ['R', 'L'], isOnSale: true, description: 'ルイボスティーは南アフリカ原産のハーブを使用したお茶で、「奇跡のお茶」「不老長寿のお茶」として現地で飲まれています。鮮やかな赤色と自然な甘み、すっきりした味わいでカフェインが気になる方におすすめのドリンクです。' },
    { name: 'みかんジュース', image: '/images/22.jpg', category: 'ice', sizes: ['R', 'L'], isOnSale: true, description: '国産（和歌山県産、静岡県産）の手摘みされた温州みかんを皮ごと丸絞りしたみかんジュースです。さっぱりとした甘みが特長です。' },
    { name: 'リンゴジュース', image: '/images/23.jpg', category: 'ice', sizes: ['R', 'L'], isOnSale: true, description: 'りんご果汁本来のまろやかな甘味とスッキリとしたのどごし、爽やかな酸味が特長です。' },
    { name: 'アイスミルク', image: '/images/24.jpg', category: 'ice', sizes: ['R', 'L'], isOnSale: true, description: 'データがありません。' },
    { name: 'アイス豆乳', image: '/images/25.jpg', category: 'ice', sizes: ['R', 'L'], isOnSale: true, description: 'データがありません。' },
    { name: 'アイスココア', image: '/images/26.jpg', category: 'ice', sizes: ['R', 'L'], isOnSale: true, description: '口当たりまろやかなココアです。' },
    { name: 'アイス沖縄黒糖ラテ', image: '/images/27.jpg', category: 'ice', sizes: ['R', 'L'], isOnSale: true, description: '黒糖の深い味わいとまろやかさが広がる、風味豊かなラテです。' },
    { name: 'アイス豆乳ラテ', image: '/images/28.jpg', category: 'ice', sizes: ['R', 'L'], isOnSale: true, description: '豆乳でつくったアイスカフェラテです。' },
    { name: 'アイスハニーカフェ・オレ', image: '/images/29.jpg', category: 'ice', sizes: ['R', 'L'], isOnSale: true, description: '最後までハチミツの風味が広がります。' },
    { name: 'アイス宇治抹茶ラテ', image: '/images/30.jpg', category: 'ice', sizes: ['R', 'L'], isOnSale: true, description: '宇治抹茶とミルクがマッチした絶妙な味わいです。' },
    { name: 'アイス宇治抹茶豆乳ラテ', image: '/images/31.jpg', category: 'ice', sizes: ['R', 'L'], isOnSale: true, description: '定番人気の宇治抹茶ラテを豆乳で仕立てました。' },
    { name: 'アイスカフェ・ラテ', image: '/images/32.jpg', category: 'ice', sizes: ['R', 'L'], isOnSale: true, description: 'コーヒーと冷たいミルクのバランスを追求した、人気の定番ドリンクです。' },
    { name: 'プレミアムアイスカフェ・ラテ', image: '/images/33.jpg', category: 'ice', sizes: ['R'], isOnSale: true, description: 'データがありません。' },
    { name: 'アイスロイヤルミルクティー', image: '/images/34.jpg', category: 'ice', sizes: ['R', 'L'], isOnSale: true, description: 'ミルク感を持たせながらも紅茶の香りとコクがしっかりと感じられます。' },
    { name: 'アイス豆乳ティー', image: '/images/35.jpg', category: 'ice', sizes: ['R', 'L'], isOnSale: true, description: '豆乳でつくったロイヤルミルクティーです。' },
    { name: 'アイスカフェ・モカ', image: '/images/36.jpg', category: 'ice', sizes: ['R', 'L'], isOnSale: true, description: 'オリジナルのココアにエスプレッソを加えホイップとカプチーノパウダーをトッピング。こだわりのコーヒーとココアを絶妙にマッチさせた、ほどよい甘さが特長です。' },
    { name: 'タピオカ黒糖ミルク', image: '/images/37.jpg', category: 'ice', sizes: ['R'], isOnSale: true, description: '沖縄県西表島産の黒糖のソースとミルクを合わせたベースに、もちもち食感のタピオカを合わせたデザートドリンクです。どこか懐かしいやさしい味わいの中にタピオカの食感が楽しめます' },
    { name: 'タピオカロイヤルミルクティー', image: '/images/38.jpg', category: 'ice', sizes: ['R'], isOnSale: true, description: 'ロイヤルミルクティーにもちもち食感のタピオカを合わせたデザートドリンクです。' },
    { name: 'レモンスカッシュ', image: '/images/39.jpg', category: 'ice', sizes: ['R'], isLimited: true, isOnSale: true, description: 'ジンジャエールに、レモンスライスとはちみつ入りのレモンソースを合わせました。ジンジャエールの辛口で爽やかな刺激に、レモンソースのやさしい酸味とほんのりとしたはちみつの風味が合わさった、夏の暑さを吹き飛ばすのにぴったりのドリンクです。' },
    { name: 'グリーンレモティーハニー', image: '/images/40.jpg', category: 'ice', sizes: ['R'], isLimited: true, isOnSale: true, description: '緑茶に、レモンスライスとはちみつ入りのレモンソースを合わせました。緑茶のすっきりとした味わいに、レモンソースのやさしい酸味とほんのりとしたはちみつの風味が広がります。' },
    { name: 'レモンヨーグルン', image: '/images/41.jpg', category: 'ice', sizes: ['R', 'L'], isLimited: true, isOnSale: true, description: 'ヨーグルト風味のフローズンに、瀬戸内産のレモン果汁とピールが入ったレモンソースを合わせました。食感も楽しめる爽やかな味わいのドリンクです。' },
    { name: 'マスカットヨーグルン', image: '/images/42.jpg', category: 'ice', sizes: ['R', 'L'], isLimited: true, isOnSale: true, description: 'ヨーグルト風味のフローズンに、長野県産シャインマスカットとアロエの葉肉を使用したソースを合わせた、今年で4年目となるマスカットの爽やかな香りが楽しめるフローズンドリンクです。' },

    { name: 'ミラノサンドA', image: '/images/43.jpg', category: 'food', sizes: [], isOnSale: true, description: 'さっぱりとした優しい味わいの生ハムロースはそのままで、しっかりとした味わいのボンレスハムと、粗挽きブラックペッパーの効いたボローニャソーセージは肉の配合を見直し、マヨソースを調整することで、肉の旨味をより感じられるよう仕上げました。' },
    { name: 'チーズ in ミラノサンドA', image: '/images/44.jpg', category: 'food', sizes: [], isOnSale: true, description: 'さっぱりとした優しい味わいの生ハムロースはそのままで、しっかりとした味わいのボンレスハムと、粗挽きブラックペッパーの効いたボローニャソーセージは肉の配合を見直し、マヨソースを調整することで、肉の旨味をより感じられるよう仕上げました。コクのあるチェダーチーズと絶妙にマッチ！' },
    { name: 'ミラノサンドB', image: '/images/45.jpg', category: 'food', sizes: [], isOnSale: true, description: '王道の組み合わせであるサーモンとクリームチーズを合わせたフィリングとエビ・アボカドのトッピングはそのままに、卵の風味とコク、玉ねぎのシャキシャキした食感を活かしたタルタルソースを合わせました。シーフードサラダ感覚で食べられる仕立てになっています' },
    { name: '牛カルビ', image: '/images/46.jpg', category: 'food', sizes: [], isLimited: true, isOnSale: true, description: '牛カルビに甘辛いタレを合わせ、ブラックペッパーでアクセントをつけた、食欲をそそる期間限定のミラノサンドです。口の中でじゅわっと広がる牛カルビの旨みとブラックペッパーの香りをお楽しみください。' },
    { name: '牛カルビ 濃厚チーズソース', image: '/images/47.jpg', category: 'food', sizes: [], isLimited: true, isOnSale: true, description: '期間限定ミラノサンド 牛カルビ にラクレット風チーズソースをトッピングしました。しっかりとした味わいの牛カルビにまろやかなチーズソースがよく合います。アクセントにかけたブラックペッパーの香りもあわせてお楽しみください。' },
    { name: '牛カルビ ねぎ塩レモン', image: '/images/48.jpg', category: 'food', sizes: [], isLimited: true, isOnSale: true, description: '期間限定ミラノサンド 牛カルビ にねぎ塩とレモンをトッピングしました。しっかりとした味わいの牛カルビサンドに、具沢山なねぎ塩ソースとさっぱりとしたレモンがよく合う、食欲をそそる香りが楽しめるミラノサンドです。' },
    { name: '牛カルビ ハラペーニョ', image: '/images/49.jpg', category: 'food', sizes: [], isLimited: true, isOnSale: true, description: '期間限定ミラノサンド 牛カルビ にハラペーニョの酢漬けをトッピングしました。しっかりとした味わいの牛カルビサンドに酸味と辛味があるハラペーニョを組み合わせ、複雑なうま味を楽しめる仕立てにしました。' },
    { name: 'トースト', image: '/images/50.jpg', category: 'food', sizes: [], isOnSale: true, description: '外はさっくり、中はふんわり食感の厚切りトーストです。コーヒーと相性がよく、朝食メニューにぴったりです' },
    { name: 'チーズトースト', image: '/images/51.jpg', category: 'food', sizes: [], isOnSale: true, description: '外はさっくり、中はふんわり食感の厚切りトーストにチーズをのせました。' },
    { name: 'ツナチェダーチーズ', image: '/images/52.jpg', category: 'food', sizes: [], isOnSale: true, description: 'ツナサラダに、とろ～り熱々のチェダーチーズが絶妙にマッチした、寒い季節にぴったりのホットサンドです' },
    { name: 'カルツォーネ', image: '/images/53.jpg', category: 'food', sizes: [], isLimited: true, isOnSale: true, description: 'アサリ、イカ、イタヤ貝の具材と、トマトペースト、チーズをもちもち生地で包みました。魚介の旨みが詰まった、トマト仕立てのカルツォーネです。' },
    { name: 'ジャーマンドック', image: '/images/54.jpg', category: 'food', sizes: [], isOnSale: true, description: 'ドトールコーヒーショップのベストセラー商品。どこを切ってもオリジナル。パン・ソーセージ・マスタードの素材にとことんこだわった、自信作です。' },
    { name: 'レタスドッグ', image: '/images/55.jpg', category: 'food', sizes: [], isOnSale: true, description: 'シャキシャキレタスのサラダなドック。オリジナルソースが◎' },
    { name: '全粒粉サンド', image: '/images/56.jpg', category: 'food', sizes: [], isOnSale: true, description: '肉の食感に近づけるよう改良した「大豆のミート」にスライストマト、豆と野菜をトマトで煮込んだ具材感あるソースをトッピング。ピリ辛豆乳ソースでピリッと且つマイルドに仕上げています。' },
    { name: 'フレンチトースト ハニーメープル', image: '/images/57.jpg', category: 'food', sizes: [], isOnSale: true, description: 'データがありません。' },
    { name: 'フレンチトースト チョコバナナ', image: '/images/58.jpg', category: 'food', sizes: [], isOnSale: true, description: 'データがありません。' },
];