"use client"
import type { PropsWithChildren } from "react";
import { getLocale } from "next-intl/server";

import { Root } from "@/components/Root/Root";

import "@telegram-apps/telegram-ui/dist/styles.css";
import "normalize.css/normalize.css";
import "./_assets/globals.css";
import { Provider } from "react-redux";
import { store } from "@/store";


export default async function RootLayout({ children }: PropsWithChildren) {

  return (
    <html>
      <body>
        <Provider store={store}>
            <Root>{children}</Root>
        </Provider>
      </body>
    </html>
  );
}
