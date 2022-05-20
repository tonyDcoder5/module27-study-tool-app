import React from "react";
import { Link } from "react-router-dom";

export const DeckForm = ({ deck, submitHandler, handleChange }) => {
  if (!deck) {
    return <div>Loading Deck</div>;
  } else {
    return (
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="deck-name">Name</label>
          <br />
          <input
            required = "true"
            className="form-control"
            type="text"
            name="name"
            id="name"
            placeholder="Deck Name"
            value={deck.name}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="deck-desc">Description</label>
          <br />
          <textarea
            required = "true"
            className="form-control"
            type="text"
            name="description"
            id="description"
            placeholder="Brief Description of the deck"
            value={deck.description}
            onChange={handleChange}
          />
          <br />
          <div className="btn-group-justified">
            <Link to="/">
              <button className="btn btn-secondary">Cancel</button>
            </Link>
            <button
              className="btn btn-primary m-1"
              type="submit"
              onClick={submitHandler}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    );
  }
};

export default DeckForm;
