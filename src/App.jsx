import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import { appStore } from "./utils/appstore";
import Feed from "./components/feed";
import Edit from "./components/Edit";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <Router basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile/view" element={<Profile />} />
              <Route path="/profile/edit" element={<Edit />} />
            </Route>
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;
