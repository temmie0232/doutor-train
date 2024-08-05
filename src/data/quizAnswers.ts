import { Product } from '@/data/products';

interface QuizAnswerItem {
    item: string;
    sizeDependent?: {
        R: string | QuizAnswerItem;
        L: string | QuizAnswerItem | null;
    };
    quantity?: number;
    attributes?: {
        [key: string]: string | number;
    };
}

interface QuizAnswer {
    [key: string]: QuizAnswerItem[];
}

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
            quantity: 1
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
            quantity: 1
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
                R: { item: "エスプレッソ", attributes: { "サイズ": "M" } },
                L: { item: "エスプレッソ", attributes: { "サイズ": "L" } }
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
                R: { item: "エスプレッソ", attributes: { "サイズ": "M" } },
                L: { item: "エスプレッソ", attributes: { "サイズ": "L" } }
            }
        },
        {
            item: "ホイップクリーム",
            quantity: 1
        },
        { item: "カプチーノパウダー" }
    ],
    "エスプレッソコーヒー": [
        {
            item: "エスプレッソ",
            attributes: {
                "サイズ": "L"
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
            quantity: 1
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
            quantity: 1
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
                R: { item: "エスプレッソ", attributes: { "サイズ": "M" } },
                L: { item: "エスプレッソ", attributes: { "サイズ": "L" } }
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
            quantity: 1
        },
        {
            item: "エスプレッソ",
            sizeDependent: {
                R: { item: "エスプレッソ", attributes: { "サイズ": "M" } },
                L: { item: "エスプレッソ", attributes: { "サイズ": "L" } }
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

export function getQuizAnswerByProduct(product: Product): string[] {
    const answer = quizAnswers[product.name];
    if (!answer) return [];

    return answer.flatMap(item => {
        if (item.sizeDependent) {
            const rSize = product.sizes.includes('R') ? item.sizeDependent.R : null;
            const lSize = product.sizes.includes('L') && item.sizeDependent.L ? item.sizeDependent.L : null;
            return [rSize, lSize].filter(Boolean) as string[];
        }
        if (item.attributes) {
            return `${item.item} (${Object.entries(item.attributes).map(([key, value]) => `${key}: ${value}`).join(', ')})`;
        }
        if (item.quantity) {
            return `${item.item} x${item.quantity}`;
        }
        return item.item;
    });
}