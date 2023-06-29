import axios from 'axios';
import {AppDispatch} from "../../";
import {setAlbums, setLoading} from "./albumsSlice";
import {IParams} from "../../../constants/utils";

export const fetchAlbums = ({page, limit}: IParams) => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));

  try {
    const [albumsResponse, usersResponse] = await Promise.all([
      axios.get(`${process.env.REACT_APP_BASE_URL}/albums`, {
        params: {
          _page: page,
          _limit: limit
        }
      }),
      axios.get(`${process.env.REACT_APP_BASE_URL}/users`)
    ]);

    const albums = albumsResponse.data;
    const users = usersResponse.data;
    const total = albumsResponse.headers['x-total-count']

    const usersById = users.reduce((acc: any, user: any) => {
      acc[user.id] = user;
      return acc;
    }, {});

    const userAlbums = albums.map((album: any) => ({
      ...album,
      username: usersById[album.userId].name
    }));

    dispatch(setAlbums({albums: userAlbums, total}));
  } catch (error) {
    console.error("Failed to fetch posts:", error);
  }

  dispatch(setLoading(false));
};

// export const fetchAlbums = () => async (dispatch: AppDispatch) => {
//   dispatch(setLoading(true));
//
//   try {
//     const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/albums`);
//     const albums = response.data;
//     const total = response.headers['x-total-count']
//
//
//     dispatch(setAlbums({albums, total}));
//   } catch (error) {
//     // Handle error
//     console.error('Failed to get', error);
//   }
//
//   dispatch(setLoading(false));
// };
