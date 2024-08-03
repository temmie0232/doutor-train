// data/products.ts

export interface Product {
    name: string;
    image: string;
    category: 'ice' | 'hot' | 'food';
    sizes: string[];
    isLimited?: boolean;
    isOnSale: boolean;
}

export const products: Product[] = [
    { name: 'ブレンドコーヒー', image: '/images/1.jpg', category: 'hot', sizes: ['R', 'L'], isOnSale: true },
    { name: 'アメリカンコーヒー', image: '/images/2.jpg', category: 'hot', sizes: ['ONE'], isOnSale: true },
    { name: 'ティー', image: '/images/3.jpg', category: 'hot', sizes: ['ONE'], isOnSale: true },
    { name: 'ルイボスティー', image: '/images/4.jpg', category: 'hot', sizes: ['ONE'], isOnSale: true },
    { name: 'ロイヤルミルクティー', image: '/images/5.jpg', category: 'hot', sizes: ['ONE'], isOnSale: true },
    { name: '豆乳ティー', image: '/images/6.jpg', category: 'hot', sizes: ['R', 'L'], isOnSale: true },
    { name: 'ホットミルク', image: '/images/7.jpg', category: 'hot', sizes: ['R', 'L'], isOnSale: true },
    { name: 'ホット豆乳', image: '/images/8.jpg', category: 'hot', sizes: ['R', 'L'], isOnSale: true },
    { name: 'ココア', image: '/images/9.jpg', category: 'hot', sizes: ['R', 'L'], isOnSale: true },
    { name: '沖縄黒糖ラテ', image: '/images/10.jpg', category: 'hot', sizes: ['R', 'L'], isOnSale: true },
    { name: 'ハニーカフェ・オレ', image: '/images/11.jpg', category: 'hot', sizes: ['R', 'L'], isOnSale: true },
    { name: '宇治抹茶ラテ', image: '/images/12.jpg', category: 'hot', sizes: ['R', 'L'], isOnSale: true },
    { name: '宇治抹茶豆乳ラテ', image: '/images/13.jpg', category: 'hot', sizes: ['R', 'L'], isOnSale: true },
    { name: '豆乳ラテ', image: '/images/14.jpg', category: 'hot', sizes: ['R', 'L'], isOnSale: true },
    { name: 'カフェモカ', image: '/images/15.jpg', category: 'hot', sizes: ['R', 'L'], isOnSale: true },
    { name: 'エスプレッソコーヒー', image: '/images/16.jpg', category: 'hot', sizes: ['ONE'], isOnSale: true },
    { name: 'カフェ・ラテ', image: '/images/17.jpg', category: 'hot', sizes: ['R', 'L'], isOnSale: true },
    { name: '本日のコーヒー', image: '/images/18.jpg', category: 'hot', sizes: ['ONE'], isOnSale: true },

    { name: 'アイスコーヒー', image: '/images/19.jpg', category: 'ice', sizes: ['R', 'L'], isOnSale: true },
    { name: 'アイスティー', image: '/images/20.jpg', category: 'ice', sizes: ['R', 'L'], isOnSale: true },
    { name: 'アイスルイボスティー', image: '/images/21.jpg', category: 'ice', sizes: ['R', 'L'], isOnSale: true },
    { name: 'みかんジュース', image: '/images/22.jpg', category: 'ice', sizes: ['R', 'L'], isOnSale: true },
    { name: 'リンゴジュース', image: '/images/23.jpg', category: 'ice', sizes: ['R', 'L'], isOnSale: true },
    { name: 'アイスミルク', image: '/images/24.jpg', category: 'ice', sizes: ['R', 'L'], isOnSale: true },
    { name: 'アイス豆乳', image: '/images/25.jpg', category: 'ice', sizes: ['R', 'L'], isOnSale: true },
    { name: 'アイスココア', image: '/images/26.jpg', category: 'ice', sizes: ['R', 'L'], isOnSale: true },
    { name: 'アイス沖縄黒糖ラテ', image: '/images/27.jpg', category: 'ice', sizes: ['R', 'L'], isOnSale: true },
    { name: 'アイス豆乳ラテ', image: '/images/28.jpg', category: 'ice', sizes: ['R', 'L'], isOnSale: true },
    { name: 'アイスハニーカフェ・オレ', image: '/images/29.jpg', category: 'ice', sizes: ['R', 'L'], isOnSale: true },
    { name: 'アイス宇治抹茶ラテ', image: '/images/30.jpg', category: 'ice', sizes: ['R', 'L'], isOnSale: true },
    { name: 'アイス宇治抹茶豆乳ラテ', image: '/images/31.jpg', category: 'ice', sizes: ['R', 'L'], isOnSale: true },
    { name: 'アイスカフェ・ラテ', image: '/images/32.jpg', category: 'ice', sizes: ['R', 'L'], isOnSale: true },
    { name: 'プレミアムアイスカフェ・ラテ', image: '/images/33.jpg', category: 'ice', sizes: ['ONE'], isOnSale: true },
    { name: 'アイスロイヤルミルクティー', image: '/images/34.jpg', category: 'ice', sizes: ['R', 'L'], isOnSale: true },
    { name: 'アイス豆乳ティー', image: '/images/35.jpg', category: 'ice', sizes: ['R', 'L'], isOnSale: true },
    { name: 'アイスカフェ・モカ', image: '/images/36.jpg', category: 'ice', sizes: ['R', 'L'], isOnSale: true },
    { name: 'タピオカ黒糖ミルク', image: '/images/37.jpg', category: 'ice', sizes: ['ONE'], isOnSale: true },
    { name: 'タピオカロイヤルミルクティー', image: '/images/38.jpg', category: 'ice', sizes: ['ONE'], isOnSale: true },
    { name: 'レモンスカッシュ', image: '/images/39.jpg', category: 'ice', sizes: ['ONE'], isLimited: true, isOnSale: true },
    { name: 'グリーンレモティーハニー', image: '/images/40.jpg', category: 'ice', sizes: ['ONE'], isLimited: true, isOnSale: true },
    { name: 'レモンヨーグルン', image: '/images/41.jpg', category: 'ice', sizes: ['R', 'L'], isLimited: true, isOnSale: true },
    { name: 'マスカットヨーグルン', image: '/images/42.jpg', category: 'ice', sizes: ['R', 'L'], isLimited: true, isOnSale: true },

    { name: 'ミラノサンドA', image: '/images/43.jpg', category: 'food', sizes: [], isOnSale: true },
    { name: 'チーズ in ミラノサンドA', image: '/images/44.jpg', category: 'food', sizes: [], isOnSale: true },
    { name: 'ミラノサンドB', image: '/images/45.jpg', category: 'food', sizes: [], isOnSale: true },
    { name: '牛カルビ', image: '/images/46.jpg', category: 'food', sizes: [], isLimited: true, isOnSale: true },
    { name: '牛カルビ 濃厚チーズソース', image: '/images/47.jpg', category: 'food', sizes: [], isLimited: true, isOnSale: true },
    { name: '牛カルビ ねぎ塩レモン', image: '/images/48.jpg', category: 'food', sizes: [], isLimited: true, isOnSale: true },
    { name: '牛カルビ ハラペーニョ', image: '/images/49.jpg', category: 'food', sizes: [], isLimited: true, isOnSale: true },
    { name: 'トースト', image: '/images/50.jpg', category: 'food', sizes: [], isOnSale: true },
    { name: 'チーズトースト', image: '/images/51.jpg', category: 'food', sizes: [], isOnSale: true },
    { name: 'ツナチェダーチーズ', image: '/images/52.jpg', category: 'food', sizes: [], isOnSale: true },
    { name: 'カルツォーネ', image: '/images/53.jpg', category: 'food', sizes: [], isLimited: true, isOnSale: true },
    { name: 'ジャーマンドック', image: '/images/54.jpg', category: 'food', sizes: [], isOnSale: true },
    { name: 'レタスドッグ', image: '/images/55.jpg', category: 'food', sizes: [], isOnSale: true },
    { name: '全粒粉サンド', image: '/images/56.jpg', category: 'food', sizes: [], isOnSale: true },
    { name: 'フレンチトースト ハニーメープル', image: '/images/57.jpg', category: 'food', sizes: [], isOnSale: true },
    { name: 'フレンチトースト チョコバナナ', image: '/images/58.jpg', category: 'food', sizes: [], isOnSale: true },
];