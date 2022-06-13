import { HashRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./containers/Layout";
import Room from "./containers/Room";

export default function MyRoutes() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Room />} />
        </Routes>
      </Layout>
    </Router>
  );
}
