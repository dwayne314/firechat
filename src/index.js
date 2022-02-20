import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./redux/store";
import { AuthProvider } from "./hooks/useAuth";
import { DatabaseProvider } from "./hooks/useDatabase";
import { DarkModeProvider } from "./hooks/useDarkMode";
import { ScreenSizeProvider } from "./hooks/useScreenSize";
import App from "./App";
import "./index.css";

ReactDOM.render(
  <Provider store={store}>
    <DarkModeProvider>
      <PersistGate loading={null} persistor={persistor}>
        <DatabaseProvider>
          <AuthProvider>
            <ScreenSizeProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </ScreenSizeProvider>{" "}
          </AuthProvider>
        </DatabaseProvider>
      </PersistGate>
    </DarkModeProvider>
  </Provider>,
  document.getElementById("root")
);
