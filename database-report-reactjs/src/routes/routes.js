import { Routes, Route } from "react-router-dom";
import StoreFuncDetail from "../views/componentScript/componentStoreFuncDetail/StoreFuncDetail";

export default function AppRoutes() {
  return (
    <Routes>
      <Route exact path="/" element={<div>Home Page</div>} />
      <Route exact path="/store-func-detail" element={<StoreFuncDetail />} />
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}
