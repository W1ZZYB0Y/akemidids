import React, { useEffect, useState } from 'react';
import BottomNav from '../components/BottomNav';
import './FriendsPage.css';

function FriendsPage() {
  const [username, setUsername] = useState('');
  const [referralLink, setReferralLink] = useState('');

  useEffect(() => {
    const user = window.Telegram?.WebApp?.initDataUnsafe?.user;
    if (user && user.username) {
      setUsername(user.username);
      setReferralLink(`https://akemidids.vercel.app/?ref=${user.username}`);
    } else if (user && user.id) {
      // fallback if username doesn't exist
      setUsername(user.id);
      setReferralLink(`https://akemidids.vercel.app/?ref=${user.id}`);
    }
  }, []);

  const copyToClipboard = () => {
    if (referralLink) {
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
      {referralLink ? (
        <div className="referral-box">
          <input type="text" value={referralLink} readOnly className='code' />
          <button onClick={copyToClipboard} className='copy-button'>Copy</button>
        </div>
      ) : (
        <p className="text-white text-center">Loading referral link...</p>
      )}
      <BottomNav />
    </div>
  );
}

export default FriendsPage;
