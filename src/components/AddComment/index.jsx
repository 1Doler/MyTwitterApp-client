import React, { useState } from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { fetchAddCommentPost } from "../../redux/slices/comment";

export const Index = ({ postId, userId, avatarUrl }) => {
  const dispatch = useDispatch();

  const [comment, setComment] = useState("");
  const [error, setError] = useState(false);
  const onSubmit = () => {
    if (comment.length < 5) {
      setError(true);
      return;
    }
    dispatch(fetchAddCommentPost({ postId, userId, comment }));
    setComment("");
  };

  const onChange = value => {
    if (value.length >= 5) {
      setError(false);
    }
    setComment(value);
  };
  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src={process.env.REACT_APP_API_URL + avatarUrl?.slice(1)}
        />
        <div className={styles.form}>
          <TextField
            error={error}
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
            value={comment}
            onChange={e => onChange(e.target.value)}
          />
          {error && (
            <p className={styles.errorMessage}>*Комментарий слишком короткий</p>
          )}
          <Button variant="contained" onClick={onSubmit}>
            Отправить
          </Button>
        </div>
      </div>
    </>
  );
};
