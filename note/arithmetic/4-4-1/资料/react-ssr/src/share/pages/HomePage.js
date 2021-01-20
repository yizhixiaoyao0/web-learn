import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

function HomePage() {
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="Home Page description"></meta>
      </Helmet>
      <div onClick={() => console.log("hello react ssr")}>
        HomePage works
        <Link to="/list">Go to ListPage</Link>
      </div>
    </>
  );
}

export default HomePage;
