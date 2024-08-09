// pages/_app.js

import '../styles/globals.css';
import '../styles/main.css';
import Script from 'next/script';
import disableDevtool from 'disable-devtool';

function MyApp({ Component, pageProps }) {
  // Initialize disableDevtool
  if (typeof window !== 'undefined') {
    disableDevtool();
  }

  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        id="google-analytics"
        src="https://www.googletagmanager.com/gtag/js?id=G-R2PVQR1PSL"
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics-config"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-R2PVQR1PSL');
          `,
        }}
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
