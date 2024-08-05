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
            attributes: { type: "hot" },
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
            attributes: { type: "hot" },
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
            attributes: { type: "hot" },
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
            attributes: { type: "hot" },
            sizeDependent: {
                R: "Mホットカップ",
                L: "Lホットカップ"
            }
        },
        { item: "ルイボスティー用ティーバッグ" },
        { item: "熱湯" }
    ],
    "ロイヤルミルクティー": [
        {
            item: "カップ",
            attributes: { type: "hot" },
            sizeDependent: {
                R: "Mホットカップ",
                L: "Lホットカップ"
            }
        },
        { item: "ミルクティー用ティーバッグ" },
        { item: "熱湯" },
        { item: "牛乳" },
        {
            item: "ジェットスチーマー",
            attributes: { "泡立て": "なし" }
        }
    ],
    "豆乳ティー": [
        {
            item: "カップ",
            attributes: { type: "hot" },
            sizeDependent: {
                R: "Mホットカップ",
                L: "Lホットカップ"
            }
        },
        { item: "ミルクティー用ティーバッグ" },
        { item: "熱湯" },
        { item: "豆乳" },
        {
            item: "ジェットスチーマー",
            attributes: { "泡立て": "なし" }
        }
    ],
    "ホットミルク": [
        {
            item: "カップ",
            attributes: { type: "hot" },
            sizeDependent: {
                R: "Mホットカップ",
                L: "Lホットカップ"
            }
        },
        { item: "牛乳" },
        {
            item: "ジェットスチーマー",
            attributes: { "泡立て": "なし" }
        }
    ],
    "ホット豆乳": [
        {
            item: "カップ",
            attributes: { type: "hot" },
            sizeDependent: {
                R: "Mホットカップ",
                L: "Lホットカップ"
            }
        },
        { item: "豆乳" },
        {
            item: "ジェットスチーマー",
            attributes: { "泡立て": "なし" }
        }
    ],
    "ココア": [
        {
            item: "カップ",
            attributes: { type: "hot" },
            sizeDependent: {
                R: "Mホットカップ",
                L: "Lホットカップ"
            }
        },
        { item: "ココアベース" },
        {
            item: "ホイップクリーム",
            quantity: {
                R: 1,
                L: 2
            }
        },
        {
            item: "ジェットスチーマー",
            attributes: { "泡立て": "なし" }
        }
    ],
    "沖縄黒糖ラテ": [
        {
            item: "カップ",
            attributes: { type: "hot" },
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
        { item: "黒糖ソース" },
        {
            item: "ジェットスチーマー",
            attributes: { "泡立て": "なし" }
        }
    ],
    "ハニーカフェ・オレ": [
        {
            item: "カップ",
            attributes: { type: "hot" },
            sizeDependent: {
                R: "Mホットカップ",
                L: "Lホットカップ"
            }
        },
        { item: "ハニーベース" },
        {
            item: "エスプレッソ",
            attributes: { "サイズ": "S" }
        },
        {
            item: "ジェットスチーマー",
            attributes: { "泡立て": "なし" }
        }
    ],
    "宇治抹茶ラテ": [
        {
            item: "カップ",
            attributes: { type: "hot" },
            sizeDependent: {
                R: "Mホットカップ",
                L: "Lホットカップ"
            }
        },
        { item: "抹茶ベース" },
        { item: "牛乳" },
        { item: "抹茶パウダー" },
        {
            item: "ジェットスチーマー",
            attributes: { "泡立て": "あり" }
        }
    ],
    "宇治抹茶豆乳ラテ": [
        {
            item: "カップ",
            attributes: { type: "hot" },
            sizeDependent: {
                R: "Mホットカップ",
                L: "Lホットカップ"
            }
        },
        { item: "抹茶ベース" },
        { item: "豆乳" },
        { item: "抹茶パウダー" },
        {
            item: "ジェットスチーマー",
            attributes: { "泡立て": "あり" }
        }
    ],
    "豆乳ラテ": [
        {
            item: "カップ",
            attributes: { type: "hot" },
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
        },
        {
            item: "ジェットスチーマー",
            attributes: { "泡立て": "あり" }
        }
    ],
    "カフェモカ": [
        {
            item: "カップ",
            attributes: { type: "hot" },
            sizeDependent: {
                R: "Mホットカップ",
                L: "Lホットカップ"
            }
        },
        { item: "ココアベース" },
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
        { item: "カプチーノパウダー" },
        {
            item: "ジェットスチーマー",
            attributes: { "泡立て": "なし" }
        }
    ],
    "エスプレッソコーヒー": [
        {
            item: "カップ",
            attributes: { type: "hot" },
            sizeDependent: {
                R: "デミタスカップ",
            }
        },
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
            attributes: { type: "hot" },
            sizeDependent: {
                R: "Mホットカップ",
                L: "Lホットカップ"
            }
        },
        { item: "カフェラテ" }
    ],
    "本日のコーヒー": [
        {
            item: "カップ",
            attributes: { type: "hot" },
            sizeDependent: {
                R: "アメリカンカップ",
            }
        },
        { item: "本日のコーヒー" }
    ],
    "アイスコーヒー": [
        {
            item: "カップ",
            attributes: { type: "ice" }
        },
        { item: "氷" },
        { item: "アイスコーヒー" }
    ],
    "アイスティー": [
        {
            item: "カップ",
            attributes: { type: "ice" }
        },
        { item: "氷" },
        { item: "アイスティー" }
    ],
    "アイスルイボスティー": [
        {
            item: "カップ",
            attributes: { type: "ice" }
        },
        { item: "氷" },
        { item: "アイスルイボスティー" }
    ],
    "アイスココア": [
        {
            item: "カップ",
            attributes: { type: "ice" }
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
            attributes: { type: "ice" }
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
            attributes: { type: "ice" }
        },
        { item: "氷" },
        { item: "豆乳" },
        { item: "アイスコーヒー" }
    ],
    "アイスハニーカフェ・オレ": [
        {
            item: "カップ",
            attributes: { type: "ice" }
        },
        { item: "氷" },
        { item: "ハニーベース" },
        { item: "アイスコーヒー" }
    ],
    "アイス宇治抹茶ラテ": [
        {
            item: "カップ",
            attributes: { type: "ice" }
        },
        { item: "氷" },
        { item: "牛乳" },
        { item: "抹茶ベース" },
        { item: "抹茶パウダー" }
    ],
    "アイス宇治抹茶豆乳ラテ": [
        {
            item: "カップ",
            attributes: { type: "ice" }
        },
        { item: "氷" },
        { item: "豆乳" },
        { item: "抹茶ベース" },
        { item: "抹茶パウダー" }
    ],
    "アイスカフェ・ラテ": [
        {
            item: "カップ",
            attributes: { type: "ice" }
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
            attributes: { type: "ice" }
        },
        { item: "氷" },
        { item: "プレミアムアイスラテ" }
    ],
    "アイスロイヤルミルクティー": [
        {
            item: "カップ",
            attributes: { type: "ice" }
        },
        { item: "氷" },
        { item: "牛乳" },
        { item: "アイスロイヤルミルクティー用ベース" }
    ],
    "アイス豆乳ティー": [
        {
            item: "カップ",
            attributes: { type: "ice" }
        },
        { item: "氷" },
        { item: "豆乳" },
        { item: "アイスロイヤルミルクティー用ベース" }
    ],
    "アイスカフェ・モカ": [
        {
            item: "カップ",
            attributes: { type: "ice" }
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
                R: "M", L: "L"
            }
        },
        { item: "カプチーノパウダー" }
    ],
    "タピオカ黒糖ミルク": [
        {
            item: "カップ",
            attributes: { type: "ice" }
        },
        { item: "氷" },
        { item: "タピオカ" },
        { item: "黒糖ソース" },
        { item: "牛乳" }
    ],
    "タピオカロイヤルミルクティー": [
        {
            item: "カップ",
            attributes: { type: "ice" }
        },
        { item: "氷" },
        { item: "タピオカ" },
        { item: "牛乳" },
        { item: "アイスロイヤルミルクティー用ベース" }
    ],
    "レモンスカッシュ": [
        {
            item: "カップ",
            attributes: { type: "ice" }
        },
        { item: "氷" },
        { item: "レモン（袋入り）" },
        { item: "ジンジャーエール" }
    ],
    "グリーンレモティーハニー": [
        {
            item: "カップ",
            attributes: { type: "ice" }
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
        if (item.item === "カップ") {
            if (item.attributes?.type === "hot" && item.sizeDependent) {
                const sizeDependent: { [size: string]: string | null } = {};
                product.sizes.forEach(size => {
                    sizeDependent[size] = item.sizeDependent?.[size] || null;
                });
                return { ...item, sizeDependent };
            }
            return item;
        }
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