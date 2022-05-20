import React, { useState } from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";

function Deck({ deck, deleteHandler }) {

  if(!deck){
    return <div>Loading Deck</div>
  }
  else{
  return (
    <article className=" m-auto align-self-stretch">
      <div className="border p-4 h-100 d-flex flex-column">
        <div className="row">
          <h2 className="col-8">{deck.name}</h2>
          {deck.cards && <p className="col-4 text-right">
            {deck.cards.length} card{deck.cards.length !== 1 && `s`}
          </p>}
          {!deck.cards && <p className="col-4 text-right">
            0 cards
          </p>}
        </div>
        <div><p>{deck.description}</p></div>
        <div className="row btn-group">
          <div className="col-10">
            <Link to={`/decks/${deck.id}`}>
              <button className="btn btn-secondary" name="view">
              🔎 View
              </button>
            </Link>
            <Link to={`/decks/${deck.id}/study`}>
              <button className="btn btn-info" name="study">
              📖 Study
              </button>
            </Link>      
          <span >
              <button
            className="btn btn-danger"
            name="delete"
            onClick={() => deleteHandler(deck.id)}>✖️</button>
          </span>
        </div>
        </div>
      </div>
    </article>
  );}
}

export default Deck;
