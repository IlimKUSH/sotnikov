import axios from 'axios';
import {setLoading} from "./postSlice";
import {AppDispatch} from "../../";
import {setPost} from "../post/postSlice";

export const fetchPost = (id: number) => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));

  try {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${id}/comments`);
    const post = response.data;

    dispatch(setPost(post));
  } catch (error) {
    // Handle error
    console.error('Failed to get', error);
  }

  dispatch(setLoading(false));
};
