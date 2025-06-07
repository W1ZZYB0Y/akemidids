// src/pages/FriendsPage.js
import React, { useEffect, useState } from 'react';
import BottomNav from '../components/BottomNav';
import './FriendsPage.css';
import { getUserProfile } from '../api/userApi';

function FriendsPage() {
  const [username, setUsername] = useState('');
  const [referralLink, setReferralLink] = useState('');
  const [referralCount, setReferralCount] = useState(null);
  const generalLink = 'https://t.me/JawsGameBot/Jaws';

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg) {
      tg.ready();
      const user = tg.initDataUnsafe?.user;

      if (user) {
        const idOrUsername = user.username || user.id;
        setUsername(idOrUsername);
        setReferralLink(`https://t.me/JawsGameBot/Jaws?start=${idOrUsername}`);
        fetchReferralCount(user.id);
      }
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

  const copyToClipboard = (text) => {
    if (text) {
      navigator.clipboard.writeText(text);
      alert('Link copied!');
    }
  };

  return (
    <div className="friends-page">
      <h2 className="friends-title">Invite Your Friends</h2>
      <p className="friends-text">
        Share your referral link below and earn rewards when your friends join and start clicking!
      </p>

      {referralLink ? (
        <>
          {/* Referral Link */}
          <div className="referral-box">
            <input type="text" value={referralLink} readOnly className="code" />
            <button onClick={() => copyToClipboard(referralLink)} className="copy-button">Copy</button>
          </div>

          {/* General Link */}
          <div className="referral-box">
            <p className="text-white mb-1">General Link</p>
            <input type="text" value={generalLink} readOnly className="code" />
            <button onClick={() => copyToClipboard(generalLink)} className="copy-button">Copy</button>
          </div>
        </>
      ) : (
        <p className="text-white text-center">Loading referral link...</p>
      )}

      {referralCount !== null && (
        <p className="referral-count text-center mt-3">
          You have referred <strong>{referralCount}</strong> friend{referralCount === 1 ? '' : 's'}!
        </p>
      )}

      <BottomNav />
    </div>
  );
}

export default FriendsPage;
