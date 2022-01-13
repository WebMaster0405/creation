import React from "react";
import ReactDOM from "react-dom";
import { SnackbarProvider } from "notistack";
import { BrowserRouter } from "react-router-dom";
import { useWeb3React, Web3ReactProvider } from "@web3-react/core";


import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ConcealThemeProvider } from "./context/ConcealTheme";

import "./index.css";
import "@celo-tools/use-contractkit/lib/styles.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Web3Provider } from "@ethersproject/providers";

const getLibrary = (provider: any) => {
    const library = new Web3Provider(provider);
    library.pollingInterval = 15000;
    return library;
};

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ConcealThemeProvider>
      <Web3ReactProvider getLibrary={getLibrary}>
        <SnackbarProvider maxSnack={3}>
          <App />
        </SnackbarProvider>
        </Web3ReactProvider>
      </ConcealThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
