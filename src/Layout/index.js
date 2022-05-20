import React, { useEffect, useState } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import CreateBtn from "./CreateBtn";
import ListDecks from "../Decks/ListDecks";
import DeckView from "../Decks/DeckView";
import Study from "../Decks/Study";
import CreateDeck from "../Decks/CreateDeck";
import EditDeck from "../Decks/EditDeck";
import AddCard from "../Decks/Cards/AddCard";
import EditCard from "../Decks/Cards/EditCard";
import {
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
        setDeckList(...deckList, decks);
      } catch (error) {
        console.log(error.message);
      }
    };
    loadDecks();
    return () => abortController.abort;
  }, []);

  const callDelete = async (id) => {
    const abortController = new AbortController();
    
    try {
      setDeckList(deckList.filter((deck) => deck.id !== id));
      await deleteDeck(id, abortController.signal);
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
        : history.push("/")
    )
  {}
};
  if(!deckList){
    return  (
    <div className="container mb-5">
    <Header />
    <div>LOADING</div>
    </div>)
  }
  else{
  return (
    <div>
      <Header />
      <div className="container mb-5">
        <Switch>
          <Route exact path="/">
            <CreateBtn />
            <ListDecks deckList={deckList} deleteHandler={deleteHandler} />
          </Route>
          <Route exact path="/decks/new">
            <CreateDeck deckList={deckList} setDeckList={setDeckList} />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route exact path="/decks/:deckId">
            <DeckView deleteHandler={deleteHandler} />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>

    </div>
  );}
}

export default Layout;
