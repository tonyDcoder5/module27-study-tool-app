import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";
import DeckForm from "./DeckForm";

export const EditDeck = () => {
  const { deckId } = useParams();
  const history = useHistory();

  const [deckName, setDeckName] = useState("")
  const [deck, setDeck] = useState({
      id: "",
      name: "",
      description: "",
  });

  useEffect(() => {
    const abortController = new AbortController();

    const loadDeck = async () => {
      try {
        const deckFetch = await readDeck(deckId, abortController.signal);
        setDeck(deckFetch);
        setDeckName(deckFetch.name)
      } catch (error) {
        console.log(error.message);
      }
    };
    loadDeck();
    return () => abortController.abort;
  }, [deckId]);

  const handleChange = (event) =>
    setDeck({ ...deck, [event.target.name]: event.target.value });

  const submitHandler = (event) => {
    event.preventDefault();
    updateDeck(deck);
    
    history.push(`/decks/${deck.id}`)
  };

  if (deck) {
    return (
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to={`/decks/${deck.id}`}>{deckName}</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Edit Deck
              </li>
            </ol>
          </nav>
          <label htmlFor="create-deck-form">
            <h2>Edit Deck</h2>
          </label>
          <DeckForm
            deck={deck}
            handleChange={handleChange}
            submitHandler={submitHandler}
          />
        </div>
      );
  } else { 
      return <h1>Loading</h1>;
  }
};

export default EditDeck;
