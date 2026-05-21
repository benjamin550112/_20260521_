# AI 數據分析與洞察工具

一個讓使用者貼上 CSV 報表並利用 Gemini AI 進行分析與洞察的網頁工具。此專案後端採用 **Netlify Functions (無伺服器架構)**，適合直接部署至 Netlify 平台。

## 功能特點

- **CSV 數據貼上與解析**：快速輸入您的 CSV 格式數據。
- **AI 深度洞察**：利用 Google Gemini 模型自動產生商業建議與趨勢分析。
- **Markdown 格式化輸出**：美觀且易讀的分析結果。
- **一鍵複製**：方便快速複製分析結果。
- **Serverless 架構**：後端程式碼已全面轉為 Netlify Functions 雲端無伺服器函數，省去維護 Express 伺服器的麻煩。

## 本地開發與啟動

### 前置準備

- [Node.js](https://nodejs.org/) (建議 v18 以上)
- 準備好您的 [Gemini API Key](https://aistudio.google.com/)
- 本地開發建議安裝 [Netlify CLI](https://docs.netlify.com/cli/get-started/)：
  ```bash
  npm install -g netlify-cli
  ```

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

3. **啟動 Netlify 本地開發伺服器**：
   ```bash
   netlify dev
   ```
   此指令會自動：
   - 啟動前端 Vite 開發伺服器。
   - 啟動本地 Netlify Functions 伺服器並載入 `.env.local`。
   - 套用 `netlify.toml` 的路由重導向規則（將 `/api/analyze` 代理至本地的 `analyze.ts` 函數）。
   - 完成後可在瀏覽器開啟專屬的代理網址（通常為 `http://localhost:8888`）進行完整測試。

## 部署至 Netlify

1. 將本專案推送至 GitHub 儲存庫。
2. 在 Netlify 控制台連結您的 GitHub 儲存庫。
3. 專案的配置將會自動讀取 `netlify.toml`：
   - **Build command**：`npm run build`
   - **Publish directory**：`dist`
4. 在 Netlify 的 **Site configuration -> Environment variables** 中，新增 `GEMINI_API_KEY` 變數並設定為您的 API Key。
5. 部署完成！
