import React, { useState, useEffect } from 'react';
import './App.css';
import videoSource from '../public/vf.mp4';

function App() {
  const [days, setDays] = useState(2);
  const [hours, setHours] = useState(23);
  const [minutes, setMinutes] = useState(59);
  const [seconds, setSeconds] = useState(59);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      // Countdown logic here
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          if (hours > 0) {
            setHours(hours - 1);
            setMinutes(59);
            setSeconds(59);
          } else {
            if (days > 0) {
              setDays(days - 1);
              setHours(23);
              setMinutes(59);
              setSeconds(59);
            }
          }
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [days, hours, minutes, seconds]);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="app">
      <video autoPlay loop muted playsInline className="video-bg">
        <source src={videoSource} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="content">
        <div className="centered">
          <h1></h1>
          <div className="color-overlay">
            <div className="countdown">
              <div className="time">
                {days} {days === 1 ? 'day' : 'days'}
              </div>
              <div className="time">
                {hours} {hours === 1 ? 'hour' : 'hours'}
              </div>
              <div className="time">
                {minutes} {minutes === 1 ? 'minute' : 'minutes'}
              </div>
              <div className="time">
                {seconds} {seconds === 1 ? 'second' : 'seconds'}
              </div>
            </div>
          </div>

          <div className="email-content">
            <p>Get notified when Luxonik launches!</p>
            <div className="input-box">
              <input type="email" placeholder="Enter your email..." />
              <button onClick={togglePopup}>Notify Me</button>
            </div>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={togglePopup}>
              &times;
            </span>
            <h2>Thank you for subscribing!</h2>
            <p>You will be notified when Luxonik launches.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
