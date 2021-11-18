import { useState } from "react";
import { spotifyApi } from "../../api/spotifyApi";
import { InputField } from "../../components";
import SpotifyLogin from "react-spotify-login";
import {
  Button,
  Navbar,
  CardDeck,
  Card,
  Alert,
  Spinner,
} from "react-bootstrap";
import { useLocation, useHistory } from "react-router-dom";

// media
import logo from "../../assets/images/logo.png";

// styles
import "./Home.scss";

const storeAuth = (userData) => {
  const { access_token, expires_in, token_type } = userData;
  localStorage.setItem("access_token", access_token);
  localStorage.setItem("expires_in", expires_in);
  localStorage.setItem("token_type", token_type);
};

const getAuthData = () => {
  return {
    access_token: localStorage.getItem("access_token"),
    expires_in: localStorage.getItem("expires_in"),
    token_type: localStorage.getItem("token_type"),
  };
};

const resetAuthData = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("expires_in");
  localStorage.removeItem("token_type");
};

function Home() {
  const location = useLocation();
  const history = useHistory();

  const [search, setSearch] = useState(location.search.split("=")[1]);
  const userData = getAuthData();
  const [access, setAccess] = useState(userData);
  const [isNotFound, setIsNotFound] = useState(false);
  const [show, setShow] = useState({
    loading: false,
    tracks: [],
  });

  const fetchSong = async (searchStr) => {
    try {
      setShow({
        ...show,
        loading: true,
      });
      setIsNotFound(false);
      const res = await spotifyApi.search(searchStr, access);
      console.log({res});
      setIsNotFound(!res.tracks.items.length);
      setShow({
        ...show,
        tracks: res.tracks,
        loading: false,
      });
    } catch (e) {
      alert(e)
      // console.error(e);
    }
  };

  const onChange = (event) => {
    setSearch(event.target.value);
  };
  const onSearchStart = (event) => {
    event.preventDefault();
    if (!search) {
      return;
    }
    history.push({
      pathname: "/",
      search: `?seach=${search}`,
    });
    fetchSong(search);
  };

  const logout = () => {
    resetAuthData();
    setAccess(getAuthData());
  };

  const onTrackRedirect = (id) => {
    history.push("/tracks/" + id);
  };

  return (
    <div>
      <header className="Log-button">
        <Navbar expand="sm" className="navbar-style">
          {access.access_token ? (
            <Button variant="danger" onClick={() => logout()}>
              Logout
            </Button>
          ) : (
            <SpotifyLogin
              clientId={"2c0f0ec6214c4b9aa72ab17b8d613c6d"}
              className="Login-button"
              redirectUri={window.origin}
              onSuccess={function (Success) {
                setAccess(Success);
                storeAuth(Success);
                // service to store auth data locally
              }}
              onFailure={(Fail) => {
                // console.log(Fail);
                // service to remove auth data from localStorage
                alert(Fail);
              }}
            />
          )}
        </Navbar>
      </header>

      <div className="Main-app">
        <div className="Logo-components">
          <img src={logo} className="App-logo" alt="logo" />
          <div className="App-name">
            <p>
              <a
                className="App-link"
                href="https://any-api.com/spotify_com/spotify_com/docs/API_Description"
                rel="noreferrer"
                target="_blank"
              >
                Spotify Surfing
              </a>
            </p>
          </div>
        </div>

        <div>
          <form onSubmit={(e) => onSearchStart(e)}>
            <InputField onChange={onChange} value={search} />
            <h6 className="Help-text">Enter search query</h6>
            <Button type={"submit"} variant="outline-success" className="Button-search">Search</Button>
          </form>
        </div>
        {
          !show.tracks && search && isNotFound
            ? <Alert variant="info">
              <Alert.Heading>Info message</Alert.Heading>
              <p>
                There is no song with this name
              </p>
            </Alert>
            : null
        }
        {
          show.loading
            ? <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
            : null
        }

        {!access.access_token && search ? (
          <Alert variant="danger">
            <Alert.Heading>Authorization error!</Alert.Heading>
            <p>You are not logged in. Please login and try again.</p>
          </Alert>
        ) : null}
        <div className="App-content">
          <CardDeck>
            {show.tracks.items
              ? show.tracks.items.map((item) => {
                  return (
                    <div key={item.id}>
                      <Card bg="dark" text="white" style={{width: "14rem", marginBottom: "1em",}}>
                        <Card.Body>
                          <Card.Img variant="top" alt={item.name} src={item.album.images[0].url}></Card.Img>
                          <Card.Title className="Text-Style">
                            <h4>{item.name}</h4>
                          </Card.Title>
                          <Button className="btn-block Info-button" onClick={() => onTrackRedirect(item.id)}>Info
                          </Button>
                        </Card.Body>
                      </Card>
                    </div>
                  );
                })
              : null}
          </CardDeck>
        </div>
      </div>
    </div>
  );
}

export { Home };
