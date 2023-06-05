import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import { motion } from "framer-motion";

import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";

import { fetchPosts, fetchTags } from "../redux/slices/posts";
import { fetchComment } from "../redux/slices/comment";
import { HomeSkeleton } from "../components/HomeSkeleton/HomeSkeleton";

export const Home = () => {
  const dispatch = useDispatch();

  const [typeSort, setTypeSort] = useState("new");
  const [changeTag, setChangeTag] = useState(null);
  const { id } = useParams();
  console.log(id);
  const { posts, tags } = useSelector(state => state.posts);
  const { data } = useSelector(state => state.auth);
  const { comments } = useSelector(state => state.comments);
  const isPostsLoading = !!posts.status === "Loading";
  const isTagsLoading = tags.status === "Loading";
  useEffect(() => {
    dispatch(fetchPosts({ sort: typeSort, tag: id }));
    dispatch(fetchComment());
    dispatch(fetchTags());
  }, [typeSort, id]);

  if (posts.status === "loading") {
    return <HomeSkeleton />;
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {id && <h1># {id}</h1>}
      <Tabs
        style={{ marginBottom: 15 }}
        value={typeSort === "new" ? 0 : 1}
        aria-label="basic tabs example"
      >
        <Tab label="Новые" onClick={() => setTypeSort("new")} />
        <Tab label="Популярные" onClick={() => setTypeSort("popular")} />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) =>
            isPostsLoading ? (
              <Post
                id={1}
                title="Roast the code #1 | Rock Paper Scissors"
                imageUrl="https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"
                user={{
                  avatarUrl:
                    "https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png",
                  fullName: "Keff",
                }}
                createdAt={"12 июня 2022 г."}
                viewsCount={150}
                commentsCount={3}
                tags={["react", "fun", "typescript"]}
                isLoading={true}
                isEditable
              />
            ) : (
              <motion.div
                key={obj._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Post
                  key={obj._id}
                  _id={obj._id}
                  title={obj.title}
                  imageUrl={obj?.imageUrl || null}
                  user={{
                    avatarUrl: obj.user.avatarUrl,
                    fullName: obj.user.fullName,
                  }}
                  createdAt={obj.createdAt}
                  viewsCount={obj.viewsCount}
                  commentsCount={obj?.commentsCount || 0}
                  tags={obj.tags}
                  isLoading={false}
                  isEditable={obj.user._id === data?.userData?._id}
                  dispatch={dispatch}
                />
              </motion.div>
            )
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock
            items={tags.items}
            onChange={name => setChangeTag(name)}
            isLoading={isTagsLoading}
          />
          <CommentsBlock items={comments.items} isLoading={false} />
        </Grid>
      </Grid>
    </motion.div>
  );
};
