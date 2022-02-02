import React, { useState } from "react";
import { Navigate } from "react-router";
import Meme from "./Meme";
import MemeCollections from "./MemeCollections";
import "./switchtabs.styles.css";

function SwitchTabs() {
  const [showCollections, setShowCollections] = useState(false);
  let [usertoken, setUsertoken] = useState(window.localStorage.getItem('token'));

  const logout = () => {
    // token = null;
    setUsertoken(null)
    window.localStorage.removeItem('token');
  }

  return (
    <div>
      {usertoken === null && <Navigate to="/" />}
      {usertoken !== null && (
        <div>
          <h1 className="title">Meme Generator</h1>
          <div>
            <button className="glow-on-hover left-align" onClick={logout}>Log Out</button>
          </div>
          <div className="tabs">
            <div className="tab-buttons">
              <button
                className={showCollections ? "buttons" : "buttons active"}
                onClick={() => setShowCollections(false)}
              >
                Create A Meme
              </button>
              <button
                className={showCollections ? "buttons active" : "buttons"}
                onClick={() => setShowCollections(true)}
              >
                My Collection
              </button>
            </div>
            <div className="tab-content">
              {!showCollections && <Meme />}
              {showCollections && <MemeCollections />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SwitchTabs;
