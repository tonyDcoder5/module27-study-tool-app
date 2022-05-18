import { React, useState } from "react";
import { Link } from "react-router-dom";

export const CreateDeck = () => {
  /*
    TODO:
    pass on form data to DeckView component to add/edit cards on new deck
*/

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
  });

  const handleChange = (event) =>
    setFormData({ ...formData, [event.target.name]: event.target.value });

  const submitHandler = (event) => {
    event.preventDefault();
    setFormData({ ...formData, id: Date.now() });

    //setFormData({...formData, id: }) add an id prop for each new deck created in order to navigate to a new Deck view page
    // submit formData as a Deck object to the DeckView component and navigate user to view page to add cards

    console.log(formData);
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
      <label htmlFor="create-deck-form">
        <h2>Create Deck</h2>
      </label>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="deck-name">Name</label>
          <br />
          <input
            className="form-control"
            type="text"
            name="name"
            id="name"
            placeholder="Deck Name"
            value={formData.name}
            onChange={handleChange}
          ></input>
          <br />
          <label htmlFor="deck-desc">Description</label>
          <br />
          <textarea
            className="form-control"
            type="text"
            name="description"
            id="description"
            placeholder="Brief Description of the deck"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
          <br />
          <div className="btn-group-justified">
            <Link to="/">
              <button className="btn btn-secondary">Cancel</button>
            </Link>
            <Link to={`/decks/${formData.id}`}>
              <button className="btn btn-primary m-1" type="submit">
                Submit
              </button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateDeck;
