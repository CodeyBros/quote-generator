import "./App.css";
import {
  faCopy,
  faKiwiBird,
  faQuoteLeft,
  faQuoteRight,
  faVolumeUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [quotes, setQuotes] = useState("");

  function getQuote() {
    setIsLoading(true);

    fetch("https://type.fit/api/quotes")
      .then((response) => response.json())
      .then((data) => {
        let randomNum = Math.floor(Math.random() * data.length);
        setQuotes(data[randomNum]);
      })
      .catch((error) => console.log(error));

    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }
  const quoteText = quotes.text;

  useEffect(function () {
    getQuote();
  }, []);

  function TweetHandler() {
    let tweetUrl = `https://twitter.com/intent/tweet?url=${quoteText}`;
    window.open(tweetUrl, "_blank");
  }

  function CopyHandler() {
    navigator.clipboard.writeText(quoteText);
  }

  function SpeechHandler() {
    let utterance = new SpeechSynthesisUtterance();
    utterance.text = `${quoteText} by ${quotes.author}`;

    {
      !isLoading && window.speechSynthesis.speak(utterance);
    }
  }

  return (
    <div className="quote-wrapper">
      <header>Quote To Make Your Day...</header>
      <div className="quote-content">
        <div className="quote-area">
          <div className="fa">
            <FontAwesomeIcon icon={faQuoteLeft}></FontAwesomeIcon>
          </div>

          <p className="quote">{quoteText}</p>
          <div className="fa">
            <FontAwesomeIcon icon={faQuoteRight}></FontAwesomeIcon>
          </div>
        </div>
        <div className="author">
          <span>__</span>
          <span className="authors-name">{quotes.author}</span>
        </div>
        <div className="buttons">
          <div className="features">
            <ul>
              <li className="speech" title="Speech" onClick={SpeechHandler}>
                <FontAwesomeIcon icon={faVolumeUp}></FontAwesomeIcon>
              </li>
              <li className="copy" title="Copy" onClick={CopyHandler}>
                <FontAwesomeIcon icon={faCopy}></FontAwesomeIcon>
              </li>
              <li className="twitter" title="Twitter" onClick={TweetHandler}>
                <FontAwesomeIcon icon={faKiwiBird}></FontAwesomeIcon>
              </li>
            </ul>

            <button
              style={{
                opacity: isLoading ? "0.7" : "",
                pointerEvents: isLoading ? "none" : "",
              }}
              onClick={getQuote}
            >
              {isLoading ? "Loading Quote..." : "New Quote"}
            </button>
          </div>
        </div>
      </div>
      <div className="watermark">
        <span>&copy; CodeyBros</span>
      </div>
    </div>
  );
}

export default App;
