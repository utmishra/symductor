import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { createTheme, NextUIProvider } from '@nextui-org/react';
import { Inconsolata } from 'next/font/google';
import React from 'react';

const theme = createTheme({
  type: 'light', // it could be "light" or "dark"
  theme: {
    colors: {
      primary: '#1352F1',
      secondary: '#DC006A',
      error: '#FCC5D8',
    },
  },
});

const inconsolata = Inconsolata({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider theme={theme}>
      <main className={inconsolata.className}>
        <Component
          {...pageProps}
          style={{
            background: '#ffe2e2',
          }}
        />
      </main>
    </NextUIProvider>
  );
}
