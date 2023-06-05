import React, { useEffect, useRef, useState } from "react";
import axios from "../../axios";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUpdateProfile } from "../../redux/slices/auth";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

import styles from "./Profile.module.scss";

export const Profile = () => {
  const inputFileRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [imageUrl, setImageUrl] = useState("");

  const { data, status } = useSelector(state => state.auth);
  const user = data?.userData;
  const {
    register,
    setValue,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: null,
      fullName: null,
    },
    mode: "onChange",
  });

  useEffect(() => {
    setValue("email", user?.email);
    setValue("fullName", user?.fullName);
  }, [user]);

  const handleChangeFile = async event => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);
      const { data } = await axios.post("/upload", formData, {
        withCredentials: true,
      });
      setImageUrl(data.url);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmitUpdate = async value => {
    try {
      const body = {
        userId: user._id,
        fullName: value.fullName,
      };
      if (imageUrl) {
        body.avatarUrl = imageUrl;
      }
      await dispatch(fetchUpdateProfile(body));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) {
    return <h1>Loading</h1>;
  }

  return (
    <Paper
      classes={{ root: styles.root }}
      elevation={1}
      className={styles.wrapper}
    >
      <Typography classes={{ root: styles.title }} variant="h5">
        Профиль
      </Typography>
      <div className={styles.avatar}>
        {imageUrl ? (
          <img
            src={process.env.REACT_APP_API_URL + imageUrl.slice(1)}
            className={styles.img}
          />
        ) : user?.avatarUrl ? (
          <img
            src={process.env.REACT_APP_API_URL + user.avatarUrl.slice(1)}
            className={styles.img}
          />
        ) : (
          <Avatar sx={{ width: 100, height: 100 }} />
        )}
      </div>
      <Button
        className={styles.uploadImg}
        type="button"
        size="small"
        variant="contained"
        onClick={() => inputFileRef.current.click()}
      >
        {user?.avatarUrl ? "Загрузить фото" : "Изменить фото"}
      </Button>
      <input
        ref={inputFileRef}
        type="file"
        onChange={handleChangeFile}
        hidden
      />
      <form onSubmit={handleSubmit(onSubmitUpdate)} className={styles.form}>
        <TextField
          InputLabelProps={{ shrink: true }}
          className={styles.field}
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register("fullName", { required: "Укажите имя" })}
          label={"Имя"}
          fullWidth
        />
        <TextField
          InputLabelProps={{ shrink: true }}
          InputProps={{
            readOnly: true,
          }}
          className={styles.field}
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register("email", { required: "Укажите почту" })}
          label="E-Mail"
          fullWidth
        />
        <Button type="submit" size="large" variant="contained" fullWidth>
          Изменить
        </Button>
      </form>
    </Paper>
  );
};
