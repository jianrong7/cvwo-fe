import { BrowserRouter, Routes, Route } from "react-router-dom";

import NoMatch from "../../pages/NoMatch";
import Home from "../../pages/Home";
import Post from "../../pages/Post";
import CreatePost from "../../pages/CreatePost";
import BasicThreadView from "../../pages/BasicThreadView";
import StyledThreadView from "../../pages/StyledThreadView";
import PrivateRoute from "../PrivateRoute";
import { getCurrentUser } from "../../modules/users/userSlice";
import { useAppSelector } from "../../app/hooks";

const AppRouter = () => {
  const curUser = useAppSelector(getCurrentUser);
  console.log(curUser);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/thread/1" element={<BasicThreadView />} />
        <Route path="/thread/1/styled" element={<StyledThreadView />} />
        <Route path="/post/:id" element={<Post />} />
        <Route
          path="/submit"
          element={
            <PrivateRoute user={curUser}>
              <CreatePost />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
