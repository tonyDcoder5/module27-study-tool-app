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
        setCards(currentDeck.cards)
        history.push(`/decks/${currentDeck.id}/study`)
      } catch (error) {
        console.log(error.message);
      }
    };
    loadDeck();

    return () => abortController.abort;
  }, []);

  useEffect(()=> {
    const abortController = new AbortController();

    const loadCard = async () => {
        // const cards = deck.cards;
      try {
        // const currentCard = await readCard(cardId, abortController.signal);
        // setCard(currentCard);
      } catch (error) {
        console.log(error.message);
      }
    };
    loadCard();

    return () => abortController.abort;
  }, [])

  //console.log(cards)


  if(!deck){
      return (
          <div>
              <h2>Loadingggg</h2>
          </div>
      )
  }
  else {
  return (
    <div className="container">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/">{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>

      <h1>Study: {deck.name}</h1>
      <br />
      <div className="card">
          <table>
              <thead>
                  Card {} of {deck.cards.length}
                </thead>
              <tbody>
                  <tr><td>{deck.card}</td></tr>
                  <tr><td>Flip</td></tr>
              </tbody>
          </table>
      </div>
    </div>
  );
}
}

export default Study;
