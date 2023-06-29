import axios from 'axios';
import {addPost, Post, removePost, setLoading, setPosts, updatePost} from "./postsSlice";
import {AppDispatch} from "../../";
import {IParams} from "../../../constants/utils";

export const fetchPosts = ({page, limit}: IParams) => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));

  try {
    const [postsResponse, usersResponse] = await Promise.all([
      axios.get(`${process.env.REACT_APP_BASE_URL}/posts`, {
        params: {
          _page: page,
          _limit: limit
        }
      }),
      axios.get(`${process.env.REACT_APP_BASE_URL}/users`)
    ]);

    const posts = postsResponse.data;
    const users = usersResponse.data;
    const total = postsResponse.headers['x-total-count']

    const usersById = users.reduce((acc: any, user: any) => {
      acc[user.id] = user;
      return acc;
    }, {});

    const userPosts = posts.map((post: any) => ({
      ...post,
      username: usersById[post.userId].name
    }));

    dispatch(setPosts({posts: userPosts, total}));
  } catch (error) {
    console.error("Failed to fetch posts:", error);
  }

  dispatch(setLoading(false));
};

export const createPost = (post: Omit<Post, 'id'>) => async (dispatch: AppDispatch) => {
  const id = Date.now();
  const data: Post = {id, ...post};
  dispatch(setLoading(true));

  try {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/posts`, data);
    const newPost = response.data;

    dispatch(addPost(newPost));
  } catch (error) {
    // Handle error
    console.error('Failed to create post:', error);
  }

  dispatch(setLoading(false));
};

export const deletePost = (postId: number) => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));

  try {
    await axios.delete(`${process.env.REACT_APP_BASE_URL}/posts/${postId}`);

    dispatch(removePost(postId));
  } catch (error) {
    // Handle error
    console.error('Failed to create post:', error);
  }

  dispatch(setLoading(false));
};

export const updatePostDetails = (post: Post) => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));

  try {
    await axios.patch(`${process.env.REACT_APP_BASE_URL}/posts/${post.id}`);

    dispatch(updatePost(post));
  } catch (error) {
    // Handle error
    console.error('Failed to create post:', error);
  }

  dispatch(setLoading(false));
  // dispatch(setLoading(true));
  //
  // setTimeout(() => {
  //   dispatch(updatePost(post));
  //   dispatch(setLoading(false));
  // }, 1000);
};