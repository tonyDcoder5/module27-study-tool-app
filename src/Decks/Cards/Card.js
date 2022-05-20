import React from "react";
import { Link } from "react-router-dom";


export default function Card({card, cardDelete}) {

    const cardDeleteHandler = (id) => {
        if (
          window.confirm(
            `Delete this card? ${id}\n\nYou will not be able to recover it.`
          )
            ? cardDelete(id)
            : console.log("cancelled")
        )
          console.log("deleted", id);
      };
    

    return (
        <div key={card.id} className="card row d-flex">
          <div className="col-6">
            {card.front}
            </div>
          <div className="col-6">
          {card.back} 
            <div>
            <Link to={`/decks/${card.deckId}/cards/${card.id}/edit`}><button className="btn btn-secondary">Edit</button></Link>
            <button
            className="btn btn-danger"
            name="delete" onClick={()=> cardDeleteHandler(card.id)}
            >✖️</button>
            </div>
            </div>
          </div>
    );
  };
