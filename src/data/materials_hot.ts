export const hotCategories = {
    "カップ": ["デミタスカップ", "アメリカンカップ", "Mホットカップ", "Lホットカップ", "サイズなし"],
    "5000s(ボタン)": ["エスプレッソ", "カフェラテ", "本日のコーヒー"],
    "その他の材料": ["熱湯"],
    "飲料原料": [
        "ブレンドコーヒー", "エスプレッソ",
        "ホットティー用ティーバッグ", "ミルクティー用ティーバッグ", "ルイボスティー用ティーバッグ",
        "抹茶ベース", "ココアベース", "黒糖ベース", "ハニーベース", "グリーンティーベース",
        "豆乳", "牛乳",
    ],
    "機械": ["ジェットスチーマー"],
    "トッピング/ソース": ["ホイップクリーム", "黒糖ソース", "カプチーノパウダー", "抹茶パウダー"],
};

export type HotMaterial = keyof typeof hotCategories;

export const allHotMaterials = Object.values(hotCategories).flat();