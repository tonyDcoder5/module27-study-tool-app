import { React, useEffect, useState } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import CreateBtn from "./CreateBtn";
import ListDecks from "../Decks/ListDecks";
import CreateDeck from "../Decks/CreateDeck";
import DeckView from "../Decks/DeckView";
import Study from "../Decks/Study";
import {
  createDeck,
  readDeck,
  updateDeck,
  deleteDeck,
  listDecks,
} from "../utils/api/index";
import { Switch, Route, useHistory } from "react-router-dom";

function Layout() {
  
  const [deckList, setDeckList] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();

    const loadDecks = async () => {
      try {
        const decks = await listDecks(abortController.signal);
        setDeckList(decks);
      } catch (error) {
        console.log(error.message);
      }
    };
    loadDecks();
    return () => abortController.abort;
  }, []);

  const callDelete = async (id) => {
    const abortController = new AbortController();
    console.log("deleting", id);
    try {
      await deleteDeck(id, abortController.signal);
      setDeckList(deckList.filter((deck) => deck.id !== id));
      history.push("/");
    } catch (error) {
      console.log(error.message);
    }

    return () => abortController.abort;
  };

  const deleteHandler = (id) => {
    if (
      window.confirm(
        `Delete this deck? ${id}\n\nYou will not be able to recover it.`
      )
        ? callDelete(id)
        : console.log("cancelled")
    )
      console.log("deleted", id);
  };

  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path="/">
            <CreateBtn />
            <ListDecks deckList={deckList} deleteHandler={deleteHandler} />
          </Route>
          <Route path="/decks/new">
            <CreateDeck deckList={deckList} />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path="/decks/:deckId">
            <DeckView deleteHandler={deleteHandler}/>
          </Route>
          {/* <Route path="/decks/:deckId/edit">
            <DeckEdit />
          </Route> */}
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
      <footer>
        <div>
          <br />
          <br />
          <br />
          <br />
        </div>
      </footer>
    </>
  );
}

export default Layout;
