import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../../pages/Home";
import BasicThreadView from "../../pages/BasicThreadView";
import StyledThreadView from "../../pages/StyledThreadView";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/thread/1" element={<BasicThreadView />} />
        <Route path="/thread/1/styled" element={<StyledThreadView />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
