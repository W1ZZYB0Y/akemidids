import React, { useEffect, useState } from 'react';
import { completeTask } from '../api/userApi';
import { loadPropellerAd } from '../utils/propellerLoader';
import { showMonetagAd } from '../utils/monetagLoader';
import './TasksPage.css';

const TasksPage = ({ user }) => {
  const [tasks, setTasks] = useState([]);
  const [timers, setTimers] = useState({});

  useEffect(() => {
    const staticTasks = [

      {
        _id: 'example1',
        name: 'Join our Telegram Channel',
        link: 'https://t.me/+ChzmTysrwqswOTU0',
        reward: 15,
      },
      {
        _id: 'example2',
        name: 'Follow us on Tiktok',
        link: 'https://www.tiktok.com/@jawscommunity?_t=ZM-8ul7EuGzTyZ&_r=1',
        reward: 15,
      },
      {
        _id: 'example3',
        name: 'Follow us on X',
        link: 'https://x.com/JAWSCommunity?t=nzbY6EWJDf8WYV1aBfOYgQ&s=09',
        reward: 15,
      },
      {
        _id: 'example4',
        name: 'Join our Facebook Community',
        link: 'https://www.facebook.com/share/1YcxDubgeh/',
        reward: 20,
      },
      {
        _id: 'example5',
        name: 'Follow our Sponsor on Facebook',
        link: 'https://www.facebook.com/profile.php?id=61550246886021',
        reward: 20,
      },
      {
        _id: 'example6',
        name: 'Follow our Sponsor on Tiktok',
        link: 'https://www.tiktok.com/@shad0wclutch?_t=ZM-8wwheryYBgU&_r=1',
        reward: 20,
      },
      {
        _id: 'monetag',
        name: 'Watch Ad (Monetag)',
        type: 'monetag',
        reward: 10,
      },
    ];

    setTasks(staticTasks);
    loadPropellerAd();
  }, []);

  const startCountdown = (taskId) => {
    let seconds = 60;
    const interval = setInterval(() => {
      setTimers((prev) => ({ ...prev, [taskId]: seconds }));
      seconds--;

      if (seconds < 0) {
        clearInterval(interval);
        handleTaskComplete(taskId);
      }
    }, 1000);
  };

  const handleTaskClick = (task) => {
    if (task.type === 'monetag') {
      showMonetagAd();
    } else if (task.link) {
      window.open(task.link, '_blank');
    }
    startCountdown(task._id);
  };


  

  const handleTaskComplete = async (taskId) => {
    if (!user || !user.telegramId) {
      console.error("User or telegramId is undefined");
      return;
    }
    
    const task = tasks.find((t) => t._id === taskId);
    if (!task) return;
    console.log("Task payload: ", {
      telegramId: user.telegramId,
      taskName: task.name,
      reward: task.reward,
    });

    try {
      await completeTask({
        telegramId: user?.telegramId,
        taskName: task.name,
        reward: task.reward,
      });
      alert(`You've received ${task.reward} coins for completing: ${task.name}`);
    } catch (error) {
      console.error('Task completion error:', error);
    }
  };

  return (
    <div className="container text-white">
      <h3 className="mt-4 mb-3">Tasks</h3>
      {tasks.map((task) => (
        <div key={task._id} className="task-card mb-3 p-3">
          <h5>{task.name}</h5>
          <button
            className="task-btn"
            onClick={() => handleTaskClick(task)}
            disabled={timers[task._id] !== undefined}
          >
            {timers[task._id] !== undefined
              ? `Rewarding in ${timers[task._id]}s`
              : `${task.reward} coins`}
          </button>
        </div>
      ))}
    </div>
  );
};

export default TasksPage;