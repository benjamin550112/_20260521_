# AI 數據分析與洞察工具

一個讓使用者貼上 CSV 報表並利用 Gemini AI 進行分析與洞察的網頁工具。

## 功能特點

- **CSV 數據貼上與解析**：快速輸入您的 CSV 格式數據。
- **AI 深度洞察**：利用 Google Gemini 模型自動產生商業建議與趨勢分析。
- **Markdown 格式化輸出**：美觀且易讀的分析結果。
- **一鍵複製**：方便快速複製分析結果。

## 本地開發與啟動

### 前置準備

- [Node.js](https://nodejs.org/) (建議 v18 以上)
- 準備好您的 [Gemini API Key](https://aistudio.google.com/)

### 啟動步驟

1. **安裝依賴套件**：
   ```bash
   npm install
   ```

2. **設定環境變數**：
   - 複製 `.env.example` 為 `.env.local`：
     ```bash
     cp .env.example .env.local
     ```
   - 在 `.env.local` 中填入您的 `GEMINI_API_KEY`。

3. **啟動開發伺服器**：
   ```bash
   npm run dev
   ```
   伺服器啟動後，可在瀏覽器打開 `http://localhost:3000` 進行測試。
