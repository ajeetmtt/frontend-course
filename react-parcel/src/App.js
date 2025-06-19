import { Outlet } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Provider } from "react-redux";
import store from "./store";

const App = () => (
  <Provider store={store}>
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-20 px-4 max-w-7xl mx-auto">
        <Outlet />
      </main>
    </div>
  </Provider>
);

export default App;
