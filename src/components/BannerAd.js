// components/BannerAd.js
import React, { useEffect } from 'react';

const BannerAd = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "//example.com/bannek'r-ad.js"; // Replace with real PropellerAds script source
    script.async = true;
    script.id = "propeller-ad";

    document.getElementById("ad-container")?.appendChild(script);
  }, []);

  return (
    <div id="ad-container" className="text-center my-3">
      {/* Placeholder while ad loads */}
      <p>Loading ad...</p>
    </div>
  );
};

export default BannerAd; 