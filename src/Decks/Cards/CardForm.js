import React from "react";
import { Link } from "react-router-dom";

export const CardForm = ({card, submitHandler, handleChange}) => {

  return (
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="card-front">Front</label>
          <br />
          <textarea
            className="form-control"
            type="text"
            name="front"
            id="front"
            placeholder="Card Front"
            value={card.front}
            onChange={handleChange}
            required = "true"
          />
          <br />
          <label htmlFor="card-back">Back</label>
          <br />
          <textarea
            className="form-control"
            type="text"
            name="back"
            id="back"
            placeholder="Card Back"
            value={card.back}
            onChange={handleChange}
            required = "true"
          />
          <br />
          <div className="btn-group-justified">
            <Link to={`/decks/${card.deckId}`}>
              <button className="btn btn-secondary">Done</button>
            </Link>
              <button className="btn btn-primary m-1" type="submit">
                Save
              </button>
          </div>
        </div>
      </form>
  );
};

export default CardForm;
