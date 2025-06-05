import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Modal, ProgressBar } from 'react-bootstrap';
import BottomNav from '../components/BottomNav';
import './HomePage.css';
import { getUserProfile } from '../api/userApi'; 

function HomePage() {
  const [balance, setBalance] = useState(0);
  const [clicksLeft, setClicksLeft] = useState(10);
  const [progress, setProgress] = useState(0);
  const [rank, setRank] = useState('Dwarf Lantern Shark');
  const [showRankUp, setShowRankUp] = useState(false);
  const [user, setUser] = useState(null); 

  const ranks = useMemo(() => [
    { name: 'Dwarf Lantern Shark', threshold: 0, image: '/ranks/dwarf-lantern.png' },
    { name: 'Pygmy Shark', threshold: 500, image: '/ranks/pygmy.png' },
    { name: 'Spotted Cat Shark', threshold: 1000, image: '/ranks/spotted-cat.png' },
    { name: 'Horn Shark', threshold: 5000, image: '/ranks/horn.png' },
    { name: 'Blacktip reef Shark', threshold: 10000, image: '/ranks/blacktip.png' },
    { name: 'Bull Shark', threshold: 50000, image: '/ranks/Bull-shark.png' },
    { name: 'Hammerhead Shark', threshold: 100000, image: '/ranks/hammerhead.png' },
    { name: 'Great White Shark', threshold: 500000, image: '/ranks/great-white.png' },
    { name: 'Whale Shark', threshold: 1000000, image: '/ranks/whale.png' }
  ], []);

  const updateProgress = useCallback((balanceVal) => {
    const currentRank = ranks.find(r => balanceVal < r.threshold) || ranks[ranks.length - 1];
    const prevThreshold = ranks[ranks.indexOf(currentRank) - 1]?.threshold || 0;
    const percent = ((balanceVal - prevThreshold) / (currentRank.threshold - prevThreshold)) * 100;
    setProgress(Math.min(percent, 100));
  }, [ranks]);

  const updateRank = useCallback((balanceVal) => {
    const currentRank = ranks.find(r => balanceVal < r.threshold) || ranks[ranks.length - 1];
    if (currentRank.name !== rank) {
      setRank(currentRank.name);
      setShowRankUp(true);
      setClicksLeft(10);
    }
  }, [ranks, rank]);

  useEffect(() => {
    const storedBalance = parseInt(localStorage.getItem('jaws-balance')) || 0;
    setBalance(storedBalance);
    updateRank(storedBalance);
    updateProgress(storedBalance);
  }, [ranks, updateProgress, updateRank]);

  useEffect(() => {
    if (showRankUp) {
      const timer = setTimeout(() => setShowRankUp(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [showRankUp]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//libtl.com/sdk.js";
    script.setAttribute("data-zone", "9322228");
    script.setAttribute("data-sdk", "show_9322228");
    script.async = true;
    document.body.appendChild(script);
  
    return () => {
      document.body.removeChild(script);
    };
  }, []);

useEffect(() => {
  if (window.Telegram?.WebApp) {
    window.Telegram.WebApp.ready(); 
    const tgUser = window.Telegram.WebApp.initDataUnsafe?.user;

    if (tgUser && tgUser.id) {
      const telegramId = tgUser.id;
      getUserProfile(telegramId)
        .then(profile => {
          setUser({ ...profile, telegramId });
          setBalance(profile.balance || 0);
          updateRank(profile.balance || 0);
          updateProgress(profile.balance || 0);
        })
        .catch(err => {
          console.error("Failed to fetch user profile:", err.message);
        });
    } else {
      console.warn("Telegram user not found");
    }
  } else {
    console.warn("Telegram WebApp not available.");
  }
}, [updateRank, updateProgress]);

  const handleClick = () => {
    if (clicksLeft > 0) {
      const newBalance = balance + 1;
      const newClicks = clicksLeft - 1;
      setBalance(newBalance);
      setClicksLeft(newClicks);
      localStorage.setItem('jaws-balance', newBalance);
      updateRank(newBalance);
      updateProgress(newBalance);
    } else {
      alert("You've reached your click limit!");
    }
  };

  const currentRankObj = ranks.find(r => r.name === rank);

  return (
    <div className="homepage-container">
      {/* Top Section: Rank Progress */}
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

      {/* Middle Section: Clicker */}
      <div className="text-center my-4">
        <img
          src="/clicker.png"
          alt="Clicker"
          className="clicker-image"
          onClick={handleClick}
        />
      </div>

      {/* Bottom Section: Stats */}
      <div className="footer-stats-container">
        <div className="left-stat">Clicks Left: {clicksLeft}</div>
        <div className="right-stat">Balance: {balance}</div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />

      {/* Rank-Up Modal */}
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
