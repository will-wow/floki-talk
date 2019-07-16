import React, { useState } from "react";

const BestFriendFinder = () => {
  const [actor, setActor] = useState("Chris Evans");
  const [movieCount, setMovieCount] = useState(4);
  const [friends, setFriends] = useState([]);
  const [error, setError] = useState(null);

  const handleActorChange = event => setActor(event.target.value);
  const handleCountChange = event => {
    const value = event.target.value ? parseInt(event.target.value) : "";
    setMovieCount(value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    if (!actor || !movieCount) return;

    setFriends([]);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:4000/api/best_friends?actor=${actor}&movie_count=${movieCount}`
      );

      const { friends } = await response.json();
      setFriends(friends);
    } catch (e) {
      setError(e.message);
    }
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

        {error && <div style={{ color: "red" }}>{error}</div>}

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
