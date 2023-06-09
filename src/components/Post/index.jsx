import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import EyeIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import CommentIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";

import { UserInfo } from "../UserInfo";
import { PostSkeleton } from "./Skeleton";

import format from "date-fns/format";
import { ru } from "date-fns/locale";

import { fetchRemovePost } from "../../redux/slices/posts";

import styles from "./Post.module.scss";

export const Post = ({
  _id,
  title,
  createdAt,
  imageUrl,
  user,
  viewsCount,
  commentsCount,
  tags,
  children,
  isFullPost,
  isLoading,
  isEditable,
  dispatch,
}) => {
  if (isLoading) {
    return <PostSkeleton />;
  }
  const onClickRemove = () => {
    dispatch(fetchRemovePost(_id));
  };

  return (
    <div
      className={clsx(styles.root, { [styles.rootFull]: isFullPost })}
      key={_id}
    >
      {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`/posts/${_id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )}
      {imageUrl && (
        <img
          className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
          src={process.env.REACT_APP_API_URL + imageUrl.slice(1)}
          alt={title}
        />
      )}
      <div className={styles.wrapper}>
        <UserInfo
          {...user}
          additionalText={format(new Date(createdAt), "dd MMMM yyy", {
            locale: ru,
          })}
        />
        <div className={styles.indention}>
          <h2
            className={clsx(styles.title, { [styles.titleFull]: isFullPost })}
          >
            {isFullPost ? title : <Link to={`/posts/${_id}`}>{title}</Link>}
          </h2>
          <ul className={styles.tags}>
            {tags.map(name => (
              <li key={name}>
                <Link to={`/tag/${name}`}>#{name}</Link>
              </li>
            ))}
          </ul>
          {children && <div className={styles.content}>{children}</div>}
          <ul className={styles.postDetails}>
            <li>
              <EyeIcon />
              <span>{viewsCount}</span>
            </li>
            <li>
              <CommentIcon />
              <span>{commentsCount}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
