import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api";
import DeckForm from "./DeckForm";

export const CreateDeck = ({ deckList, setDeckList }) => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleChange = (event) =>
    setFormData({ ...formData, [event.target.name]: event.target.value });

  const submitHandler = async (event) => {
    event.preventDefault();
    const abortController = new AbortController(); 

    try{
      const newDeck = await createDeck(formData, abortController.signal);
      setDeckList([...deckList, newDeck])
      history.push(`/decks/${newDeck.id}`);
  }
  catch(error){
      console.log(error.message)
  }
  };

  return (
    <div className="container">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>

      <label htmlFor="create-deck-form">
        <h2>Create Deck</h2>
      </label>
      <DeckForm
        deck={formData}
        handleChange={handleChange}
        submitHandler={submitHandler}
      />
    </div>
  );
};

export default CreateDeck;
