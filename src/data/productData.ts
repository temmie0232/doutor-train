
export interface QuizAnswerItem {
    item: string;
    attributes?: { [key: string]: string };
    sizeDependent?: { [size: string]: string | null };
    quantity?: number | { [size: string]: number };
}

export interface Product {
    productID: number;
    name: string;
    image: string;
    category: 'ice' | 'hot' | 'food';
    sizes: string[];
    isLimited?: boolean;
    isOnSale: boolean;
    description: string;
    instructions: string[][];
    quizAnswers: QuizAnswerItem[];
}

export const productData: Product[] = [
    {
        productID: 1,
        name: 'ブレンドコーヒー',
        image: '/images/1.jpg',
        category: 'hot',
        sizes: ['R', 'L'],
        isOnSale: true,
        description: 'マイルドな口あたりが特徴で、どなたにも親しんでいただけるコーヒーです。',
        instructions: [
            ["コーヒーを一番上まで注ぐ", "!!重要!!", "R : アメリカンカップ", "L : Lサイズカップ"]
        ],
        quizAnswers: [
            {
                item: "カップ",
                attributes: { type: "hot" },
                sizeDependent: {
                    R: "アメリカンカップ",
                    L: "Lホットカップ"
                }
            },
            { item: "ブレンドコーヒー" }
        ]
    },
    {
        productID: 2,
        name: 'アメリカンコーヒー',
        image: '/images/2.jpg',
        category: 'hot',
        sizes: ['R'],
        isOnSale: true,
        description: '苦味が少なく、すっきりとした味わいのコーヒーです。',
        instructions: [
            ["コーヒーを真ん中の線まで注ぐ"],
            ["お湯を一番上の線まで注ぐ"]
        ],
        quizAnswers: [
            {
                item: "カップ",
                attributes: { type: "hot" },
                sizeDependent: {
                    R: "Mホットカップ",
                    L: null
                }
            },
            { item: "ブレンドコーヒー" },
            { item: "熱湯" }
        ]
    },
    {
        productID: 3,
        name: 'ティー',
        image: '/images/3.jpg',
        category: 'hot',
        sizes: ['R'],
        isOnSale: true,
        description: 'ダージリン、アッサムなどをブレンドしてバランスをとった、すっきりと飲みやすい紅茶です。',
        instructions: [
            ["ティーバッグをカップに入れる"],
            ["お湯を一番上の線まで注ぐ"]
        ],
        quizAnswers: [
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
        ]
    },
    {
        productID: 4,
        name: 'ルイボスティー',
        image: '/images/4.jpg',
        category: 'hot',
        sizes: ['R'],
        isOnSale: true,
        description: 'データがありません。',
        instructions: [
            ["ティーバッグをカップに入れる"],
            ["お湯を一番上の線まで注ぐ"]
        ],
        quizAnswers: [
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
        ]
    },
    {
        productID: 5,
        name: 'ロイヤルミルクティー',
        image: '/images/5.jpg',
        category: 'hot',
        sizes: ['R', 'L'],
        isOnSale: true,
        description: '紅茶の上品な香りとミルクのコクが楽しめます。',
        instructions: [
            ["ティーバッグをカップに入れる"],
            ["お湯を一タップ分入れ、ティーバッグを10回チャプチャプする"],
            ["牛乳を一番上の線まで入れる"],
            ["ジェットスチーマーで温める"]
        ],
        quizAnswers: [
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
        ]
    },
    {
        productID: 6,
        name: '豆乳ティー',
        image: '/images/6.jpg',
        category: 'hot',
        sizes: ['R', 'L'],
        isOnSale: true,
        description: '豆乳でつくったロイヤルミルクティーです。',
        instructions: [
            ["ティーバッグをカップに入れる"],
            ["お湯を一タップ分入れ、ティーバッグを10回チャプチャプする"],
            ["豆乳を一番上の線まで入れる"],
            ["ジェットスチーマーで温める"]
        ],
        quizAnswers: [
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
        ]
    },
    {
        productID: 7,
        name: 'ホットミルク',
        image: '/images/7.jpg',
        category: 'hot',
        sizes: ['R', 'L'],
        isOnSale: true,
        description: 'データがありません。',
        instructions: [
            ["牛乳を一番上の線まで入れる"],
            ["ジェットスチーマーで温める"]
        ],
        quizAnswers: [
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
        ]
    },
    {
        productID: 8,
        name: 'ホット豆乳',
        image: '/images/8.jpg',
        category: 'hot',
        sizes: ['R', 'L'],
        isOnSale: true,
        description: 'データがありません。',
        instructions: [
            ["豆乳を一番上の線まで入れる"],
            ["ジェットスチーマーで温める"]
        ],
        quizAnswers: [
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
        ]
    },
    {
        productID: 9,
        name: 'ココア',
        image: '/images/9.jpg',
        category: 'hot',
        sizes: ['R', 'L'],
        isOnSale: true,
        description: '口当たりまろやかなココアです。',
        instructions: [
            ["ココアを真ん中の線まで入れる"],
            ["ジェットスチーマーで温める"],
            ["ホイップを上にのせる。", "R : 1回", "L : 2回"]
        ],
        quizAnswers: [
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
        ]
    },
    {
        productID: 10,
        name: '沖縄黒糖ラテ',
        image: '/images/10.jpg',
        category: 'hot',
        sizes: ['R', 'L'],
        isOnSale: true,
        description: '黒糖の深い味わいとまろやかさが広がる、風味豊かなラテです。',
        instructions: [
            ["黒糖ベースを真ん中の線まで入れる"],
            ["ジェットスチーマーで温める"],
            ["ホイップを上にのせる。", "R : 1回", "L : 2回"],
            ["黒糖ソースを格子状にかける", "※Mを描くように二回"]
        ],
        quizAnswers: [
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
        ]
    },
    {
        productID: 11,
        name: 'ハニーカフェ・オレ',
        image: '/images/11.jpg',
        category: 'hot',
        sizes: ['R', 'L'],
        isOnSale: true,
        description: '最後までハチミツの風味が広がります。',
        instructions: [
            ["エスプレッソを抽出する", "※RとLどちらもエスプレッソS"],
            ["ハニーベースを真ん中の線まで入れる"],
            ["ジェットスチーマーで温める"],
            ["エスプレッソを入れる"]
        ],
        quizAnswers: [
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
        ]
    },
    {
        productID: 12,
        name: '宇治抹茶ラテ',
        image: '/images/12.jpg',
        category: 'hot',
        sizes: ['R', 'L'],
        isOnSale: true,
        description: '宇治抹茶とミルクがマッチした絶妙な味わいです。',
        instructions: [
            ["抹茶ベースを入れる", "R : 60cc", "L : 73cc"],
            ["ミルクを中ラインまで入れる"],
            ["\"泡だて\" てジェットスチーマーで温める"],
            ["抹茶パウダーをかける", "0.1g"]
        ],
        quizAnswers: [
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
        ]
    },
    {
        productID: 13,
        name: '宇治抹茶豆乳ラテ',
        image: '/images/13.jpg',
        category: 'hot',
        sizes: ['R', 'L'],
        isOnSale: true,
        description: '定番人気の宇治抹茶ラテを豆乳で仕立てました。',
        instructions: [
            ["抹茶ベースを入れる", "R : 60cc", "L : 73cc"],
            ["豆乳を中ラインまで入れる"],
            ["\"泡だて\" でジェットスチーマーで温める"],
            ["抹茶パウダーをかける", "0.1g"]
        ],
        quizAnswers: [
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
        ]
    },
    {
        productID: 14,
        name: '豆乳ラテ',
        image: '/images/14.jpg',
        category: 'hot',
        sizes: ['R', 'L'],
        isOnSale: true,
        description: '豆乳でつくったカフェラテです。',
        instructions: [
            ["エスプレッソを抽出", "R : エスプレッソM", "L : エスプレッソL"],
            ["下ラインまで豆乳を入れる"],
            ["\"泡立て\" でジェットスチーマーで温める"],
            ["エスプレッソを入れる"],
        ],
        quizAnswers: [
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
        ]
    },
    {
        productID: 15,
        name: 'カフェモカ',
        image: '/images/15.jpg',
        category: 'hot',
        sizes: ['R', 'L'],
        isOnSale: true,
        description: 'オリジナルのココアにエスプレッソを加えホイップとカプチーノパウダーをトッピング。こだわりのコーヒーとココアを絶妙にマッチさせた、ほどよい甘さが特長です。',
        instructions: [
            ["エスプレッソを抽出", "R : エスプレッソM", "L : エスプレッソL"],
            ["下ラインまでココアを入れる"],
            ["ジェットスチーマーで温める"],
            ["エスプレッソを入れる"],
            ["ホイップを上にのせる。", "R : 2回", "L : 3回"],
            ["カプチーノパウダーをかける", "0.1g"],
        ],
        quizAnswers: [
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
        ]
    },
    {
        productID: 16,
        name: 'エスプレッソコーヒー',
        image: '/images/16.jpg',
        category: 'hot',
        sizes: ['R'],
        isOnSale: true,
        description: 'コーヒーの旨みを凝縮し、豊潤な香りとすっきりとした苦味が感じられます。',
        instructions: [
            ["アウトレット部をクリーニング"],
            ["エスプレッソを抽出", "エスプレッソL"]
        ],
        quizAnswers: [
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
        ]
    },
    {
        productID: 17,
        name: 'カフェ・ラテ',
        image: '/images/17.jpg',
        category: 'hot',
        sizes: ['R', 'L'],
        isOnSale: true,
        description: 'しっかりしたコーヒー感が自慢のまろやかな味です。',
        instructions: [
            ["カフェラテのボタンを押す", "M : M", "L : L"]
        ],
        quizAnswers: [
            {
                item: "カップ",
                attributes: { type: "hot" },
                sizeDependent: {
                    R: "Mホットカップ",
                    L: "Lホットカップ"
                }
            },
            { item: "カフェラテ" }
        ]
    },
    {
        productID: 18,
        name: '本日のコーヒー',
        image: '/images/18.jpg',
        category: 'hot',
        sizes: ['R'],
        isOnSale: true,
        description: 'データがありません。',
        instructions: [
            ["アウトレット部をクリーニング"],
            ["本日のコーヒーのボタンを押す", "※アメリカンカップを使用"]
        ],
        quizAnswers: [
            {
                item: "カップ",
                attributes: { type: "hot" },
                sizeDependent: {
                    R: "アメリカンカップ",
                }
            },
            { item: "本日のコーヒー" }
        ]
    },
    {
        productID: 19,
        name: 'アイスコーヒー',
        image: '/images/19.jpg',
        category: 'ice',
        sizes: ['R', 'L'],
        isOnSale: true,
        description: '苦味を抑え、香ばしさと甘味を感じられるアイスコーヒーです。',
        instructions: [
            ["店内 : ", "グラスの継ぎ目まで氷を入れる", "---------", "テイクアウト : ", "M : 一番下のでっぱり", "L : 黄色い点線"],
            ["店内 : ", "ロゴ上までアイスコーヒーを注ぐ", "---------", "テイクアウト : ", "M : 下から二番目のでっぱり", "L : 一番下のでっぱり"],
        ],
        quizAnswers: [
            { item: "氷" },
            { item: "アイスコーヒー" }
        ]
    },
    {
        productID: 20,
        name: 'アイスティー',
        image: '/images/20.jpg',
        category: 'ice',
        sizes: ['R', 'L'],
        isOnSale: true,
        description: 'フルーティーな香りとコクのある味わいが特長のアイスティーです。',
        instructions: [
            ["店内 : ", "グラスの継ぎ目まで氷を入れる", "---------", "テイクアウト : ", "M : 一番下のでっぱり", "L : 黄色い点線"],
            ["店内 : ", "ロゴ上までアイスティーを注ぐ", "---------", "テイクアウト : ", "M : 下から二番目のでっぱり", "L : 一番下のでっぱり"],
        ],
        quizAnswers: [
            { item: "氷" },
            { item: "アイスティー" }
        ]
    },
    {
        productID: 21,
        name: 'アイスルイボスティー',
        image: '/images/21.jpg',
        category: 'ice',
        sizes: ['R', 'L'],
        isOnSale: true,
        description: 'ルイボスティーは南アフリカ原産のハーブを使用したお茶で、「奇跡のお茶」「不老長寿のお茶」として現地で飲まれています。鮮やかな赤色と自然な甘み、すっきりした味わいでカフェインが気になる方におすすめのドリンクです。',
        instructions: [
            ["店内 : ", "グラスの継ぎ目まで氷を入れる", "---------", "テイクアウト : ", "M : 一番下のでっぱり", "L : 黄色い点線"],
            ["店内 : ", "ロゴ上までアイスルイボスティーを注ぐ", "---------", "テイクアウト : ", "M : 下から二番目のでっぱり", "L : 一番下のでっぱり"],
        ],
        quizAnswers: [
            { item: "氷" },
            { item: "アイスルイボスティー" }
        ]
    },
    {
        productID: 22,
        name: 'みかんジュース',
        image: '/images/22.jpg',
        category: 'ice',
        sizes: ['R', 'L'],
        isOnSale: true,
        description: '国産（和歌山県産、静岡県産）の手摘みされた温州みかんを皮ごと丸絞りしたみかんジュースです。さっぱりとした甘みが特長です。',
        instructions: [
            ["店内 : ", "グラスの継ぎ目まで氷を入れる", "---------", "テイクアウト : ", "M : 一番下のでっぱり", "L : 黄色い点線"],
            ["店内 : ", "ロゴ上までみかんジュースを注ぐ", "---------", "テイクアウト : ", "M : 下から二番目のでっぱり", "L : 一番下のでっぱり"],
        ],
        quizAnswers: [
            { item: "氷" },
            { item: "みかんジュース" }
        ]
    },
    {
        productID: 23,
        name: 'リンゴジュース',
        image: '/images/23.jpg',
        category: 'ice',
        sizes: ['R', 'L'],
        isOnSale: true,
        description: 'りんご果汁本来のまろやかな甘味とスッキリとしたのどごし、爽やかな酸味が特長です。',
        instructions: [
            ["店内 : ", "グラスの継ぎ目まで氷を入れる", "---------", "テイクアウト : ", "M : 一番下のでっぱり", "L : 黄色い点線"],
            ["店内 : ", "ロゴ上までリンゴジュースを注ぐ", "---------", "テイクアウト : ", "M : 下から二番目のでっぱり", "L : 一番下のでっぱり"],
        ],
        quizAnswers: [
            { item: "氷" },
            { item: "リンゴジュース" }
        ]
    },
    {
        productID: 24,
        name: 'アイスミルク',
        image: '/images/24.jpg',
        category: 'ice',
        sizes: ['R', 'L'],
        isOnSale: true,
        description: 'データがありません。',
        instructions: [],
        quizAnswers: []
    },
    {
        productID: 25,
        name: 'アイス豆乳',
        image: '/images/25.jpg',
        category: 'ice',
        sizes: ['R', 'L'],
        isOnSale: true,
        description: 'データがありません。',
        instructions: [],
        quizAnswers: []
    },
    {
        productID: 26,
        name: 'アイスココア',
        image: '/images/26.jpg',
        category: 'ice',
        sizes: ['R', 'L'],
        isOnSale: true,
        description: '口当たりまろやかなココアです。',
        instructions: [
            ["店内 : ", "グラスの継ぎ目まで氷を入れる", "---------", "テイクアウト : ", "M : 一番下のでっぱり", "L : 黄色い点線"],
            ["店内 : ", "ロゴ上までココアを注ぐ", "---------", "テイクアウト : ", "M : 下から二番目のでっぱり", "L : 一番下のでっぱり"],
            ["ホイップを上にのせる", "M : 1回", "L : 2回"]
        ],
        quizAnswers: [
            { item: "氷" },
            { item: "ココアベース" },
            {
                item: "ホイップクリーム",
                quantity: {
                    R: 1,
                    L: 2
                }
            }
        ]
    },
    {
        productID: 27,
        name: 'アイス沖縄黒糖ラテ',
        image: '/images/27.jpg',
        category: 'ice',
        sizes: ['R', 'L'],
        isOnSale: true,
        description: '黒糖の深い味わいとまろやかさが広がる、風味豊かなラテです。',
        instructions: [
            ["店内 : ", "グラスの継ぎ目まで氷を入れる", "---------", "テイクアウト : ", "M : 一番下のでっぱり", "L : 黄色い点線"],
            ["店内 : ", "ロゴ上まで黒糖ベースを注ぐ", "---------", "テイクアウト : ", "M : 下から二番目のでっぱり", "L : 一番下のでっぱり"],
            ["ホイップを上にのせる", "M : 1回", "L : 2回"],
            ["黒糖ソースを格子状にかける", "※Mを描くように二回"]
        ],
        quizAnswers: [
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
        ]
    },
    {
        productID: 28,
        name: 'アイス豆乳ラテ',
        image: '/images/28.jpg',
        category: 'ice',
        sizes: ['R', 'L'],
        isOnSale: true,
        description: '豆乳でつくったアイスカフェラテです。',
        instructions: [
            ["店内 : ", "グラスの継ぎ目まで氷を入れる", "---------", "テイクアウト : ", "M : 一番下のでっぱり", "L : 黄色い点線"],
            ["店内 : ", "グラスの継ぎ目まで豆乳を入れる", "---------", "テイクアウト : ", "黄色い点線"],
            ["店内 : ", "ロゴ上までアイスコーヒーを注ぐ", "---------", "テイクアウト : ", "M : 下から二番目のでっぱり", "L : 一番下のでっぱり"],
        ],
        quizAnswers: [
            { item: "氷" },
            { item: "豆乳" },
            { item: "アイスコーヒー" }
        ]
    },
    {
        productID: 29,
        name: 'アイスハニーカフェ・オレ',
        image: '/images/29.jpg',
        category: 'ice',
        sizes: ['R', 'L'],
        isOnSale: true,
        description: '最後までハチミツの風味が広がります。',
        instructions: [
            ["店内 : ", "グラスの継ぎ目まで氷を入れる", "---------", "テイクアウト : ", "M : 一番下のでっぱり", "L : 黄色い点線"],
            ["店内 : ", "グラスの継ぎ目までハニーベースを入れる", "---------", "テイクアウト : ", "黄色い点線"],
            ["店内 : ", "ロゴ上までアイスコーヒーを注ぐ", "---------", "テイクアウト : ", "M : 下から二番目のでっぱり", "L : 一番下のでっぱり"],
        ],
        quizAnswers: [
            { item: "氷" },
            { item: "ハニーベース" },
            { item: "アイスコーヒー" }
        ]
    },
    {
        productID: 30,
        name: 'アイス宇治抹茶ラテ',
        image: '/images/30.jpg',
        category: 'ice',
        sizes: ['R', 'L'],
        isOnSale: true,
        description: '宇治抹茶とミルクがマッチした絶妙な味わいです。',
        instructions: [
            ["店内 : ", "グラスの継ぎ目まで氷を入れる", "---------", "テイクアウト : ", "M : 一番下のでっぱり", "L : 黄色い点線"],
            ["店内 : ", "グラスの継ぎ目までミルクを入れる", "---------", "テイクアウト : ", "黄色い点線"],
            ["店内 : ", "ロゴ上まで抹茶ベースを注ぐ", "---------", "テイクアウト : ", "M : 下から二番目のでっぱり", "L : 一番下のでっぱり"],
            ["抹茶パウダーをかける", "0.1g"]
        ],
        quizAnswers: [
            { item: "氷" },
            { item: "牛乳" },
            { item: "抹茶ベース" },
            { item: "抹茶パウダー" }
        ]
    },
    {
        productID: 31,
        name: 'アイス宇治抹茶豆乳ラテ',
        image: '/images/31.jpg',
        category: 'ice',
        sizes: ['R', 'L'],
        isOnSale: true,
        description: '定番人気の宇治抹茶ラテを豆乳で仕立てました。',
        instructions: [
            ["店内 : ", "グラスの継ぎ目まで氷を入れる", "---------", "テイクアウト : ", "M : 一番下のでっぱり", "L : 黄色い点線"],
            ["店内 : ", "グラスの継ぎ目まで豆乳を入れる", "---------", "テイクアウト : ", "黄色い点線"],
            ["店内 : ", "ロゴ上まで抹茶ベースを注ぐ", "---------", "テイクアウト : ", "M : 下から二番目のでっぱり", "L : 一番下のでっぱり"],
            ["抹茶パウダーをかける", "0.1g"]
        ],
        quizAnswers: [
            { item: "氷" },
            { item: "豆乳" },
            { item: "抹茶ベース" },
            { item: "抹茶パウダー" }
        ]
    },
    {
        productID: 32,
        name: 'アイスカフェ・ラテ',
        image: '/images/32.jpg',
        category: 'ice',
        sizes: ['R', 'L'],
        isOnSale: true,
        description: 'コーヒーと冷たいミルクのバランスを追求した、人気の定番ドリンクです。',
        instructions: [
            ["エスプレッソを抽出", "R : エスプレッソM", "L : エスプレッソL"],
            ["店内 : ", "ロゴ上まで氷を入れる", "---------", "テイクアウト : ", "M : 下から二番目のでっぱり", "L : 一番下のでっぱり"],
            ["店内 : ", "グラスの継ぎ目までミルクを入れる", "---------", "テイクアウト : ", "一番下のでっぱり"],
            ["エスプレッソを入れる"],
        ],
        quizAnswers: [
            { item: "氷" },
            { item: "牛乳" },
            {
                item: "エスプレッソ",
                sizeDependent: {
                    R: "M",
                    L: "L"
                }
            }
        ]
    },
    {
        productID: 33,
        name: 'プレミアムアイスカフェ・ラテ',
        image: '/images/33.jpg',
        category: 'ice',
        sizes: ['R'],
        isOnSale: true,
        description: 'データがありません。',
        instructions: [
            ["店内 : ", "ロゴ上まで氷を入れる", "---------", "テイクアウト : ", "下から二番目のでっぱり"],
            ["プレミアムアイスラテを抽出"],
        ],
        quizAnswers: [
            { item: "氷" },
            { item: "プレミアムアイスラテ" }
        ]
    },
    {
        productID: 34,
        name: 'アイスロイヤルミルクティー',
        image: '/images/34.jpg',
        category: 'ice',
        sizes: ['R', 'L'],
        isOnSale: true,
        description: 'ミルク感を持たせながらも紅茶の香りとコクがしっかりと感じられます。',
        instructions: [
            ["店内 : ", "グラスの継ぎ目まで氷を入れる", "---------", "テイクアウト : ", "M : 一番下のでっぱり", "L : 黄色い点線"],
            ["アイスロイヤルミルクティー用ベースを入れる", "M : 100cc", "L : 125cc"],
            ["店内 : ", "ロゴ上までミルクを注ぐ", "---------", "テイクアウト : ", "M : 下から二番目のでっぱり", "L : 一番下のでっぱり"],
        ],
        quizAnswers: [
            { item: "氷" },
            { item: "牛乳" },
            { item: "アイスロイヤルミルクティー用ベース" }
        ]
    },
    {
        productID: 35,
        name: 'アイス豆乳ティー',
        image: '/images/35.jpg',
        category: 'ice',
        sizes: ['R', 'L'],
        isOnSale: true,
        description: '豆乳でつくったロイヤルミルクティーです。',
        instructions: [
            ["店内 : ", "グラスの継ぎ目まで氷を入れる", "---------", "テイクアウト : ", "M : 一番下のでっぱり", "L : 黄色い点線"],
            ["アイスロイヤルミルクティー用ベースを入れる", "M : 100cc", "L : 125cc"],
            ["店内 : ", "ロゴ上まで豆乳を注ぐ", "---------", "テイクアウト : ", "M : 下から二番目のでっぱり", "L : 一番下のでっぱり"],
        ],
        quizAnswers: [
            { item: "氷" },
            { item: "豆乳" },
            { item: "アイスロイヤルミルクティー用ベース" }
        ]
    },
    {
        productID: 36,
        name: 'アイスカフェ・モカ',
        image: '/images/36.jpg',
        category: 'ice',
        sizes: ['R', 'L'],
        isOnSale: true,
        description: 'オリジナルのココアにエスプレッソを加えホイップとカプチーノパウダーをトッピング。こだわりのコーヒーとココアを絶妙にマッチさせた、ほどよい甘さが特長です。',
        instructions: [
            ["エスプレッソを抽出", "R : エスプレッソM", "L : エスプレッソL"],
            ["店内 : ", "グラスの継ぎ目まで氷を入れる", "---------", "テイクアウト : ", "M : 一番下のでっぱり", "L : 黄色い点線"],
            ["店内 : ", "グラスの継ぎ目までココアを入れる", "---------", "テイクアウト : ", "黄色い点線"],
            ["エスプレッソを入れる"],
            ["ホイップを上にのせる", "M : 2回", "L : 3回"],
            ["カプチーノパウダーをかける", "0.1g"]
        ],
        quizAnswers: [
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
        ]
    },
    {
        productID: 37,
        name: 'タピオカ黒糖ミルク',
        image: '/images/37.jpg',
        category: 'ice',
        sizes: ['R'],
        isOnSale: true,
        description: '沖縄県西表島産の黒糖のソースとミルクを合わせたベースに、もちもち食感のタピオカを合わせたデザートドリンクです。どこか懐かしいやさしい味わいの中にタピオカの食感が楽しめます',
        instructions: [
            ["氷を半分ぐらい (?) 入れる。", "120g"],
            ["湯煎してあるタピオカを軽くふり、カップに入れる"],
            ["黒糖ソースをカップの縁に沿ってかける", "30g", "または、2mmカットディスペンサー12周", "または、5mmカットディスペンサー３周"],
            ["ミルクを下から二番目のでっぱりまで注ぐ"],
            ["ヘラで色が均一になるまで混ぜる"],
        ],
        quizAnswers: [
            { item: "氷" },
            { item: "タピオカ" },
            { item: "黒糖ソース" },
            { item: "牛乳" }
        ]
    },
    {
        productID: 38,
        name: 'タピオカロイヤルミルクティー',
        image: '/images/38.jpg',
        category: 'ice',
        sizes: ['R'],
        isOnSale: true,
        description: 'ロイヤルミルクティーにもちもち食感のタピオカを合わせたデザートドリンクです。',
        instructions: [
            ["氷を半分ぐらい (?) 入れる。", "120g"],
            ["湯煎してあるタピオカを軽くふり、カップに入れる"],
            ["ミルクを一番下のでっぱりから0.5cm下まで注ぐ", "または、90cc"],
            ["アイスロイヤルミルクティー用ベースを下から二番目のでっぱりまで注ぐ"],
            ["ヘラで色が均一になるまで混ぜる"],
        ],
        quizAnswers: [
            { item: "氷" },
            { item: "タピオカ" },
            { item: "牛乳" },
            { item: "アイスロイヤルミルクティー用ベース" }
        ]
    },
    {
        productID: 39,
        name: 'レモンスカッシュ',
        image: '/images/39.jpg',
        category: 'ice',
        sizes: ['R'],
        isLimited: true,
        isOnSale: true,
        description: 'ジンジャエールに、レモンスライスとはちみつ入りのレモンソースを合わせました。ジンジャエールの辛口で爽やかな刺激に、レモンソースのやさしい酸味とほんのりとしたはちみつの風味が合わさった、夏の暑さを吹き飛ばすのにぴったりのドリンクです。',
        instructions: [
            ["店内 : ", "グラスの継ぎ目まで氷を入れる", "---------", "テイクアウト : ", "一番下のでっぱり"],
            ["袋に入ったレモンをカップに入れる"],
            ["ジンジャーエール(缶)を１本分カップに入れる"],
        ],
        quizAnswers: [
            { item: "氷" },
            { item: "レモン（袋入り）" },
            { item: "ジンジャーエール" }
        ]
    },
    {
        productID: 40,
        name: 'グリーンレモティーハニー',
        image: '/images/40.jpg',
        category: 'ice',
        sizes: ['R'],
        isLimited: true,
        isOnSale: true,
        description: '緑茶に、レモンスライスとはちみつ入りのレモンソースを合わせました。緑茶のすっきりとした味わいに、レモンソースのやさしい酸味とほんのりとしたはちみつの風味が広がります。',
        instructions: [
            ["店内 : ", "グラスの継ぎ目まで氷を入れる", "---------", "テイクアウト : ", "一番下のでっぱり"],
            ["袋に入ったレモンをカップに入れる"],
            ["店内 : ", "ロゴ上まで緑茶ベースを注ぐ", "---------", "テイクアウト : ", " 下から二番目のでっぱり"],
        ],
        quizAnswers: [
            { item: "氷" },
            { item: "レモン（袋入り）" },
            { item: "緑茶ベース" }
        ]
    },
    {
        productID: 41,
        name: 'レモンヨーグルン',
        image: '/images/41.jpg',
        category: 'ice',
        sizes: ['R', 'L'],
        isLimited: true,
        isOnSale: true,
        description: 'ヨーグルト風味のフローズンに、瀬戸内産のレモン果汁とピールが入ったレモンソースを合わせました。食感も楽しめる爽やかな味わいのドリンクです。',
        instructions: [
            ["ブレンダーのカップに氷を入れる", "R : 190g", "L : 220g"],
            ["ブレンダーのカップにフローズンベースを入れる", "R : 190g", "L:220g"],
            ["ブレンダーに容器をセットしてを回す", "R : Rボタン", "L : Lボタン"],
            ["カップを回しながら容器のフチにレモンソースを3周(たぶん)かける"],
            ["ブレンダー内のヨーグルンをカップに移す"],
        ],
        quizAnswers: [
            { item: "氷" },
            { item: "フローズンベース" },
            { item: "レモンソース" },
            { item: "ブレンダー" },
        ]
    },
    {
        productID: 42,
        name: 'マスカットヨーグルン',
        image: '/images/42.jpg',
        category: 'ice',
        sizes: ['R', 'L'],
        isLimited: true,
        isOnSale: true,
        description: 'ヨーグルト風味のフローズンに、長野県産シャインマスカットとアロエの葉肉を使用したソースを合わせた、今年で4年目となるマスカットの爽やかな香りが楽しめるフローズンドリンクです。',
        instructions: [
            ["ブレンダーのカップに氷を入れる", "R : 190g", "L : 220g"],
            ["ブレンダーのカップにフローズンベースを入れる", "R : 190g", "L:220g"],
            ["ブレンダーに容器をセットしてを回す", "R : Rボタン", "L : Lボタン"],
            ["カップを回しながら容器のフチにマスカットソースを3周(たぶん)かける"],
            ["ブレンダー内のヨーグルンをカップに移す"],
        ],
        quizAnswers: [
            { item: "氷" },
            { item: "フローズンベース" },
            { item: "マスカットソース" },
            { item: "ブレンダー" },
        ]
    },
    {
        productID: 43,
        name: 'ミラノサンドA',
        image: '/images/43.jpg',
        category: 'food',
        sizes: [],
        isOnSale: true,
        description: 'さっぱりとした優しい味わいの生ハムロースはそのままで、しっかりとした味わいのボンレスハムと、粗挽きブラックペッパーの効いたボローニャソーセージは肉の配合を見直し、マヨソースを調整することで、肉の旨味をより感じられるよう仕上げました。',
        instructions: [
            ["ミラノパンをトースターで焼く", "内側を上に向ける。"],
            ["レタス二枚を並べる", "8x16cmを２枚(25g)"],
            ["ハムのセットアップ(事前に作ってあるもの)をレタスにのせる"],
            ["焼いたミラノパンにマヨネーズをのせる", "2山×2 + 1本線"],
            ["具材にクラウンを被せ、持ち上げてヒールにのせる", "クラウン : 上側のパン", "ヒール : 下側のパン"],
        ],
        quizAnswers: [
            { item: "ミラノパン" },
            { item: "トースター" },
            { item: "レタス" },
            { item: "Aサンド用ハム" },
            { item: "マヨネーズ" },
        ]
    },
    {
        productID: 44,
        name: 'チーズ in ミラノサンドA',
        image: '/images/44.jpg',
        category: 'food',
        sizes: [],
        isOnSale: true,
        description: 'さっぱりとした優しい味わいの生ハムロースはそのままで、しっかりとした味わいのボンレスハムと、粗挽きブラックペッパーの効いたボローニャソーセージは肉の配合を見直し、マヨソースを調整することで、肉の旨味をより感じられるよう仕上げました。コクのあるチェダーチーズと絶妙にマッチ！',
        instructions: [
            ["ミラノパンをトースターで焼く", "内側を上に向ける。"],
            ["レタス二枚を並べる", "8x16cmを２枚(25g)"],
            ["レタスの上にスライス赤チーズ(1/2)を2切れ並べる"],
            ["ハムのセットアップ(事前に作ってあるもの)をレタス・赤チーズにのせる"],
            ["焼いたミラノパンにマヨネーズをのせる", "2山×2 + 1本線"],
            ["具材にクラウンを被せ、持ち上げてヒールにのせる", "クラウン : 上側のパン", "ヒール : 下側のパン"],
        ],
        quizAnswers: [
            { item: "ミラノパン" },
            { item: "トースター" },
            { item: "レタス" },
            { item: "赤チーズ" },
            { item: "Aサンド用ハム" },
            { item: "マヨネーズ" },
        ]
    },
    {
        productID: 45,
        name: 'ミラノサンドB',
        image: '/images/45.jpg',
        category: 'food',
        sizes: [],
        isOnSale: true,
        description: '王道の組み合わせであるサーモンとクリームチーズを合わせたフィリングとエビ・アボカドのトッピングはそのままに、卵の風味とコク、玉ねぎのシャキシャキした食感を活かしたタルタルソースを合わせました。シーフードサラダ感覚で食べられる仕立てになっています',
        instructions: [
            ["ミラノパンをトースターで焼く", "内側を上に向ける。"],
            ["レタス二枚を並べる", "8x8を２枚(13g)"],
            ["レタスの上にサーモンクリームチーズをのせる", "25g"],
            ["ボイルむきえびをのせる", "3尾"],
            ["アボカドをのせる", "3切れ"],
            ["タルタルソースを上にのせる", "20g"],
            ["ドレッシングをかける", "4g"],
            ["ブラックペッパーをかける", "0.2g"],
            ["ドライパセリをかける", "0.03g"],
            ["焼いたミラノパンにマヨネーズをのせる", "2山×2"],
            ["具材にクラウンを被せ、持ち上げてヒールにのせる", "クラウン : 上側のパン", "ヒール : 下側のパン"],
        ],
        quizAnswers: [
            { item: "ミラノパン" },
            { item: "トースター" },
            { item: "レタス" },
            { item: "サーモンクリームチーズ" },
            { item: "えび" },
            { item: "アボカド" },
            { item: "タルタルソース" },
            { item: "ドレッシング" },
            { item: "ブラックペッパー" },
            { item: "ドライパセリ" },
            { item: "マヨネーズ" },
        ]
    },
    {
        productID: 46,
        name: '牛カルビ',
        image: '/images/46.jpg',
        category: 'food',
        sizes: [],
        isLimited: true,
        isOnSale: true,
        description: '牛カルビに甘辛いタレを合わせ、ブラックペッパーでアクセントをつけた、食欲をそそる期間限定のミラノサンドです。口の中でじゅわっと広がる牛カルビの旨みとブラックペッパーの香りをお楽しみください。',
        instructions: [
            ["ミラノパンをトースターで焼く", "内側を上に向ける。"],
            ["カルビビーフを折り目を下にしてウェーブスターで焼く"],
            ["レタス二枚を並べる", "8x8を２枚(13g)"],
            ["焼いたカルビビーフを、トングでレタスの上に広げてのせる"],
            ["ブラックペッパーをかける", "0.1g"],
            ["焼いたミラノパンにマヨネーズをのせる", "2山×2"],
            ["具材にクラウンを被せ、持ち上げてヒールにのせる", "クラウン : 上側のパン", "ヒール : 下側のパン"],
        ],
        quizAnswers: [
            { item: "ミラノパン" },
            { item: "トースター" },
            { item: "ウェーブスター" },
            { item: "レタス" },
            { item: "カルビ" },
            { item: "ブラックペッパー" },
            { item: "マヨネーズ" },
        ]
    },
    {
        productID: 47,
        name: '牛カルビ 濃厚チーズソース',
        image: '/images/47.jpg',
        category: 'food',
        sizes: [],
        isLimited: true,
        isOnSale: true,
        description: '期間限定ミラノサンド 牛カルビ にラクレット風チーズソースをトッピングしました。しっかりとした味わいの牛カルビにまろやかなチーズソースがよく合います。アクセントにかけたブラックペッパーの香りもあわせてお楽しみください。',
        instructions: [
            ["ミラノパンをトースターで焼く", "内側を上に向ける。"],
            ["カルビビーフを折り目を下にしてウェーブスターで焼く"],
            ["レタス二枚を並べる", "8x8を２枚(13g)"],
            ["焼いたカルビビーフを、トングでレタスの上に広げてのせる"],
            ["チーズソースを１袋、カルビビーフの上に一本線を描くようにのせる"],
            ["ブラックペッパーをかける", "0.1g"],
            ["焼いたミラノパンにマヨネーズをのせる", "2山×2"],
            ["具材にクラウンを被せ、持ち上げてヒールにのせる", "クラウン : 上側のパン", "ヒール : 下側のパン"],
        ],
        quizAnswers: [
            { item: "ミラノパン" },
            { item: "トースター" },
            { item: "ウェーブスター" },
            { item: "レタス" },
            { item: "カルビ" },
            { item: "チーズソース" },
            { item: "ブラックペッパー" },
            { item: "マヨネーズ" },
        ]
    },
    {
        productID: 48,
        name: '牛カルビ ねぎ塩レモン',
        image: '/images/48.jpg',
        category: 'food',
        sizes: [],
        isLimited: true,
        isOnSale: true,
        description: '期間限定ミラノサンド 牛カルビ にねぎ塩とレモンをトッピングしました。しっかりとした味わいの牛カルビサンドに、具沢山なねぎ塩ソースとさっぱりとしたレモンがよく合う、食欲をそそる香りが楽しめるミラノサンドです。',
        instructions: [
            ["ミラノパンをトースターで焼く", "内側を上に向ける。"],
            ["カルビビーフを折り目を下にしてウェーブスターで焼く"],
            ["レタス二枚を並べる", "8x8を２枚(13g)"],
            ["焼いたカルビビーフを、トングでレタスの上に広げてのせる"],
            ["ねぎ塩ソース、カルビビーフの上に一本線を描くようにのせる", "約14cm (15g)"],
            ["レモンスライスを２切れ、カルビビーフの上にのせる", "皮目が交互になるように (▲ ▼) "],
            ["ブラックペッパーをかける", "0.1g"],
            ["焼いたミラノパンにマヨネーズをのせる", "2山×2"],
            ["具材にクラウンを被せ、持ち上げてヒールにのせる", "クラウン : 上側のパン", "ヒール : 下側のパン"],
        ],
        quizAnswers: [
            { item: "ミラノパン" },
            { item: "トースター" },
            { item: "ウェーブスター" },
            { item: "レタス" },
            { item: "カルビ" },
            { item: "ネギ塩ソース" },
            { item: "レモンスライス" },
            { item: "ブラックペッパー" },
            { item: "マヨネーズ" },
        ]
    },
    {
        productID: 49,
        name: '牛カルビ ハラペーニョ',
        image: '/images/49.jpg',
        category: 'food',
        sizes: [],
        isLimited: true,
        isOnSale: true,
        description: '期間限定ミラノサンド 牛カルビ にハラペーニョの酢漬けをトッピングしました。しっかりとした味わいの牛カルビサンドに酸味と辛味があるハラペーニョを組み合わせ、複雑なうま味を楽しめる仕立てにしました。',
        instructions: [
            ["ミラノパンをトースターで焼く", "内側を上に向ける。"],
            ["カルビビーフを折り目を下にしてウェーブスターで焼く"],
            ["レタス二枚を並べる", "8x8を２枚(13g)"],
            ["焼いたカルビビーフを、トングでレタスの上に広げてのせる"],
            ["ハラペーニョを６個、カルビビーフの上にのせる"],
            ["ブラックペッパーをかける", "0.1g"],
            ["焼いたミラノパンにマヨネーズをのせる", "2山×2"],
            ["具材にクラウンを被せ、持ち上げてヒールにのせる", "クラウン : 上側のパン", "ヒール : 下側のパン"],
        ],
        quizAnswers: [
            { item: "ミラノパン" },
            { item: "トースター" },
            { item: "ウェーブスター" },
            { item: "レタス" },
            { item: "カルビ" },
            { item: "ハラペーニョ" },
            { item: "ブラックペッパー" },
            { item: "マヨネーズ" },
        ]
    },
    {
        productID: 50,
        name: 'トースト',
        image: '/images/50.jpg',
        category: 'food',
        sizes: [],
        isOnSale: true,
        description: '外はさっくり、中はふんわり食感の厚切りトーストです。コーヒーと相性がよく、朝食メニューにぴったりです',
        instructions: [
            ["トースターを山側を奥にして、一番手前のヒーターにトーストの中心が来るように置き、焼く"],
            ["出てきた状態でパンの面をひっくり返さないようにして、そのままもう一度同じように焼く"],
            ["半分にカットし、皿にのせる"],
        ],
        quizAnswers: [
            { item: "トースト" },
            { item: "トースター" },
        ]
    },
    {
        productID: 51,
        name: 'チーズトースト',
        image: '/images/51.jpg',
        category: 'food',
        sizes: [],
        isOnSale: true,
        description: '外はさっくり、中はふんわり食感の厚切りトーストにチーズをのせました。',
        instructions: [
            ["トーストの上にゴーダチーズを二枚のせる", "チーズ間を5mm開ける"],
            ["ウェーブスターで焼く"],
            ["半分にカットし、皿にのせる"],
        ],
        quizAnswers: [
            { item: "トースト" },
            { item: "ウェーブスター" },
            { item: "ゴーダチーズ" },
        ]
    },
    {
        productID: 52,
        name: 'ツナチェダーチーズ',
        image: '/images/52.jpg',
        category: 'food',
        sizes: [],
        isOnSale: true,
        description: 'ツナサラダに、とろ～り熱々のチェダーチーズが絶妙にマッチした、寒い季節にぴったりのホットサンドです',
        instructions: [
            ["ミラノパンのヒールにツナフィリングをのせる", "レモン型18番ディッシャー小山盛り1杯(50g)", "ヒール : パンの下側"],
            ["ツナフィリングの上にブラックペッパーをかける", "0.1g"],
            ["チェダーチーズを真ん中を重ねるようにして上にのせる"],
            ["クラウンを被せる"],
            ["半分にカットする"],
            ["ウェーブスターで焼く"],
        ],
        quizAnswers: [
            { item: "ミラノパン" },
            { item: "ウェーブスター" },
            { item: "ツナフィリング" },
            { item: "ブラックペッパー" },
            { item: "チェダーチーズ" },
        ]
    },
    {
        productID: 53,
        name: 'カルツォーネ',
        image: '/images/53.jpg',
        category: 'food',
        sizes: [],
        isLimited: true,
        isOnSale: true,
        description: 'アサリ、イカ、イタヤ貝の具材と、トマトペースト、チーズをもちもち生地で包みました。魚介の旨みが詰まった、トマト仕立てのカルツォーネです。',
        instructions: [
            ["カルツォーネの包材を剥がす"],
            ["折り返し部分を奥にして、ウェーブスターで焼く"],
        ],
        quizAnswers: [
            { item: "ウェーブスター" },
            { item: "カルツォーネ" }
        ]
    },
    {
        productID: 54,
        name: 'ジャーマンドック',
        image: '/images/54.jpg',
        category: 'food',
        sizes: [],
        isOnSale: true,
        description: 'ドトールコーヒーショップのベストセラー商品。どこを切ってもオリジナル。パン・ソーセージ・マスタードの素材にとことんこだわった、自信作です。',
        instructions: [
            ["ドックパンをトースターで焼く"],
            ["ソーセージをはさむ、マスタードをかける", "3g"],
        ],
        quizAnswers: [
            { item: "ドッグパン" },
            { item: "ソーセージ" },
            { item: "マスタード" },
        ]
    },
    {
        productID: 55,
        name: 'レタスドッグ',
        image: '/images/55.jpg',
        category: 'food',
        sizes: [],
        isOnSale: true,
        description: 'シャキシャキレタスのサラダなドック。オリジナルソースが◎',
        instructions: [
            ["ドックパンをトースターで焼く"],
            ["レタスを二枚重ねる", "16×8cm (25g)"],
            ["レタスをドッグパンにはさみ、ムータルドをかける", "8g"],
            ["ソーセージをはさむ"],
        ],
        quizAnswers: [
            { item: "ドッグパン" },
            { item: "ソーセージ" },
            { item: "レタス" },
            { item: "ムータルド" },
        ]
    },
    {
        productID: 56,
        name: '全粒粉サンド',
        image: '/images/56.jpg',
        category: 'food',
        sizes: [],
        isOnSale: true,
        description: '肉の食感に近づけるよう改良した「大豆のミート」にスライストマト、豆と野菜をトマトで煮込んだ具材感あるソースをトッピング。ピリ辛豆乳ソースでピリッと且つマイルドに仕上げています。',
        instructions: [
            ["全粒粉入りパンをトースターで焼く"],
            ["大豆ミートをウェーブスターで焼く"],
            ["レタスを二枚重ねる", "8×8cm (13g)"],
            ["焼いた大豆ミートをレタスにのせる"],
            ["トマト1枚を大豆ミートにのせる"],
            ["トマト煮を18gトマトの上にのせる。", "丸型26番ディッシャーすりきり1杯"],
            ["ピリ辛ごま豆乳ソースをクラウンにかける", "円を描くように8g", "クラウン : 上側のパン"],
            ["クラウンを具材にのせ、それをヒールにのせる"]
        ],
        quizAnswers: [
            { item: "全粒粉入りパン" },
            { item: "トースター" },
            { item: "ウェーブスター" },
            { item: "レタス" },
            { item: "大豆ミート" },
            { item: "トマト" },
            { item: "トマト煮" },
            { item: "ピリ辛ソース" },
        ]
    },
    {
        productID: 57,
        name: 'フレンチトースト ハニーメープル',
        image: '/images/57.jpg',
        category: 'food',
        sizes: [],
        isOnSale: true,
        description: 'データがありません。',
        instructions: [
            ["フレンチトーストをウェーブスターで焼く", "山側を手前に向ける"],
            ["焼いたフレンチトーストを６等分にカットする"],
            ["丸皿の左にカットしたフレンチトーストを4切れのせ、その上に2切れのせる"],
            ["ソフトクリームを丸皿の右側にのせる", "2周半"],
            ["ケーキシロップを全体にかける", "6山 (12g)"],
            ["粉糖を全体にかける", "0.1g"],
        ],
        quizAnswers: [
            { item: "フレンチトースト" },
            { item: "ウェーブスター" },
            { item: "ソフトクリーム" },
            { item: "ケーキシロップ" },
            { item: "粉糖" },
        ]
    },
    {
        productID: 58,
        name: 'フレンチトースト チョコバナナ',
        image: '/images/58.jpg',
        category: 'food',
        sizes: [],
        isOnSale: true,
        description: 'データがありません。',
        instructions: [
            ["フレンチトーストをウェーブスターで焼く", "山側を手前に向ける"],
            ["焼いたフレンチトーストを６等分にカットする"],
            ["丸皿の左にカットしたフレンチトーストを4切れのせ、その上に2切れのせる"],
            ["バナナ(1/4)の皮を取り、それを４等分にカットする"],
            ["カットしたバナナ4切れを丸皿の手前にずらしてのせる"],
            ["ソフトクリームを丸皿の右側にのせる", "2周半"],
            ["チョコソースをソフトクリームとバナナの上にかける", "3山 (5g)"],
            ["粉糖を全体にかける", "0.1g"],
        ],
        quizAnswers: [
            { item: "フレンチトースト" },
            { item: "ウェーブスター" },
            { item: "ソフトクリーム" },
            { item: "バナナ" },
            { item: "チョコソース" },
            { item: "粉糖" },
        ]
    }
];

export function getProductByName(name: string): Product | undefined {
    return productData.find(product => product.name === name);
}

export function getQuizAnswerByProduct(product: Product): QuizAnswerItem[] {
    return product.quizAnswers;
}

