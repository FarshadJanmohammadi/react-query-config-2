import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getPosts, getTodos } from "../api/requests";
import { Link } from "react-router";
import Posts from "../components/Posts";

const Home = () => {
  const [showPostsCom, setShowPostsCom] = useState(true);

  return (
    <div>
      <button
        onClick={() => {
          setShowPostsCom((prev) => !prev);
        }}
      >
        Toggle Posts
      </button>
      {showPostsCom && <Posts />}
    </div>
  );
};

export default Home;
