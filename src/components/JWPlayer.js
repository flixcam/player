import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import CryptoJS from 'crypto-js';
import { useRouter } from 'next/router';

const secretKey = '5e884898da28047151d0e56f8dc6292773603d0d6aabbdddf92f8f76dd4a1690'; // Must be 32 bytes for AES-256

// Decrypt function
const decrypt = (text, secretKey) => {
  const [ivHex, encrypted] = text.split(':');
  const iv = CryptoJS.enc.Hex.parse(ivHex);
  const key = CryptoJS.enc.Hex.parse(secretKey);
  const decrypted = CryptoJS.AES.decrypt({ ciphertext: CryptoJS.enc.Hex.parse(encrypted) }, key, { iv });
  return decrypted.toString(CryptoJS.enc.Utf8);
};

const JWPlayer = () => {
  const [playlistData, setPlaylistData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Initialize useRouter
  const { logo } = router.query; // Extract logo from query parameters

  useEffect(() => {
    const fetchData = async () => {
      const { id } = router.query; // Extract the id from query parameters
      if (!id) {
        setError('Please enter ID in the URL like ?id=12345');
        setLoading(false);
        return; // Exit if id is not available
      }

      try {
        const response = await fetch(`https://api.kimostream.eu.org/?id=${id}`);
        const data = await response.json();
        const encryptedUrl = data.body.m3u8Url;

        // Decrypt the URL
        const decryptedUrl = decrypt(encryptedUrl, secretKey);

        if (!decryptedUrl) {
          setError('Content not available.');
          setLoading(false);
          return;
        }

        const playlistItem = {
          title: data.body.title,
          description: "You're Watching",
          image: data.image,
          sources: [{
            file: decryptedUrl,
            label: "HD",
            default: true
          }]
        };

        setPlaylistData(playlistItem);
      } catch (error) {
        setError('Content not Found..');
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router.query.id]); // Depend on id to refetch when it changes

  useEffect(() => {
    if (playlistData) {
      const playerInstance = window.jwplayer('player').setup({
        controls: true,
        displaytitle: true,
        displaydescription: true,
        abouttext: "Join Telegram",
        aboutlink: "https://t.me/kimostream",
        skin: { name: "netflix" },
        logo: logo ? {
          file: logo
        } : undefined,
        captions: {
          color: "#FFF",
          fontSize: 14,
          backgroundOpacity: 0,
          edgeStyle: "raised"
        },
        playlist: [playlistData],
      });

      playerInstance.on('ready', () => {
        const buttonId = 'download-video-button';
        const iconPath = 'data:image/svg+xml;base64,...'; // shortened for brevity
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
    }
  }, [playlistData, logo]);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Head>
        <Script src="https://content.jwplatform.com/libraries/KB5zFt7A.js"></Script>
      </Head>
      {error ? (
        <div className="error-screen">
          <h1>{error}</h1>
        </div>
      ) : (
        <div id="player"></div>
      )}
      <div className="modal">
        <div className="modal-container">
          <div className="modal-header">
            <strong>🛑 ADBlock Detected! 🛑</strong>
            <button type="button" aria-label="Close" id="close">
              <img src='data:image/svg+xml;base64,...' alt="close" /> {/* shortened for brevity */}
            </button>
          </div>
          <div className="modal-body">
            <span>Ads do help us to keep the website running, so please support us by whitelisting our site in your Adblocking software. Apart from your browser adblocker, you may have to whitelist us in your VPN/Security software's adblockers as well. Once done, just refresh this web page.</span>
          </div>
        </div>
      </div>
      <style jsx>{`
        .error-screen {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: black;
          color: white;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 24px;
          text-align: center;
        }
      `}</style>
    </>
  );
};

export default JWPlayer;
