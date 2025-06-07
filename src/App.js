import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TasksPage from "./pages/TasksPage";
import FriendsPage from './pages/FriendsPage';
import LandingPage from './pages/LandingPage';
import TermsPage from './pages/TermsPage';
import AirdropPage from './pages/AirdropPage';
import BottomNav from './components/BottomNav';
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import 'bootstrap/dist/css/bootstrap.min.css';
import { showMonetagAd } from './utils/monetagLoader';

function App() {
const [user, setUser] = useState(null);

useEffect(() => {
    // Attempt to load from Telegram WebApp
const tgUser = window.Telegram?.WebApp?.initDataUnsafe?.user;

if (tgUser) {
localStorage.setItem("user", JSON.stringify(parsedUser));
setUser(parsedUser);
} else {
      // fallback to localStorage
const storedUser = JSON.parse(localStorage.getItem("user"));
if (storedUser) {
setUser(storedUser);
}
}
useEffect(() => {
  if (window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.ready();

    const tgData = window.Telegram.WebApp.initDataUnsafe;
    const telegramId = tgData.user?.id;
    const telegramUsername = tgData.user?.username;

    if (telegramId) {
      localStorage.setItem("telegramId", telegramId);
      localStorage.setItem("telegramUsername", telegramUsername);
}

    console.log("Telegram ID:", telegramId);
  }
}, []);
    // Monetag Ad timer
const adInterval = setInterval(() => {
showMonetagAd();
}, 6 * 60 * 1000);

return () => clearInterval(adInterval);
}, []);

return (
<Routes>
<Route path="/" element={<LandingPage />} />
<Route path="/home" element={<HomePage user={user} />} />
<Route path="/friends" element={<FriendsPage user={user} />} />
<Route path="/terms" element={<TermsPage />} />
<Route path="/tasks" element={<><TasksPage user={user} /><BottomNav /></>} />
<Route path="/airdrop" element={<><AirdropPage user={user} /><BottomNav /></>} />
<Route path="/admin" element={<AdminLogin />} />
<Route path="/admin/dashboard" element={<AdminDashboard />} />
</Routes>
);
}

export default App;
