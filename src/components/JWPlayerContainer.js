import React, { useEffect, useState } from 'react';
import JWPlayer from './JWPlayer';

const JWPlayerContainer = () => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    const handleScriptLoad = () => {
      setIsScriptLoaded(true);
    };

    const script = document.createElement('script');
    script.src = 'https://content.jwplatform.com/libraries/KB5zFt7A.js';
    script.onload = handleScriptLoad;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      {isScriptLoaded && <JWPlayer />}
    </div>
  );
};

export default JWPlayerContainer;
