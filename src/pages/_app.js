// pages/_app.js

import '../styles/globals.css';
import '../styles/main.css';
import Script from 'next/script';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Initialize DisableDevtool with options after the script is loaded
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/disable-devtool';
      script.onload = () => {
        if (window.DisableDevtool) {
          window.DisableDevtool({
            // Add any configuration options here
          });
        }
      };
      document.body.appendChild(script);
    }
  }, []);

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
