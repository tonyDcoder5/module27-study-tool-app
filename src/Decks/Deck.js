import { React, useState } from "react";
import { Link, useHistory } from "react-router-dom";

function Deck({ deck, deleteHandler }) {

  return (
    <article className=" m-auto align-self-stretch">
      <div className="border p-4 h-100 d-flex flex-column">
        <div className="row">
        <h2 className="col-8">{deck.name}</h2>
        <p className="col-4 text-right">{deck.cards.length} card{deck.cards.length !== 1 && `s`}</p>
        </div>
        <p>{deck.description}</p>
        <div className="row">
        <div className="col-11">
        <Link to={`/decks/${deck.id}`}><button className="btn btn-secondary" name="view">View</button></Link>
        <Link to={`/decks/${deck.id}/study`}><button className="btn btn-primary" name="study">Study</button></Link>
        </div>
        <button className="btn btn-danger col-1" name="delete" onClick={()=> deleteHandler(deck.id)}>Delete</button>
      </div>
      </div>
    </article>
  );
}

export default Deck;
