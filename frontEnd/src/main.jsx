import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ContextProdvider } from "./Admin/AdminNavContext.jsx";
import { Provider } from "react-redux";
import { store } from "../store/store.js";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ErrorBoundary from "../utilities/ErrorBoundary.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContextProdvider>
      <Provider store={store}>
        <ErrorBoundary>
          <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <App />
          </GoogleOAuthProvider>
        </ErrorBoundary>
      </Provider>
    </ContextProdvider>
  </StrictMode>
);
