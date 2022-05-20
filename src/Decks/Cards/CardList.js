import React from "react";
import { useHistory, useParams } from "react-router-dom";
import Card from "./Card";
import { deleteCard, readDeck } from "../../utils/api";

export default function CardList({ cards = [] , setDeck }) {
  const { deckId } = useParams();
  const history = useHistory();

  const cardDelete = async (id) => {
    const abortController = new AbortController();
    try {
      await deleteCard(id, abortController.signal);
      const deck = await readDeck(deckId, abortController.signal);
      setDeck(deck);
      history.push(`/decks/${deckId}`);
    } 
    catch (error) {
      console.log(error.message);
    }

    return () => abortController.abort;
  };


  const list = cards.map((card) => {
    return <Card key={card.id} card={card} cardDelete={cardDelete} />;
  });

  return <div>{list}</div>;
}
