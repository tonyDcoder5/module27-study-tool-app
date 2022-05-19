import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../../utils/api";
import CardForm from "./CardForm";

export const EditCard = () => {
  const { deckId, cardId } = useParams();
  const history = useHistory();

  const initCard = {
    id: cardId,
    front: "",
    back: "",
    deckId: deckId,
}

  const [deck, setDeck] = useState({});
  const [card, setCard] = useState(initCard)

  useEffect(() => {
    const abortController = new AbortController();

    const loadCard = async () => {
      try {
        const deckFetch = await readDeck(deckId);
        setDeck(deckFetch);
        const cardFetch = await readCard(cardId, abortController.signal); 
        setCard(cardFetch);
      } catch (error) {
        console.log(error.message);
      }
    };
    loadCard();
    return () => abortController.abort;
  }, [cardId]);

  const handleChange = (event) =>
    setCard({ ...card, [event.target.name]: event.target.value });

  const submitHandler = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    try{
        await updateCard(card, abortController.signal);
        history.push(`/decks/${deckId}`)
    }
    catch(error){
        console.log(error.message)
    }
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
                <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Edit Card {cardId}
              </li>
            </ol>
          </nav>
          <label htmlFor="create-deck-form">
            <h2>Edit Card</h2>
          </label>
          <CardForm
            card={card}
            handleChange={handleChange}
            submitHandler={submitHandler}
          />
        </div>
      );
  } else { 
      return <h1>Loading</h1>;
   
  }
};

export default EditCard;
