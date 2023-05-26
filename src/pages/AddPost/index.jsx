import React, { useRef, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";
import axios from "../../axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";
import { selectIsAuth } from "../../redux/slices/auth";
import { Navigate, useParams } from "react-router-dom";
import { PostSkeleton } from "../../components/Post/Skeleton";

export const AddPost = ({ isEdit = false }) => {
  const isAuth = useSelector(selectIsAuth);
  const inputFileRef = useRef(null);
  const navigate = useNavigate();

  const [imageUrl, setImageUrl] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [tags, setTags] = React.useState("");
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      getPost();
    }
  }, []);
  const getPost = async () => {
    try {
      const { data } = await axios.get(`/posts/${id}`);

      setValue(data.text);
      setTags(data.tags.join(" "));
      setTitle(data.title);
      setImageUrl(data.imageUrl);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangeFile = async (event) => {
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

  const onClickRemoveImage = () => {
    setImageUrl("");
  };

  const onChange = React.useCallback((value) => {
    setValue(value);
  }, []);

  const onSubmit = async () => {
    try {
      const fields = {
        text: value,
        title,
        tags: tags.split(" ").flat(),
      };
      console.log(fields.tags);
      if (imageUrl) {
        fields.imageUrl = `${imageUrl}`;
      }
      let postId = null;
      if (id) {
        await axios.patch(`/posts/${id}`, fields);
      } else {
        const { data } = await axios.post("/posts", fields, {
          withCredentials: true,
        });
        postId = data._id;
      }
      navigate(`/posts/${id ? id : postId}`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onClickBack = () => {
    navigate("/");
  };

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Введите текст...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );

  if (!isAuth) {
    return <Navigate to="/" />;
  }
  if (isLoading) {
    return <PostSkeleton />;
  }
  return (
    <Paper style={{ padding: 30 }}>
      <Button
        onClick={() => inputFileRef.current.click()}
        variant="outlined"
        size="large"
      >
        Загрузить превью
      </Button>
      <input
        ref={inputFileRef}
        type="file"
        onChange={handleChangeFile}
        hidden
      />
      {imageUrl && (
        <>
          <Button
            variant="contained"
            color="error"
            onClick={onClickRemoveImage}
          >
            Удалить
          </Button>
          <img
            className={styles.image}
            src={`https://blog-back-production-2b18.up.railway.app/${imageUrl.slice(
              1
            )}`}
            alt="Uploaded"
          />
        </>
      )}

      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Тэги"
        fullWidth
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <SimpleMDE
        className={styles.editor}
        value={value}
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          Опубликовать
        </Button>
        <a href="/">
          <Button onClick={onClickBack} size="large">
            Отмена
          </Button>
        </a>
      </div>
    </Paper>
  );
};
