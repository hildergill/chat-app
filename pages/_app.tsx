// This file is a part of chat-app (https://www.github.com/hildergill/chat-app)
// Copyright 2022 Hilder Gill

import { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";

import "../stylesheets/global.scss";

const App = ({ Component, pageProps }: AppProps) => <Component {...pageProps} />;
export default appWithTranslation(App);
