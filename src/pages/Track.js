import React, { useState } from "react";
import { spotifyApi } from "../api/spotifyApi";
import { Card } from "react-bootstrap";

import "./Track.scss";

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
    <div className="Card-style d-flex justify-content-center">
      <Card
        alignment="center"
        bg="dark"
        text="white"
        style={{
          width: "25rem",
        }}
      >
        <div>
          <Card.Body className="Card-body-style d-flex flex-column justify-content-center">
            <Card.Img
              // className="Img-style justify-content-center"
              className="Img-style w-50 mx-auto"
              variant="top"
              // alignment="center"
              alt={track.name}
              src={track.album.images[0].url}
            ></Card.Img>
            <Card.Title className="Text-style">
              <h6>Track Name: {track.name}</h6>
              <h6>Artist: {track.artists[0].name}</h6>
            </Card.Title>
            <audio
              className="Audio-syle mx-auto"
              src={track.preview_url}
              controls
            ></audio>
          </Card.Body>
        </div>
      </Card>
    </div>
  );
};
