import { api, REQUEST_METHODS } from "./api";

const baseUrl = "/v1/search";

const spotifyApi = {
  search: (str, access) => {
    return api.request({
      url: `${baseUrl}`,
      method: REQUEST_METHODS.get,
      headers: {
        Authorization: `Bearer ${access.access_token}`,
      },
      params: {
        q: str,
        type: "track",
      },
    });
  },
  tracksIdSearch: (id, access_token) => {
    return api.request({
      url: `/v1/tracks/${id}`,
      method: REQUEST_METHODS.get,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      params: {
        market: "UA",
      },
    });
  },
};

export { spotifyApi };
