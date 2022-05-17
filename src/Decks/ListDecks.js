import { React, useEffect, useState } from "react";
import { Route, Switch, Link } from "react-router-dom";
import Deck from "./Deck";
import { listDecks, deleteDeck } from "../utils/api/index";
import Study from "./Study";

function ListDecks() {
  const [deckList, setDeckList] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();

    const loadDecks = async () => {
      try {
        const decks = await listDecks(abortController.signal);
        setDeckList(decks);
      } catch (error) {
        console.log(error.message);
      }
    };
    loadDecks();
    return () => abortController.abort;
  }, []);

  const deleteHandler = (id) => {
      window.confirm("Delete this deck?\n\nYou will not be able to recover it.")
      console.log("TODO: call deleteDeck function and rerender page->")
  }


  const list = deckList.map((deck) => {

    return <Deck key={deck.id} deck={deck} deleteHandler={deleteHandler}/>;
  });


  return <div className="container">
      {list}
      </div>;
}

export default ListDecks;
