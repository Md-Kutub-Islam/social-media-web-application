import React, { useEffect, useState } from "react";
import { Delete } from "@mui/icons-material";
import { useTheme } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import state, { deletePost, setPost } from "../../state";

function DeletePostWidgets(postId) {
  const [posts, setPost] = useState(null);
  const { palette } = useTheme();
  // const {id} = useParams()
  const primaryDark = palette.primary.dark;
  const dispatch = useDispatch();
  const post = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const { _id } = useSelector((state) => state.user);

  const getUserPosts = async () => {
    const response = await fetch(`${process.env.BASEURL}/posts/${_id}/posts`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setPost(data);
  };

  console.log("_id:", posts);

  console.log("postIdTwo", postId.postId);

  const deletePosts = async (id) => {
    const response = await fetch(`${process.env.BASEURL}/posts/${id}/delete`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    await response.json();
    if (!response.ok) {
      throw new Error("Failed to delete post");
    }
    dispatch(deletePost(id));
  };

  useEffect(() => {
    getUserPosts();
  }, []);

  return (
    <Delete
      sx={{
        "&:hover": {
          color: palette.primary.light,
          cursor: "pointer",
        },
      }}
      onClick={() => deletePosts(postId.postId)}
    />
  );
}

export default DeletePostWidgets;
