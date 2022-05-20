import React from "react";
import Deck from "./Deck";

function ListDecks({deckList, deleteHandler}) {
  
  const list = deckList.map((deck) => 
  {
    return <Deck key={deck.id} deck={deck} deleteHandler={deleteHandler} />;
  });

  if(!list){
    return <h1>Loading</h1>
  }
  else{
  return <div className="container">{list}</div> }
}

export default ListDecks;
