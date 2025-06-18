import { Outlet } from "react-router-dom";
import { Navbar } from "./components/Navbar";

const App = () => (
  <div className="flex h-screen ">
    <Navbar />
    <Outlet />
  </div>
);

export default App;
