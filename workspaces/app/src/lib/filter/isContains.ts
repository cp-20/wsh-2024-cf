type Params = {
  query: string;
  target: string;
};

const normalize = (s: string) =>
  s
    .normalize("NFKC") // まずはUnicode正規化で全角・半角を統一
    .replace(/[\u30A1-\u30F6]/g, function (match) {
      // カタカナをひらがなに変換
      return String.fromCharCode(match.charCodeAt(0) - 0x60);
    });

// ひらがな・カタカナ・半角・全角を区別せずに文字列が含まれているかを調べる
export function isContains({ query, target }: Params): boolean {
  return normalize(target).includes(normalize(query));
}
