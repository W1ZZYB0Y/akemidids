// src/pages/FriendsPage.js
import React, { useEffect, useState } from 'react';
import BottomNav from '../components/BottomNav';
import './FriendsPage.css';
import { getUserProfile } from '../api/userApi'; // assumes you already have this

function FriendsPage() {
  const [username, setUsername] = useState('');
  const [referralLink, setReferralLink] = useState('');
  const [referralCount, setReferralCount] = useState(null);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg) {
      tg.ready();

      const user = tg.initDataUnsafe?.user;
      if (user && user.username) {
        setUsername(user.username);
        setReferralLink(`https://t.me/JawsGameBot/Jaws?start=${user.username}`);
        fetchReferralCount(user.id);
      } else if (user && user.id) {
        setUsername(user.id.toString());
        setReferralLink(`https://t.me/JawsGameBot/Jaws?start=${user.id}`);
        fetchReferralCount(user.id);
      }
    } else {
      console.warn("Telegram WebApp not available");
    }
  }, []);

  const fetchReferralCount = async (telegramId) => {
    try {
      const profile = await getUserProfile(telegramId);
      setReferralCount(profile.referredUsers?.length || 0);
    } catch (err) {
      console.error('Failed to fetch referral count:', err.message);
    }
  };

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

      {referralCount !== null && (
        <p className="referral-count">
          You have referred <strong>{referralCount}</strong> friend{referralCount === 1 ? '' : 's'}!
        </p>
      )}

      <BottomNav />
    </div>
  );
}

export default FriendsPage;
