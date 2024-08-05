import { Product } from '@/data/products';

export interface QuizAnswerItem {
    item: string;
    attributes?: { [key: string]: string };
    sizeDependent?: { [size: string]: string | null };
    quantity?: number | { [size: string]: number };
}

export type QuizAnswer = { [productName: string]: QuizAnswerItem[] };

export const quizAnswers: QuizAnswer = {
    "ブレンドコーヒー": [
        {
            item: "カップ",
            sizeDependent: {
                R: "アメリカンカップ",
                L: "Lホットカップ"
            }
        },
        { item: "ブレンドコーヒー" }
    ],
    "アメリカンコーヒー": [
        {
            item: "カップ",
            sizeDependent: {
                R: "Mホットカップ",
                L: "Lホットカップ"
            }
        },
        { item: "ブレンドコーヒー" },
        { item: "熱湯" }
    ],
    "ティー": [
        {
            item: "カップ",
            sizeDependent: {
                R: "Mホットカップ",
                L: null
            }
        },
        { item: "ホットティー用ティーバッグ" },
        { item: "熱湯" }
    ],
    "ルイボスティー": [
        {
            item: "カップ",
            sizeDependent: {
                R: "Mホットカップ",
                L: "Lホットカップ"
            }
        },
        { item: "ホットティー用ティーバッグ" },
        { item: "熱湯" }
    ],
    "ロイヤルミルクティー": [
        {
            item: "ジェットスチーマー",
            attributes: {
                "泡立て": "なし"
            }
        },
        {
            item: "カップ",
            sizeDependent: {
                R: "Mホットカップ",
                L: "Lホットカップ"
            }
        },
        { item: "ホットティー用ティーバッグ" },
        { item: "熱湯" },
        { item: "牛乳" }
    ],
    "豆乳ティー": [
        {
            item: "ジェットスチーマー",
            attributes: {
                "泡立て": "なし"
            }
        },
        {
            item: "カップ",
            sizeDependent: {
                R: "Mホットカップ",
                L: "Lホットカップ"
            }
        },
        { item: "ホットティー用ティーバッグ" },
        { item: "熱湯" },
        { item: "豆乳" }
    ],
    "ホットミルク": [
        {
            item: "ジェットスチーマー",
            attributes: {
                "泡立て": "なし"
            }
        },
        {
            item: "カップ",
            sizeDependent: {
                R: "Mホットカップ",
                L: "Lホットカップ"
            }
        },
        { item: "牛乳" }
    ],
    "ホット豆乳": [
        {
            item: "ジェットスチーマー",
            attributes: {
                "泡立て": "なし"
            }
        },
        {
            item: "カップ",
            sizeDependent: {
                R: "Mホットカップ",
                L: "Lホットカップ"
            }
        },
        { item: "豆乳" }
    ],
    "ココア": [
        {
            item: "ジェットスチーマー",
            attributes: {
                "泡立て": "なし"
            }
        },
        {
            item: "カップ",
            sizeDependent: {
                R: "Mホットカップ",
                L: "Lホットカップ"
            }
        },
        { item: "ココア" },
        {
            item: "ホイップクリーム",
            quantity: {
                R: 1,
                L: 2
            }
        }
    ],
    "沖縄黒糖ラテ": [
        {
            item: "ジェットスチーマー",
            attributes: {
                "泡立て": "なし"
            }
        },
        {
            item: "カップ",
            sizeDependent: {
                R: "Mホットカップ",
                L: "Lホットカップ"
            }
        },
        { item: "黒糖ベース" },
        {
            item: "ホイップクリーム",
            quantity: {
                R: 1,
                L: 2
            }
        },
        { item: "黒糖ソース" }
    ],
    "ハニーカフェ・オレ": [
        {
            item: "ジェットスチーマー",
            attributes: {
                "泡立て": "なし"
            }
        },
        {
            item: "カップ",
            sizeDependent: {
                R: "Mホットカップ",
                L: "Lホットカップ"
            }
        },
        { item: "ハニーベース" },
        {
            item: "エスプレッソ",
            attributes: {
                "サイズ": "S"
            }
        }
    ],
    "宇治抹茶ラテ": [
        {
            item: "ジェットスチーマー",
            attributes: {
                "泡立て": "あり"
            }
        },
        {
            item: "カップ",
            sizeDependent: {
                R: "Mホットカップ",
                L: "Lホットカップ"
            }
        },
        { item: "抹茶ベース" },
        { item: "牛乳" },
        { item: "抹茶パウダー" }
    ],
    "宇治抹茶豆乳ラテ": [
        {
            item: "ジェットスチーマー",
            attributes: {
                "泡立て": "あり"
            }
        },
        {
            item: "カップ",
            sizeDependent: {
                R: "Mホットカップ",
                L: "Lホットカップ"
            }
        },
        { item: "抹茶ベース" },
        { item: "豆乳" },
        { item: "抹茶パウダー" }
    ],
    "豆乳ラテ": [
        {
            item: "ジェットスチーマー",
            attributes: {
                "泡立て": "あり"
            }
        },
        {
            item: "カップ",
            sizeDependent: {
                R: "Mホットカップ",
                L: "Lホットカップ"
            }
        },
        { item: "豆乳" },
        {
            item: "エスプレッソ",
            sizeDependent: {
                R: "M",
                L: "L"
            }
        }
    ],
    "カフェモカ": [
        {
            item: "ジェットスチーマー",
            attributes: {
                "泡立て": "なし"
            }
        },
        {
            item: "カップ",
            sizeDependent: {
                R: "Mホットカップ",
                L: "Lホットカップ"
            }
        },
        { item: "ココア" },
        {
            item: "エスプレッソ",
            sizeDependent: {
                R: "M",
                L: "L"
            }
        },
        {
            item: "ホイップクリーム",
            quantity: {
                R: 2,
                L: 3
            }
        },
        { item: "カプチーノパウダー" }
    ],
    "エスプレッソコーヒー": [
        {
            item: "エスプレッソ",
            sizeDependent: {
                R: "L",
            }
        }
    ],
    "カフェ・ラテ": [
        {
            item: "カップ",
            sizeDependent: {
                R: "Mホットカップ",
                L: "Lホットカップ"
            }
        }
    ],
    "本日のコーヒー": [
        { item: "アメリカンカップ" }
    ],
    "アイスコーヒー": [
        {
            item: "カップ",
            sizeDependent: {
                R: "Mアイスカップ",
                L: "Lアイスカップ"
            }
        },
        { item: "氷" },
        { item: "アイスコーヒー" }
    ],
    "アイスティー": [
        {
            item: "カップ",
            sizeDependent: {
                R: "Mアイスカップ",
                L: "Lアイスカップ"
            }
        },
        { item: "氷" },
        { item: "アイスティー" }
    ],
    "アイスルイボスティー": [
        {
            item: "カップ",
            sizeDependent: {
                R: "Mアイスカップ",
                L: "Lアイスカップ"
            }
        },
        { item: "氷" },
        { item: "アイスルイボスティー" }
    ],
    "みかんジュース": [
        {
            item: "カップ",
            sizeDependent: {
                R: "Mアイスカップ",
                L: "Lアイスカップ"
            }
        },
        { item: "氷" },
        { item: "みかんジュース" }
    ],
    "リンゴジュース": [
        {
            item: "カップ",
            sizeDependent: {
                R: "Mアイスカップ",
                L: "Lアイスカップ"
            }
        },
        { item: "氷" },
        { item: "リンゴジュース" }
    ],
    "アイスココア": [
        {
            item: "カップ",
            sizeDependent: {
                R: "Mアイスカップ",
                L: "Lアイスカップ"
            }
        },
        { item: "氷" },
        { item: "ココアベース" },
        {
            item: "ホイップクリーム",
            quantity: {
                R: 1,
                L: 2
            }
        }
    ],
    "アイス沖縄黒糖ラテ": [
        {
            item: "カップ",
            sizeDependent: {
                R: "Mアイスカップ",
                L: "Lアイスカップ"
            }
        },
        { item: "氷" },
        { item: "黒糖ベース" },
        {
            item: "ホイップクリーム",
            quantity: {
                R: 1,
                L: 2
            }
        },
        { item: "黒糖ソース" }
    ],
    "アイス豆乳ラテ": [
        {
            item: "カップ",
            sizeDependent: {
                R: "Mアイスカップ",
                L: "Lアイスカップ"
            }
        },
        { item: "氷" },
        { item: "豆乳" },
        { item: "アイスコーヒー" }
    ],
    "アイスハニーカフェ・オレ": [
        {
            item: "カップ",
            sizeDependent: {
                R: "Mアイスカップ",
                L: "Lアイスカップ"
            }
        },
        { item: "氷" },
        { item: "ハニーベース" },
        { item: "アイスコーヒー" }
    ],
    "アイス宇治抹茶ラテ": [
        {
            item: "カップ",
            sizeDependent: {
                R: "Mアイスカップ",
                L: "Lアイスカップ"
            }
        },
        { item: "氷" },
        { item: "牛乳" },
        { item: "抹茶ベース" },
        { item: "抹茶パウダー" }
    ],
    "アイス宇治抹茶豆乳ラテ": [
        {
            item: "カップ",
            sizeDependent: {
                R: "Mアイスカップ",
                L: "Lアイスカップ"
            }
        },
        { item: "氷" },
        { item: "豆乳" },
        { item: "抹茶ベース" },
        { item: "抹茶パウダー" }
    ],
    "アイスカフェ・ラテ": [
        {
            item: "カップ",
            sizeDependent: {
                R: "Mアイスカップ",
                L: "Lアイスカップ"
            }
        },
        { item: "氷" },
        { item: "牛乳" },
        {
            item: "エスプレッソ",
            sizeDependent: {
                R: "M",
                L: "L"
            }
        }
    ],
    "プレミアムアイスカフェ・ラテ": [
        {
            item: "カップ",
            sizeDependent: {
                R: "Mアイスカップ",
                L: null
            }
        },
        { item: "氷" }
    ],
    "アイスロイヤルミルクティー": [
        {
            item: "カップ",
            sizeDependent: {
                R: "Mアイスカップ",
                L: "Lアイスカップ"
            }
        },
        { item: "氷" },
        { item: "牛乳" },
        { item: "アイスロイヤルミルクティー用ベース" }
    ],
    "アイス豆乳ティー": [
        {
            item: "カップ",
            sizeDependent: {
                R: "Mアイスカップ",
                L: "Lアイスカップ"
            }
        },
        { item: "氷" },
        { item: "豆乳" },
        { item: "アイスロイヤルミルクティー用ベース" }
    ],
    "アイスカフェ・モカ": [
        {
            item: "カップ",
            sizeDependent: {
                R: "Mアイスカップ",
                L: "Lアイスカップ"
            }
        },
        { item: "氷" },
        { item: "ココアベース" },
        {
            item: "ホイップクリーム",
            quantity: {
                R: 2,
                L: 3
            }
        },
        {
            item: "エスプレッソ",
            sizeDependent: {
                R: "M",
                L: "L"
            }
        },
        { item: "カプチーノパウダー" }
    ],
    "タピオカ黒糖ミルク": [
        {
            item: "カップ",
            sizeDependent: {
                R: "Mアイスカップ",
                L: null
            }
        },
        { item: "氷" },
        { item: "タピオカ" },
        { item: "黒糖ソース" },
        { item: "牛乳" }
    ],
    "タピオカロイヤルミルクティー": [
        {
            item: "カップ",
            sizeDependent: {
                R: "Mアイスカップ",
                L: null
            }
        },
        { item: "氷" },
        { item: "タピオカ" },
        { item: "牛乳" },
        { item: "アイスロイヤルミルクティー用ベース" }
    ],
    "レモンスカッシュ": [
        {
            item: "カップ",
            sizeDependent: {
                R: "Mアイスカップ",
                L: null
            }
        },
        { item: "氷" },
        { item: "レモン（袋入り）" },
        { item: "ジンジャーエール" }
    ],
    "グリーンレモティーハニー": [
        {
            item: "カップ",
            sizeDependent: {
                R: "Mアイスカップ",
                L: null
            }
        },
        { item: "氷" },
        { item: "レモン（袋入り）" },
        { item: "緑茶ベース" }
    ]
};

export function getQuizAnswerByProduct(product: Product): QuizAnswerItem[] {
    const answer = quizAnswers[product.name];
    if (!answer) return [];

    return answer.map(item => {
        if (item.sizeDependent) {
            const sizeDependent: { [size: string]: string | null } = {};
            product.sizes.forEach(size => {
                sizeDependent[size] = item.sizeDependent?.[size] || null;
            });
            return { ...item, sizeDependent };
        }
        if (item.quantity && typeof item.quantity === 'object') {
            const quantity: { [size: string]: number } = {};
            product.sizes.forEach(size => {
                quantity[size] = (item.quantity as { [size: string]: number })[size] || 0;
            });
            return { ...item, quantity };
        }
        return item;
    });
}