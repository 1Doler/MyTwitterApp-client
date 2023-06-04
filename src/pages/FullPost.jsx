import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import axios from "../axios";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { fetchCommentPost } from "../redux/slices/comment";

export const FullPost = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const { data: userData } = useSelector(state => state.auth);
  const { comments } = useSelector(state => state.comments);

  const getPost = () => {
    axios
      .get(`/posts/${id}`)
      .then(res => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch(err => {
        alert("Ошибка");
      });
  };

  useEffect(() => {
    dispatch(fetchCommentPost({ postId: id }));
    getPost();
  }, []);

  useEffect(() => {
    getPost();
  }, [comments]);
  if (isLoading) {
    return <Post isLoading={isLoading} />;
  }
  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data?.imageUrl || ""}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={data?.commentsCount || 0}
        tags={data.tags || []}
        isFullPost
      >
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock
        items={comments.items.length ? comments.items : []}
        isLoading={false}
      >
        {userData && (
          <Index
            postId={id}
            avatarUrl={userData.userData.avatarUrl}
            userId={userData.userData._id}
          />
        )}
      </CommentsBlock>
    </>
  );
};
