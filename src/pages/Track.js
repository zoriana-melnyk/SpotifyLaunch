import React, { useState } from "react";
import { spotifyApi } from "../api/spotifyApi";
import {
  Button,
  Navbar,
  CardDeck,
  Card,
  Alert,
  Spinner,
} from "react-bootstrap";

export const Track = ({ history }) => {
  const [track, setTrack] = useState({});
  const tracksId = history.match.params.id;
  const access_token = localStorage.getItem("access_token");

  const fetchTrack = async () => {
    const data = await spotifyApi.tracksIdSearch(tracksId, access_token);
    if (data) {
      setTrack(data);
    }
  };

  React.useEffect(() => {
    fetchTrack();
  }, []);

  if (!track.name) {
    return <h1>Loading...</h1>;
  }

  return (
    <Card>
      <div>
        <Card.Body>
          <Card.Img
            className="w-50"
            variant="top"
            alt={track.name}
            src={track.album.images[0].url}
          ></Card.Img>
          <Card.Title>
            <h3>{track.name}</h3>
          </Card.Title>
          <audio src={track.preview_url} controls>
            sdgsdf
          </audio>
        </Card.Body>
      </div>
    </Card>
  );
};
