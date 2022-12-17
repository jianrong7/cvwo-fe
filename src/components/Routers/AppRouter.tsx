import { BrowserRouter, Routes, Route } from "react-router-dom";

import NoMatch from "../../pages/NoMatch";
import Home from "../../pages/Home";
import Post from "../../pages/Post";
import CreatePost from "../../pages/CreatePost";
import Layout from "../Layout";
import PrivateRoute from "./PrivateRoute";
import User from "../../pages/User";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          {/* <Route path="thread/1" element={<BasicThreadView />} />
          <Route path="thread/1/styled" element={<StyledThreadView />} /> */}
          <Route path="post/:id" element={<Post />} />
          <Route path="/user/:id" element={<User />} />

          <Route
            path="/submit"
            element={<PrivateRoute component={<CreatePost />} />}
          />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
