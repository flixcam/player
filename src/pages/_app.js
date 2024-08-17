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
      script.src = 'https://cdn.jsdelivr.net/npm/disable-devtooll';
      script.onload = () => {
        if (window.DisableDevtool) {
          window.DisableDevtool({
            // Add any configuration options here
          });
        }
      };
      document.body.appendChild(script);

      // Initialize Yandex.Metrika after the script is loaded
      const yandexScript = document.createElement('script');
      yandexScript.src = 'https://mc.yandex.ru/metrika/tag.js';
      yandexScript.async = true;
      yandexScript.onload = () => {
        if (window.ym) {
          window.ym(98096466, 'init', {
            clickmap: true,
            trackLinks: true,
            accurateTrackBounce: true,
            webvisor: true,
          });
        }
      };
      document.body.appendChild(yandexScript);
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
      {/* Yandex.Metrika counter */}
      <noscript>
        <div>
          <img
            src="https://mc.yandex.ru/watch/98096466"
            style={{ position: 'absolute', left: '-9999px' }}
            alt=""
          />
        </div>
      </noscript>
      {/* /Yandex.Metrika counter */}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
