import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";

import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";
import { fetchPosts, fetchTags } from "../redux/slices/posts";

import { CSSTransition } from "react-transition-group";
import "./styles.scss";

export const Home = () => {
  const dispatch = useDispatch();

  const [typeSort, setTypeSort] = useState("new");
  const [changeTag, setChangeTag] = useState(null);
  const [statusLoad, setStatusLoad] = useState("loading");

  const { posts, tags } = useSelector((state) => state.posts);
  const { data } = useSelector((state) => state.auth);

  const isPostsLoading = !!posts.status === "loading";
  const isTagsLoading = tags.status === "loading";
  useEffect(() => {
    dispatch(fetchPosts({ sort: typeSort, tag: changeTag }));
    dispatch(fetchTags());
  }, [typeSort, changeTag]);

  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={typeSort === "new" ? 0 : 1}
        aria-label="basic tabs example"
      >
        <Tab label="Новые" onClick={() => setTypeSort("new")} />
        <Tab label="Популярные" onClick={() => setTypeSort("popular")} />
        <CSSTransition
          in={!!changeTag}
          timeout={700}
          unmountOnExit
          classNames="alert"
        >
          <h2 className="selectedTag">
            #{changeTag} <span onClick={() => setChangeTag(null)}>X</span>
          </h2>
        </CSSTransition>
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
              <Post
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
                isEditable={obj.user._id === data?.userData._id}
                dispatch={dispatch}
              />
            )
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock
            items={tags.items}
            onChange={(name) => setChangeTag(name)}
            isLoading={isTagsLoading}
          />
          {/* <CommentsBlock
            items={[
              {
                user: {
                  fullName: "Вася Пупкин",
                  avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
                },
                text: "Это тестовый комментарий",
              },
              {
                user: {
                  fullName: "Иван Иванов",
                  avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
                },
                text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
              },
            ]}
            isLoading={false}
          /> */}
        </Grid>
      </Grid>
    </>
  );
};
