import { React, useEffect, useState } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import CreateBtn from "./CreateBtn";
import ListDecks from "../Decks/ListDecks";
import CreateDeck from "../Decks/CreateDeck";
import DeckView from "../Decks/DeckView";
import Study from "../Decks/Study"
import {
  createDeck,
  readDeck,
  updateDeck,
  deleteDeck,
} from "../utils/api/index";
import { Switch, Route } from "react-router-dom";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}

        <Switch>
          <Route exact path="/">
            <CreateBtn />
            <ListDecks />
          </Route>
          <Route path="/decks/new">
            <CreateDeck />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path="/decks/:deckId">
            <DeckView />
          </Route>
          {/* <Route path="/decks/:deckId/edit">
            <DeckEdit />
          </Route> */}
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
