import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ConfigProvider } from "@/contexts/ConfigContext.tsx";
import reportWebVitals from "./reportWebVitals";

import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/700.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ConfigProvider>
    <App />
  </ConfigProvider>
);

reportWebVitals();
