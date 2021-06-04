import React, { useState } from "react";
import { spotifyApi } from "../api/spotifyApi";
import { Card, Button } from "react-bootstrap";

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

  const convertTime = (duration) => {
    var seconds = parseInt((duration / 1000) % 60),
      minutes = parseInt((duration / (1000 * 60)) % 60);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return minutes + ":" + seconds;
  };

  const RedirectToSpotify = (id) => {
    history.push("/spotify/" + id);
  };

  const GoBack = (id) => {
    history.push("/spotify/" + id);
  };

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
              <h6>Duration: {convertTime(track.duration_ms)}</h6>
            </Card.Title>
            <audio
              className="Audio-syle mx-auto"
              src={track.preview_url}
              controls
            ></audio>
            <Button
              className="GoToSpotify-button"
              onClick={() => RedirectToSpotify(track.id)}
              // variant="flat"
            >
              Listen on Spotify
            </Button>
            <Button
              className="GoBack-button"
              onClick={() => GoBack(track.id)}
              // variant="flat"
            >
              Go Back
            </Button>
          </Card.Body>
        </div>
      </Card>
    </div>
  );
};
