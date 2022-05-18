import { React, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck } from "../utils/api";
import CardList from "./Cards/CardList";

function DeckView() {
  const { deckId } = useParams();
  const [currentDeck, setDeck] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();

    const loadDeck = async () => {
      try {
        const deck = await readDeck(deckId, abortController.signal);
        setDeck(deck);
        setCards(deck.cards);
      } catch (error) {
        console.log(error.message);
      }
    };
    loadDeck();

    return () => abortController.abort;
  }, []);


  console.log(currentDeck, cards)

  if (!deckId) {
    return <h1>Loading...</h1>;
  } else {
    //const listCards = cards.map((card) => <Card card={card} />);
    
    return (
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {currentDeck.name}
            </li>
          </ol>
        </nav>
        <div className="container">
          <h2>{currentDeck.name}</h2>
          <p>{currentDeck.description}</p>
          <section className="d-flex">
            <Link to={`/decks/${currentDeck.id}/edit`}>
              <button className="btn btn-secondary d-flex" name="view">
                Edit
              </button>
            </Link>
            <Link to={`/decks/${currentDeck.id}/study`}>
              <button className="btn btn-primary d-flex" name="study">
                Study
              </button>
            </Link>
            <Link to={`/decks/${currentDeck.id}/cards/new`}>
              <button className="btn btn-primary d-flex" name="study">
                Add Cards
              </button>
            </Link>
            <button
              className="btn btn-danger"
              name="delete"
              onClick={() => console.log("TODO: delete deck")}
            >
              Delete
            </button>
          </section>
        </div>
        <br />
        <div className="container">
          <h2>Cards</h2>
          <div>
           
          </div>
        </div>
      </div>
    );
  }
}

export default DeckView;
