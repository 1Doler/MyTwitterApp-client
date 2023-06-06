import React, { useEffect } from "react";
import Container from "@mui/material/Container";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components";
import { useDispatch, useSelector } from "react-redux";
import { Home, FullPost, Registration, AddPost, Login, Profile } from "./pages";
import { fetchUserDataMe, selectIsAuth } from "./redux/slices/auth";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const { data } = useSelector(state => state.auth);
  useEffect(() => {
    dispatch(fetchUserDataMe());
  }, []);

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tag/:id" element={<Home />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/posts/:id/edit" element={<AddPost isEdit={true} />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/profile" element={<Profile user={data?.userData} />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
