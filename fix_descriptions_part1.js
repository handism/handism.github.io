const fs = require('fs');

const fixDesc = (file, matchStr, newStr) => {
    const filePath = `app/tools/${file}/page.tsx`;
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf-8');
    content = content.replace(new RegExp(matchStr, 'g'), newStr);
    fs.writeFileSync(filePath, content);
};

fixDesc('hash-generator', 'description="エラー:"', 'description="各種アルゴリズムでのハッシュ値を生成します"');
fixDesc('qr-code', 'description="生成中..."', 'description="テキストやURLからQRコードを生成します"');
fixDesc('yaml-json', 'description="エラー:"', 'description="YAMLとJSONを相互に変換します"');
fixDesc('color-converter', 'description="Tool description"', 'description="各種カラーフォーマットを相互に変換します"');
fixDesc('csv-json', 'description="Tool description"', 'description="CSVとJSONを相互に変換します"');
fixDesc('html-entity', 'description="Tool description"', 'description="HTMLエンティティのエンコードとデコードを行います"');
fixDesc('password-generator', 'description="Tool description"', 'description="ランダムなパスワードを安全に生成します"');
fixDesc('svg-editor', 'description="Tool description"', 'description="SVGをプレビュー・最適化します"');
fixDesc('memphis', 'description="80年代風のカラフルな背景画像を生成"', 'description="80年代風のカラフルな背景画像を生成します"');
