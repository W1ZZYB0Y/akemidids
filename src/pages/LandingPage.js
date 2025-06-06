import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const initUser = async () => {
      const tgUser = window.Telegram?.WebApp?.initDataUnsafe?.user;

      if (!tgUser) {
        console.error("Telegram user not found.");
        return;
      }

      const userData = {
        telegramId: tgUser.id,
        username: tgUser.username,
        referredBy: searchParams.get("ref"),
        ip: "", // Optional, backend may set it from request
      };

      try {
        const response = await fetch("https://akemidids-backend.onrender.com/api/users/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });

        const result = await response.json();
        if (response.ok) {
          localStorage.setItem("user", JSON.stringify(result));
          navigate("/home");
        } else {
          console.error("Registration failed:", result.error);
        }
      } catch (err) {
        console.error("Error registering user:", err.message);
      }
    };

    initUser();
  }, [navigate, searchParams]);

  return (
    <div className="landing-container d-flex flex-column justify-content-center align-items-center">
      <img src="/jaws-logo.png" alt="Jaws Logo" className="landing-logo" />
      <h1 className="text-white mt-3">JAWS</h1>
      <a href="/terms" className="text-decoration-underline text-info mt-3">Terms & Conditions</a>
    </div>
  );
}

export default LandingPage;
