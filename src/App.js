import React from "react";
import { useState, useEffect } from "react";
import Header from "./componets/Header";
import { Helmet } from "react-helmet";
import { charData, classData, assultData,controllerData,reconData,skirmisherData,supportData } from "./CharData";
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
        <img className="classImageAss" src={classData[0].imageLink}></img>
        {assultData.map((item) => {
          return (
              <button
                className={
                  selectedChar === item.id
                    ? "selected_charButtonAss"
                    : "charButtonAss"
                }
                key={item.id}
                onClick={() => charChanged(item.id)}
              ></button>
          );
        })}
      </div>
      <div className="sep2">
      <img className="classImageCon" src={classData[1].imageLink}></img>
        {controllerData.map((item) => {
          return (
              <button
                className={
                  selectedChar === item.id
                    ? "selected_charButtonCon"
                    : "charButtonCon"
                }
                key={item.id}
                onClick={() => charChanged(item.id)}
              ></button>
          );
        })}
      </div>
      <div className="sep3">
      <img className="classImageRec" src={classData[2].imageLink}></img>
        {reconData.map((item) => {
          return (
              <button
                className={
                  selectedChar === item.id
                    ? "selected_charButtonRec"
                    : "charButtonRec"
                }
                key={item.id}
                onClick={() => charChanged(item.id)}
              ></button>
          );
        })}
      </div>
      <div className="sep4">
      <img className="classImageSkirm" src={classData[3].imageLink}></img>
        {skirmisherData.map((item) => {
          return (
              <button
                className={
                  selectedChar === item.id
                    ? "selected_charButtonSkirm"
                    : "charButtonSkirm"
                }
                key={item.id}
                onClick={() => charChanged(item.id)}
              ></button>
          );
        })}
      </div>
      <div className="sep5">
      <img className="classImageSup" src={classData[4].imageLink}></img>
        {supportData.map((item) => {
          return (
              <button
                className={
                  selectedChar === item.id
                    ? "selected_charButtonSup"
                    : "charButtonSup"
                }
                key={item.id}
                onClick={() => charChanged(item.id)}
              ></button>
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
