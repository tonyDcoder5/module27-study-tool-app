import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import { readDeck, readCard } from "../utils/api";

function Study() {
  const [deck, setDeck] = useState();
  const [side, setSide] = useState(false);
  const [count, setCount] = useState(0);
  const history = useHistory();
  const { deckId } = useParams();

  const flipSide = () => {
    setSide(!side);
  };

  function restart() {
    setCount(0);
    flipSide();
  }

  function nextCard() {
    let counter = count;
    if (count >= deck.cards.length - 1) {
      if (
        window.confirm(
          `Restart cards?\n\nClick cancel to return to the Home page.`
        )
          ? restart()
          : history.push("/")
      );
    } else {
      setCount(counter + 1);
      flipSide();
    }
  }

  useEffect(() => {
    const abortController = new AbortController();

    const loadDeck = async () => {
      try {
        const currentDeck = await readDeck(deckId, abortController.signal);
        setDeck(currentDeck);
      } catch (error) {
        console.log(error.message);
      }
    };
    loadDeck();

    return () => abortController.abort;
  }, []);

  if (!deck) {
    return (
      <div>
        <h2>Loadingggg</h2>
      </div>
    );
  } else if (deck.cards.length < 3) {
    return (
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Study
            </li>
          </ol>
        </nav>
        <div>
          <h1>Study: {deck.name}</h1>
          <h2>Not enough cards.</h2>
          <span>
            You need at least 3 cards to study. There are {deck.cards.length}{" "}
            card(s) in this deck.
          </span>
          <div className="mt-3">
            <Link to={`/decks/${deck.id}/cards/new`}>
              <button className="btn btn-primary">+ Add Cards</button>
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Study
            </li>
          </ol>
        </nav>
        <div>
          <h1>Study: {deck.name}</h1>
        </div>

        <div className="card">
          <div className="m-3">
            <h4>
              Card {count + 1} of {deck.cards.length}
            </h4>
            <div className="mt-2">
              {!side && <span>{deck.cards[count].front}</span>}
              {side && <span>{deck.cards[count].back}</span>}
            </div>
            <div className="mt-3">
              <button className="btn btn-secondary" onClick={flipSide}>
                Flip
              </button>
              {side && (
                <button className="btn btn-primary ml-1" onClick={nextCard}>
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Study;
