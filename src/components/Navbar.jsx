import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/const";
import { removeUser } from "../utils/userSlice";
import { removeFeed } from "../utils/feedSlice";
import { removeAllRequest, removeRequest } from "../utils/requestSlice";
import { removeAllConnnection } from "../utils/connectionSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user); // Redux store se data access karne ke liye hai
  const dispatch = useDispatch(); // Redux store mein bhejne ke liye hai.
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get(BASE_URL + "/logout", {
        withCredentials: true,
      });
      dispatch(removeUser());
      dispatch(removeFeed());
      dispatch(removeAllRequest());
      dispatch(removeAllConnnection());
      return navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="navbar bg-base-200">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            LoveNest💓
          </Link>
        </div>
        <div className="flex-none gap-2">
          {user && (
            <div className="dropdown dropdown-end mx-5 flex items-start ">
              <p className="mx-4 my-3">Welcome,{user.name}</p>
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img alt="Tailwind CSS Navbar component" src={user.photo} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile/view" className="justify-between">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/connections">Friends 🧑‍🦱 </Link>
                </li>
                <li>
                  <Link to="/request">Follow Request 🔔</Link>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout 🔴</a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
