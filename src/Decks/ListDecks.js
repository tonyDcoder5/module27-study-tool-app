import { React, useEffect, useState } from "react";
import { Route, Switch, Link } from "react-router-dom";
import Deck from "./Deck";
import Study from "./Study";

function ListDecks({deckList, deleteHandler}) {

  const list = deckList.map((deck) => {
    return <Deck key={deck.id} deck={deck} deleteHandler={deleteHandler} />;
  });

  return <div className="container">{list}</div>;
}

export default ListDecks;
