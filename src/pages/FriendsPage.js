// src/pages/FriendsPage.js
import React, { useEffect, useState } from 'react';
import BottomNav from '../components/BottomNav';
import './FriendsPage.css';

function FriendsPage() {
  const [referralLink, setReferralLink] = useState('');

  useEffect(() => {
    const user = window?.Telegram?.WebApp?.initDataUnsafe?.user;

    if (user?.username) {
      setReferralLink(https://akemidids.vercel.app/?ref=${user.username});
    } else {
      setReferralLink('Telegram user not found');
    }
  }, []);

  const copyToClipboard = () => {
    if (referralLink && referralLink !== 'Telegram user not found') {
      navigator.clipboard.writeText(referralLink);
      alert('Referral link copied!');
    }
  };

  return (
    <div className="friends-page">
      <h2 className="friends-title">Invite Your Friends</h2>
      <p className="friends-text">
        Share your referral link below and earn rewards when your friends join and start clicking!
      </p>
      <div className="referral-box">
        <input type="text" value={referralLink} readOnly className='code' />
        <button onClick={copyToClipboard} className='copy-button'>Copy</button>
      </div>

      <BottomNav />
    </div>
  );
}

export default FriendsPage;
