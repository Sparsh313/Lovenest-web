import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import { appStore } from "./utils/appstore";
import Feed from "./components/feed";
import Edit from "./components/Edit";
import Connections from "./components/Connections";
import Request from "./components/Request";
import Signup from "./components/Signup";
import Chat from "./components/chat";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <Router basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route index element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile/view" element={<Profile />} />
              <Route path="/profile/edit" element={<Edit />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/request" element={<Request />} />
              <Route path="/chat/:targetId" element={<Chat />} />
            </Route>
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;
