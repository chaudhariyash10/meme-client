import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MemeCollection.styles.css"
function MemeCollections() {
  const token = window.localStorage.getItem("token");
  let [loaded, setloaded] = useState(false);
  let [memeurls, setMemeurls] = useState();
  useEffect(() => {
    const data = { token };
    axios
      .post("http://localhost:5000/user", data)
      .then((res) => {
        return res.data.username;
      })
      .then((username) => {
        const data = { username };
        // console.log(username);
        axios
          .post("http://localhost:5000/get-memes", data)
          .then((res) => {
            return res.data;
          })
          .then((res) => {
            setMemeurls(res);
            setloaded(true);
          })
          .catch((err) => {
            console.log(err);
          });
      });
  }, []);
  return (
    <div className="store">
      <div className="store-meme-image-container">   
        {loaded &&
          Array(memeurls.length)
            .fill(null)
            .map((n, idx) => (
                <img className = "stored-meme-image"src={memeurls[idx]} alt="url" />
        ))}
      </div>
      {!loaded && <div className="container">Loading saved Memes...</div>}
    </div>
  );
}

export default MemeCollections;
