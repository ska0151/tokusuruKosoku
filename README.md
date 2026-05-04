# トクする高速 - 首都圏高速IC料金比較アプリ

複数のIC（入口・出口）から最速・バランス・最安の3案を瞬時に比較できるPWAアプリケーション。

## 📋 プロジェクト構成

```
├── docs/                     # ドキュメント
│   ├── rdd.md               # 要件定義書（RDD）
│   ├── 基本設計書.md         # システム詳細設計（BDD）
│   └── MVP構想書.md          # MVP実装計画
├── frontend/                # Next.js フロントエンド
│   ├── app/                 # ページ・レイアウト
│   ├── src/components/      # UI コンポーネント
│   ├── src/lib/             # ユーティリティ・APIクライアント
│   └── package.json
├── backend/                 # Node.js + Express バックエンド
│   ├── src/
│   │   ├── app.ts           # エントリーポイント
│   │   ├── routes/          # API ルート
│   │   ├── services/        # ビジネスロジック
│   │   └── data/            # マスタデータ
│   ├── tsconfig.json
│   └── package.json
├── .github/workflows/       # GitHub Actions CI/CD
└── README.md
```

## 🚀 クイックスタート

### 前提条件
- Node.js 18+
- npm 或 yarn

### セットアップ

#### 1. リポジトリをクローン
```bash
git clone https://github.com/ska0151/tokusuruKosoku.git
cd tokusuruKosoku
```

#### 2. バックエンド（Express）のセットアップ
```bash
cd backend
npm install
npm run build  # TypeScript をコンパイル
npm run dev    # 開発サーバー起動（localhost:3001）
```

#### 3. フロントエンド（Next.js）のセットアップ（別ターミナル）
```bash
cd frontend
npm install
npm run dev    # 開発サーバー起動（localhost:3000）
```

#### 4. ブラウザで実行
```
http://localhost:3000
```

## 📧 使用方法

1. **入口IC・出口ICを選択**: ドロップダウンから希望のIC を選択
2. **車種・ETC有無を設定**: 利用条件を指定
3. **「料金を比較する」をクリック**: 3案（最速・バランス・最安）が表示
4. **Google Maps で開く**: 選択したルートをナビアプリで開始

## 🛠️ 開発コマンド

### バックエンド
```bash
cd backend
npm run dev      # 開発サーバー（nodemon）
npm run build    # TypeScript コンパイル
npm start        # 本番環境実行
```

### フロントエンド
```bash
cd frontend
npm run dev      # 開発サーバー
npm run build    # 本番ビルド
npm run lint     # ESLint 実行
```

## 📊 API エンドポイント

### ルート比較
```
POST /api/routes/search
```
**リクエスト例:**
```json
{
  "origin": { "lat": 35.6762, "lng": 139.7674 },
  "destination": { "lat": 34.6937, "lng": 135.5023 },
  "entryIcId": "SH001",
  "exitIcId": "MS002",
  "vehicleType": "regular",
  "hasETC": true
}
```

### 料金査定
```
GET /api/tolls/estimate?fromIcId=SH001&toIcId=MS002&hasETC=true
```

### 周辺IC検索
```
GET /api/ics/nearby?lat=35.6762&lng=139.7674&radiusKm=15
```

## 🔧 環境変数

### バックエンド（`backend/.env.local`）
```
PORT=3001
NODE_ENV=development
OSRM_API_URL=http://router.project-osrm.org/route/v1/driving
```

### フロントエンド（`frontend/.env.local`）
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## ✅ テスト状況

- ✅ バックエンド TypeScript コンパイル
- ✅ フロントエンド Next.js ビルド
- ✅ API エンドポイント動作確認
- ✅ 3案ルート比較表示

## 📝 MVP マイルストーン

| Phase | 期間 | ステータス | 成果物 |
|---|---|---|---|
| **M0: 環境構築** | 1週間 | ✅ 完了 | GitHub/Vercel/Railway セットアップ |
| **M1: ロジック検証** | 2週間 | 🔄 実装中 | OSRM + 料金計算動作確認 |
| **M2: 地図UI統合** | 2週間 | 📋 予定 | Leaflet 表示 + フロント統合 |
| **M3: ルート比較完成** | 1.5週間 | 📋 未開始 | 3案比較 + ナビ連携 |
| **M4: テスト・デバッグ** | 1.5週間 | 📋 未開始 | シナリオテスト + ユーザーテスト |

## 🔗 参考リンク

- [OSRM（Open Source Routing Machine）](https://router.project-osrm.org)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Express.js](https://expressjs.com)
- [Leaflet Map](https://leafletjs.com)

## ⚠️ 免責事項

このアプリケーションは検証版です。実走行時は安全なドライバーの判断に基づいてください。当アプリは参考情報としてのみご利用ください。

## 📞 サポート

バグ報告・機能要望は [GitHub Issues](https://github.com/ska0151/tokusuruKosoku/issues) へ
