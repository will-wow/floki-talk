import React, { useState } from "react";

const BestFriendFinder = () => {
  const [actor, setActor] = useState("Chris Evans");
  const [movieCount, setMovieCount] = useState(4);
  const [friends, setFriends] = useState([]);

  const handleActorChange = event => setActor(event.target.value);
  const handleCountChange = event => {
    const value = parseInt(event.target.value || "0");
    setMovieCount(value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    if (!actor || !movieCount) return;

    const response = await fetch(
      `http://localhost:4000/api/best_friends?actor=${actor}&movie_count=${movieCount}`
    );

    const { friends } = await response.json();
    setFriends(friends);
  };

  return (
    <div>
      Best Friend Finder
      <form onSubmit={handleSubmit}>
        <input
          value={actor}
          onChange={handleActorChange}
          placeholder="actor"
          style={{ marginRight: "0.5rem", fontSize: "0.5em" }}
        />
        <input
          type="number"
          value={movieCount}
          onChange={handleCountChange}
          style={{ marginRight: "0.5rem", fontSize: "0.5em" }}
        />
        <button type="submit" style={{ fontSize: "0.5em" }}>
          Submit
        </button>

        {friends.map(({ actor, count }) => (
          <div key={actor}>
            {actor}: {count}
          </div>
        ))}
      </form>
    </div>
  );
};

export default BestFriendFinder;
