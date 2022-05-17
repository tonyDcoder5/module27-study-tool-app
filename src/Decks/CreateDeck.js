import { React, useState } from "react";
import { Link } from "react-router-dom";

export const CreateDeck = () => {
  /*
    TODO:
    add eventhandlers for form submission
    add useHistory in order to link Cancel button with home page
    pass on form data to DeckView component to add/edit cards on new deck
*/

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleChange = (event) =>
    setFormData({ ...formData, [event.target.name]: event.target.value });

  const submitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className="container">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="create-deck-form">
            <h2>+ Create Deck</h2>
          </label>
          <br />
          <label htmlFor="deck-name">Name</label>
          <br />
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Deck Name"
            value=""
            onChange={handleChange}
          ></input>
          <br />
          <label htmlFor="deck-desc">Description</label>
          <br />
          <textarea
            type="text"
            name="description"
            id="description"
            placeholder="Brief Description of the deck"
            value=""
            onChange={handleChange}
          ></textarea>
          <br />
          <button className="btn btn-secondary">Cancel</button>
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateDeck;
