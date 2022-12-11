import { BrowserRouter, Routes, Route } from "react-router-dom";

import NoMatch from "../../pages/NoMatch";
import Home from "../../pages/Home";
import Post from "../../pages/Post";
import CreatePost from "../../pages/CreatePost";
import BasicThreadView from "../../pages/BasicThreadView";
import StyledThreadView from "../../pages/StyledThreadView";
import { getCurrentUser } from "../../modules/users/userSlice";
import { useAppSelector } from "../../app/hooks";
import Layout from "../Layout";
import PrivateRoute from "./PrivateRoute";

const AppRouter = () => {
  const curUser = useAppSelector(getCurrentUser);
  console.log(curUser);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="thread/1" element={<BasicThreadView />} />
          <Route path="thread/1/styled" element={<StyledThreadView />} />
          <Route path="post/:id" element={<Post />} />
          <Route path="/" element={<Home />} />

          <Route
            path="/submit"
            element={<PrivateRoute component={<CreatePost />} />}
          />

          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
