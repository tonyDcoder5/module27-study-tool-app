import React from "react";
import { useRouteMatch } from "react-router-dom";

/*
TODO:
create a breadcrumb navbar component that can be called on for each page, will take in the path/url for the route the page is on and generate a breadcrumb component containing each path for the specified page's route
*/
function NavBar () {

    const {path} = useRouteMatch();

    return(
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
      </div>
    )
}

export default NavBar;