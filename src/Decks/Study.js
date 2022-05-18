import { React, useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, readCard } from "../utils/api";

function Study() {
  const [deck, setDeck] = useState();
  const [cards, setCards] = useState();
  const [card, setCard] = useState();
  const history = useHistory();
  const { deckId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();

    const loadDeck = async () => {
      try {
        const currentDeck = await readDeck(deckId, abortController.signal);
        setDeck(currentDeck);
        setCards(currentDeck.cards);
        // history.push(`/decks/${currentDeck.id}/study`);
      } catch (error) {
        console.log(error.message);
      }
    };
    loadDeck();

    return () => abortController.abort;
  }, []);

  console.log(deck, cards);

  useEffect(() => {
    const abortController = new AbortController();

    const loadCard = async (card) => {
      try {
        const currentCard = await readCard(card.id, abortController.signal);
        setCard(currentCard);
      } catch (error) {
        console.log(error.message);
      }
    };

    return () => abortController.abort;
  }, [card]);

  if (!deck) {
    return (
      <div>
        <h2>Loadingggg</h2>
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
          <article>
            Card {} of {deck.cards.length}
            Card Face
          </article>
          Flip Button
        </div>
      </div>
    );
  }
}

export default Study;
