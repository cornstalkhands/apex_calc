import React from "react";
import { useState, useEffect } from "react";
import Header from "./componets/Header";
import { Helmet } from "react-helmet";
import { charData } from "./CharData";
function App() {
  const [selectedChar, setChar] = useState(null);
  const [numKills, setNumKills] = useState("");
  const [kpd, setkpd] = useState("-");
  const [numDays, setNumDays] = useState("-");

  useEffect(() => {
    console.log(numKills);
    console.log(selectedChar);
    Calc();
  }, [numKills, selectedChar]);
  const WriteCon = () => {
    console.log(selectedChar);
  };

  const killsChanged = (e) => {
    var parsedNum;
    if (e === "") {
      parsedNum = 0;
    } else {
      var parsedNum = parseInt(e, 10);
    }
    if (isNaN(parsedNum)) {
      setNumKills(0);
    } else {
      setNumKills(parsedNum);
    }
  };

  const charChanged = (char) => {
    setChar(char);
  };

  const Calc = () => {
    if (selectedChar != null && numKills != "") {
      var today = new Date();
      var charDate = new Date(charData[selectedChar].rDate);

      var difference = today.getTime() - charDate.getTime();
      var differnceDays = difference / (1000 * 3600 * 24);
      setNumDays(Math.round(differnceDays * 10) / 10);
      setkpd(Math.round((numKills / differnceDays) * 10) / 10);
    }
  };

  return (
    <div className="App">
      <Helmet>
        <style>{"body { background-color: #383838; }"}</style>
      </Helmet>
      <Header />
      {/* <button onClick={WriteCon}>
        <img src={charData[0].imageLink} />
      </button> */}
      <div className="sep">
        {charData.slice(0, 6).map((item) => {
          return (
            <span className="container">
              <img className="charImage" src={item.imageLink}></img>
              <button
                className={
                  selectedChar === item.id
                    ? "selected_charButton"
                    : "charButton"
                }
                key={item.id}
                onClick={() => charChanged(item.id)}
              ></button>
            </span>
          );
        })}
      </div>
      <div className="sep2">
        {charData.slice(6, 12).map((item) => {
          return (
            <span className="container">
              <img className="charImage" src={item.imageLink}></img>
              <button
                className={
                  selectedChar === item.id
                    ? "selected_charButton"
                    : "charButton"
                }
                key={item.id}
                onClick={() => {
                  setChar(item.id);
                  Calc();
                }}
              ></button>
            </span>
          );
        })}
      </div>
      <div className="sep3">
        {charData.slice(12, 18).map((item) => {
          return (
            <span className="container">
              <img className="charImage" src={item.imageLink}></img>
              <button
                className={
                  selectedChar === item.id
                    ? "selected_charButton"
                    : "charButton"
                }
                key={item.id}
                onClick={() => {
                  setChar(item.id);
                  Calc();
                }}
              ></button>
            </span>
          );
        })}
      </div>
      <div className="sep4">
        {charData.slice(18, 23).map((item) => {
          return (
            <span className="container">
              <img className="charImage" src={item.imageLink}></img>
              <button
                className={
                  selectedChar === item.id
                    ? "selected_charButton"
                    : "charButton"
                }
                key={item.id}
                onClick={() => {
                  setChar(item.id);
                  Calc();
                }}
              ></button>
            </span>
          );
        })}
      </div>
      <label className="kills"> Number of kills</label>
      <input
        className="enter-kills"
        type="text"
        placeholder="10"
        value={numKills}
        onChange={(e) => killsChanged(e.target.value)}
      />
      <label className="out">
        {" "}
        Its been {numDays != "-" ? Math.round(numDays) : "-"} days since the
        release of {selectedChar != null ? charData[selectedChar].value : "-"}.
        <br />
        In that time they've gotten {kpd} kills per day on average. <br />
        In an 8 hour gaming session that is {kpd != "-" ? kpd / 8 : "-"} kills
        per hour every single day for{" "}
        {numDays != "-" ? Math.round(numDays) : "-"} days.
      </label>
    </div>
  );
}

export default App;
