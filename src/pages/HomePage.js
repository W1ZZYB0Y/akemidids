import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Modal, ProgressBar } from 'react-bootstrap';
import BottomNav from '../components/BottomNav';
import './HomePage.css';
import { getUserProfile, updateUsername } from '../api/userApi'; // <-- Add updateUsername

function HomePage() {
  const MAX_CLICKS = 50;
  const [balance, setBalance] = useState(0);
  const [clicksLeft, setClicksLeft] = useState(MAX_CLICKS);
  const [progress, setProgress] = useState(0);
  const [rank, setRank] = useState('Dwarf Lantern Shark');
  const [showRankUp, setShowRankUp] = useState(false);
  const [user, setUser] = useState(null);
  const [refillTime, setRefillTime] = useState(null);
  const [countdown, setCountdown] = useState(0);

  const ranks = useMemo(() => [
    { name: 'Dwarf Lantern Shark', threshold: 0, image: '/ranks/dwarf-lantern.png' },
    { name: 'Pygmy Shark', threshold: 100, image: '/ranks/pygmy.png' },
    { name: 'Spotted Cat Shark', threshold: 500, image: '/ranks/spotted-cat.png' },
    { name: 'Horn Shark', threshold: 1000, image: '/ranks/horn.png' },
    { name: 'Blacktip reef Shark', threshold: 5000, image: '/ranks/blacktip.png' },
    { name: 'Bull Shark', threshold: 10000, image: '/ranks/Bull-shark.png' },
    { name: 'Hammerhead Shark', threshold: 50000, image: '/ranks/hammerhead.png' },
    { name: 'Great White Shark', threshold: 100000, image: '/ranks/great-white.png' },
    { name: 'Whale Shark', threshold: 500000, image: '/ranks/whale.png' }
  ], []);

  const updateProgress = useCallback((balanceVal) => {
    const currentRank = ranks.find(r => balanceVal < r.threshold) || ranks[ranks.length - 1];
    const prevThreshold = ranks[ranks.indexOf(currentRank) - 1]?.threshold || 0;
    const percent = ((balanceVal - prevThreshold) / (currentRank.threshold - prevThreshold)) * 100;
    setProgress(Math.min(percent, 100));
  }, [ranks]);

  const updateRank = useCallback((balanceVal) => {
    const currentRank = ranks.find(r => balanceVal < r.threshold) || ranks[ranks.length - 1];
    const currentIndex = ranks.indexOf(currentRank);
    const prevIndex = ranks.findIndex(r => r.name === rank);
    if (currentIndex > prevIndex) {
      setRank(currentRank.name);
      setShowRankUp(true);
      setClicksLeft(MAX_CLICKS);
    }
  }, [ranks, rank]);

  useEffect(() => {
    const storedBalance = parseInt(localStorage.getItem('jaws-balance')) || 0;
    setBalance(storedBalance);
    updateRank(storedBalance);
    updateProgress(storedBalance);

    const lastRefill = localStorage.getItem('click-refill-time');
    if (lastRefill) {
      const remaining = new Date(lastRefill).getTime() - Date.now();
      if (remaining > 0) {
        setRefillTime(new Date(lastRefill));
        setClicksLeft(0);
      } else {
        setClicksLeft(MAX_CLICKS);
        localStorage.removeItem('click-refill-time');
      }
    }
  }, [ranks, updateProgress, updateRank]);

  useEffect(() => {
    if (showRankUp) {
      const timer = setTimeout(() => setShowRankUp(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [showRankUp]);

  useEffect(() => {
    const existingScript = document.getElementById('libtl-sdk');
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "//libtl.com/sdk.js";
      script.setAttribute("data-zone", "9322228");
      script.setAttribute("data-sdk", "show_9322228");
      script.async = true;
      script.id = 'libtl-sdk';
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
      const tgUser = window.Telegram.WebApp.initDataUnsafe?.user;
      if (tgUser?.id) {
        const telegramId = tgUser.id;
        const username = tgUser.username;

        // Update backend with username if it exists
        if (username) {
          updateUsername(telegramId, username).catch(console.error);
        }

        getUserProfile(telegramId)
          .then(profile => {
            const fullProfile = { ...profile, telegramId, username };
            setUser(fullProfile);
            setBalance(profile.balance || 0);
            updateRank(profile.balance || 0);
            updateProgress(profile.balance || 0);
            localStorage.setItem('jaws-user', JSON.stringify(fullProfile));
          })
          .catch(() => {
            const localUser = JSON.parse(localStorage.getItem('jaws-user'));
            if (localUser) setUser(localUser);
          });
      }
    }
  }, [updateRank, updateProgress]);

  useEffect(() => {
    if (refillTime) {
      const interval = setInterval(() => {
        const now = new Date();
        const timeLeft = Math.max(0, Math.ceil((new Date(refillTime) - now) / 1000));
        setCountdown(timeLeft);

        if (timeLeft <= 0) {
          setClicksLeft(MAX_CLICKS);
          setRefillTime(null);
          localStorage.removeItem('click-refill-time');
          clearInterval(interval);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [refillTime]);

  const handleClick = () => {
    if (clicksLeft > 0) {
      const newBalance = balance + 1;
      const newClicks = clicksLeft - 1;
      setBalance(newBalance);
      setClicksLeft(newClicks);
      localStorage.setItem('jaws-balance', newBalance);
      updateRank(newBalance);
      updateProgress(newBalance);

      if (newClicks === 0) {
        const refill = new Date(Date.now() + 10 * 60 * 1000);
        setRefillTime(refill);
        localStorage.setItem('click-refill-time', refill.toISOString());
      }
    } else {
      alert("You've reached your click limit! Refill in 10 minutes.");
    }
  };

  const currentRankObj = ranks.find(r => r.name === rank);

  return (
    <div className="homepage-container">
      <div className="rank-section text-center mb-4">
        <div className="d-flex justify-content-center align-items-center gap-3">
          <img src={currentRankObj.image} alt={rank} className="rank-image" />
          <div>
            <ProgressBar now={progress} variant="info" className="w-100" />
            <div className="rank-name mt-1">{rank}</div>
          </div>
        </div>
        {user && (
          <div className="text-muted small mt-2">
            Logged in as <strong>@{user.username || user.telegramId}</strong>
          </div>
        )}
      </div>

      <div className="text-center my-4">
        <img
          src="/clicker.png"
          alt="Clicker"
          className="clicker-image"
          onClick={handleClick}
        />
        {refillTime && (
          <div className="text-muted mt-2">Refill in {countdown}s</div>
        )}
      </div>

      <div className="footer-stats-container">
        <div className="left-stat">Clicks Left: {clicksLeft} / {MAX_CLICKS}</div>
        <div className="right-stat">Balance: {balance}</div>
      </div>

      <BottomNav />

      <Modal show={showRankUp} onHide={() => setShowRankUp(false)} centered backdrop="static">
        <Modal.Body className="text-center rank-up-modal">
          <img src={currentRankObj.image} alt={rank} className="rank-up-image mb-3" />
          <h4>{rank}</h4>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default HomePage;
