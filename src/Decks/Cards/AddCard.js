import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck, createCard } from "../../utils/api";
import CardForm from "./CardForm";

export const AddCard = () => {
  const { deckId } = useParams();

  const newCard = {
    front: "",
    back: "",
    deckId: deckId,
  }
  const [deck, setDeck] = useState()
  const [formData, setFormData] = useState(newCard);
  const [cards, setCards] = useState();


  useEffect(() => {
    const abortController = new AbortController();

    const loadDeck = async () => {
      try {
        const deckFetch = await readDeck(deckId, abortController.signal);
        setDeck(deckFetch);
      } catch (error) {
        console.log(error.message);
      }
    };
    loadDeck();
    return () => abortController.abort;
  }, []);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    try{
        await createCard(deckId, formData, abortController.signal);
        setFormData(newCard);        
        setCards(formData)
    }
    catch(error){
        console.log(error.message)
    }
  };

  if(deck){
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
            Add Card
          </li>
        </ol>
      </nav>

      <label htmlFor="create-deck-form">
        <h2>{deck.name}: Add Card</h2>
      </label>
      <CardForm
        card={formData}
        handleChange={handleChange}
        submitHandler={submitHandler}
      />
    </div>
  );}
  else{
      return <h1>LOADING</h1>
  }
};

export default AddCard;
