import React, { useEffect } from 'react';
import Head from 'next/head';
import Script from 'next/script'
const JWPlayer = () => {
  useEffect(() => {
    const playerInstance = window.jwplayer('player').setup({
      controls: true,
      displaytitle: true,
      displaydescription: true,
      abouttext: "Join Telegram",
      aboutlink: "https://t.me/kimostream",
      skin: { name: "netflix" },
      logo: {
        file:
          "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
        link: "https://www.buymeacoffee.com/pingo"
      },
      captions: {
        color: "#FFF",
        fontSize: 14,
        backgroundOpacity: 0,
        edgeStyle: "raised"
      },
      playlist: [{
        title: "Sprite Fright - Open Movie by Blender Studio",
        description: "You're Watching",
        image: "https://i.ytimg.com/vi/_cMxraX_5RE/maxresdefault.jpg",
        sources: [{
          file: "https://aa.bigtimedelivery.net/_v13/fb849341df1de54d9a8174b7314d5881dd8bd6b3360c9bf29342163d055e878a0c38f63f87e00d4a5595d5c2926997f417454ec063f61f6768bf2685013c48f742f622f3a24884b18ebfca688f7011d1946904b55085bd05113a71f0d95cf0335c5cea89648bbd0051623cef1a8355842c004f984082aec4ac8d529f775e41b5d1d3428233ad0ec934c36318a5c148e3/playlist.m3u8",
          label: "HD",
          default: true
        }],
       /* captions: [
          {
            file: "https://raw.githubusercontent.com/iPingOi/jwplayer/main/%5BBengali%5D%20Sprite%20Fright%20-%20Blender%20Open%20Movie.srt",
            label: "Bangla",
            kind: "captions"
          },
          {
            file: "https://raw.githubusercontent.com/iPingOi/jwplayer/main/%5BEnglish%5D%20Sprite%20Fright%20-%20Blender%20Open%20Movie.srt",
            label: "English",
            kind: "captions",
            default: true
          },
        ],*//*
        tracks: [{
          file: "https://cdn.jwplayer.com/strips/iYfADWO1-120.vtt",
          kind: "thumbnails"
        }]*/
      }],/*
      advertising: {
        client: "vast",
        schedule: [{
          offset: "pre",
          tag: "https://www.videosprofitnetwork.com/watch.xml?key=d904b92c1f6cc769c59d030320a66f69"
        }]
      }*/
    });

    playerInstance.on('ready', () => {
      const buttonId = 'download-video-button';
      const iconPath = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0Ij48cGF0aCBmaWxsPSJub25lIiBkPSJNMCAwaDI0djI0SDB6Ii8+PHBhdGggZD0iTTMgMTloMTh2Mkgzdi0yem0xMC01LjgyOEwxOS4wNzEgNy4xbDEuNDE0IDEuNDE0TDEyIDE3IDMuNTE1IDguNTE1IDQuOTI5IDcuMSAxMSAxMy4xN1YyaDJ2MTEuMTd6IiBmaWxsPSJyZ2JhKDI0NywyNDcsMjQ3LDEpIi8+PC9zdmc+';
      const tooltipText = 'Contact Admin';
      
      playerInstance.addButton(iconPath, tooltipText, () => {
        const playlistItem = playerInstance.getPlaylistItem();
        const anchor = document.createElement('a');
        const fileUrl = playlistItem.file;
        anchor.setAttribute('href', fileUrl);
        const downloadName = playlistItem.file.split('/').pop();
        anchor.setAttribute('download', downloadName);
        anchor.style.display = 'none';
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
      }, buttonId);

      const playerContainer = playerInstance.getContainer();
      const buttonContainer = playerContainer.querySelector('.jw-button-container');
      const spacer = buttonContainer.querySelector('.jw-spacer');
      const timeSlider = playerContainer.querySelector('.jw-slider-time');
      buttonContainer.replaceChild(timeSlider, spacer);

      playerInstance.on('adBlock', () => {
        const modal = document.querySelector('div.modal');
        modal.style.display = 'flex';
        document.getElementById('close').addEventListener('click', () => location.reload());
      });

      const rewindContainer = playerContainer.querySelector('.jw-display-icon-rewind');
      const forwardContainer = rewindContainer.cloneNode(true);
      const forwardDisplayButton = forwardContainer.querySelector('.jw-icon-rewind');
      forwardDisplayButton.style.transform = 'scaleX(-1)';
      forwardDisplayButton.ariaLabel = 'Forward 10 Seconds';
      const nextContainer = playerContainer.querySelector('.jw-display-icon-next');
      nextContainer.parentNode.insertBefore(forwardContainer, nextContainer);

      playerContainer.querySelector('.jw-display-icon-next').style.display = 'none';
      const rewindControlBarButton = buttonContainer.querySelector('.jw-icon-rewind');
      const forwardControlBarButton = rewindControlBarButton.cloneNode(true);
      forwardControlBarButton.style.transform = 'scaleX(-1)';
      forwardControlBarButton.ariaLabel = 'Forward 10 Seconds';
      rewindControlBarButton.parentNode.insertBefore(forwardControlBarButton, rewindControlBarButton.nextElementSibling);

      [forwardDisplayButton, forwardControlBarButton].forEach((button) => {
        button.onclick = () => {
          playerInstance.seek(playerInstance.getPosition() + 10);
        };
      });
    });
  }, []);

  return (
    <>
      <Head>
        <Script src="https://content.jwplatform.com/libraries/KB5zFt7A.js"></Script>
        </Head>
      <div id="player"></div>
      <div className="modal">
        <div className="modal-container">
          <div className="modal-header">
            <strong>🛑 ADBlock Detected! 🛑</strong>
            <button type="button" aria-label="Close" id="close">
              <img src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0Ij48cGF0aCBmaWxsPSJub25lIiBkPSJNMCAwaDI0djI0SDB6Ii8+PHBhdGggZD0iTTEyIDEwLjU4Nmw0Ljk1LTQuOTUgMS40MTQgMS40MTQtNC45NSA0Ljk1IDQuOTUgNC45NS0xLjQxNCAxLjQxNC00Ljk1LTQuOTUtNC45NSA0Ljk1LTEuNDE0LTEuNDE0IDQuOTUtNC45NS00Ljk1LTQuOTVMNy4wNSA1LjYzNnoiIGZpbGw9InJnYmEoMjQ3LDI0NywyNDcsMSkiLz48L3N2Zz4=' alt="close" />
            </button>
          </div>
          <div className="modal-body">
            <span>Ads do help us to keep website running, so please support us by whitelisting our site in your Adblocking software. Apart from your browser adblocker, you may have to whitelist us in your VPN/Security software's adblockers as well. Once done, just refresh this web page.</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default JWPlayer;