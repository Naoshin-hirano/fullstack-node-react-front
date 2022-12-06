import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SWRConfig } from "swr";

// グローバルfetcherの定義
const fetcher = (...args: Parameters<typeof fetch>) =>
    fetch(...args).then((res) => res.json());
const root: any = ReactDOM.createRoot(
    document.getElementById("root") as Element
);
root.render(
    <React.StrictMode>
        <SWRConfig value={{ fetcher }}>
            <App />
        </SWRConfig>
    </React.StrictMode>
);
