import React, { useEffect, useState } from 'react';
import BottomNav from '../components/BottomNav';
import './FriendsPage.css';

function FriendsPage() {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const tgUser = window.Telegram?.WebApp?.initDataUnsafe?.user;
    if (tgUser) {
      setUsername(tgUser.username || tgUser.id);
    }
  }, []);

  const referralLink = username
    ? https://akemidids.vercel.app/?ref=${username}
    : 'Telegram user not found';

  const copyToClipboard = () => {
    if (referralLink !== 'Telegram user not found') {
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
        <input type="text" value={referralLink} readOnly className="code" />
        <button onClick={copyToClipboard} className="copy-button">Copy</button>
      </div>

      <BottomNav />
    </div>
  );
}

export default FriendsPage;
