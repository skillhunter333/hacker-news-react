import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [topic, setTopic] = useState("");

  //Here we took the API and added our own key in it. Where it says location, we added ${} to make that data dynamic.
  const url = `http://hn.algolia.com/api/v1/search?query=${topic}`;

  //If the search topic is entered and enter button pressed, get data from the API:
  const searchTopic = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      //this is emtying the searchbar after we pressed enter
      setTopic("");
    }
  };

  return (
    <div className="app">
      <div>
        <div>
          <ul className="nav-bar">
            <li><a href="#" id="navbarfirst">Hacker News</a></li>
            <li><a href="#">new</a></li>
            <li><a href="#">past</a></li>
            <li><a href="#">comments</a></li>
            <li><a href="#">ask</a></li>
            <li><a href="#">show</a></li>
            <li><a href="#">jobs</a></li>
            <li><a href="#">submit</a></li>
            <li><a href="#">login</a></li>
          </ul>
        </div>

        <div className="news">
          <ol>
            <li>
              <a href="#">Web fingerprinting is worse than I thought</a>
            </li>
            <li>
              <a href="#">Zero-1-to-3: Zero-shot One Image to 3D Object</a>
            </li>
          </ol>
        </div>

        <span className="horizontalLine"></span>

        <div className="bottom">
          <div>
          <p id="bottomp">Applications are open for YC Summer 2023</p>
          </div>

          <div className="aboutUs nav-bar" id="aboutUs">
          <ul>
            <li><a href="#">Guidelines</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Lists</a></li>
            <li><a href="#">API</a></li>
            <li><a href="#">Security</a></li>
            <li><a href="#">Legal</a></li>
            <li><a href="#">Apply to YC</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
          </div>

        <div className="search">
          <p id="Search-text">Search:</p>
          <input
            value={topic}
            onChange={(event) => setTopic(event.target.value)}
            onKeyUp={searchTopic}
            placeholder="Enter Topic"
            type="text"
          />
        </div>
        </div>

      </div>
    </div>
  );
}

export default App;
