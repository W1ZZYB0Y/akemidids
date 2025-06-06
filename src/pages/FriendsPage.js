import React, { useEffect, useState } from 'react';
import BottomNav from '../components/BottomNav';
import './FriendsPage.css';

function FriendsPage() {
  const [username, setusername] = useState('');
  const [referralLink, setreferralLink] = useState('');

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    const user = tg?.initDataUnsafe?.user;

    console.log("Telegram user:", user); // ✅ Log the user to see what's available

    if (user) {
      const nameToUse = user.username || user.id;
      setUsername(nameToUse);
      setReferralLink(`https://akemidids.vercel.app/?ref=${nameToUse}`);
    }
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    alert('Referral link copied!');
  };

  return (
    <div className="friends-page">
      <h2 className="friends-title">Invite Your Friends</h2>
      <p className="friends-text">
        Share your referral link below and earn rewards when your friends join and start clicking!
      </p>
      <div className="referral-box">
        <input type="text" value={referralLink} readOnly className="code" />
        <button onClick={copyToClipboard} className="copy-button">Copy</button>
      </div>

      <BottomNav />
    </div>
  );
}

export default FriendsPage;
