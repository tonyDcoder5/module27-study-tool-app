import React from "react";
import { Link } from "react-router-dom";

export const CreateBtn = () => {
  return (
    <div className="container mb-2">
      <Link to="/decks/new">
        <button type="button" className="btn btn-lg btn-primary">
          + Create Deck
        </button>
      </Link>
    </div>
  );
};

export default CreateBtn;
