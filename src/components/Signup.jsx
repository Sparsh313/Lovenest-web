import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/const";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [skills, setSkills] = useState("");
  const [photo, setPhoto] = useState("");
  const [bio, setBio] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          email,
          password,
          name,
          age,
          gender,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err.response.data);
      // alert("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-pink-300 via-pink-100 to-pink-500">
        <div className="relative z-10 bg-white shadow-lg rounded-lg p-8 w-96">
          <h1 className="text-2xl font-bold text-center text-pink-600 mb-4">
            Welcome to LoveNest💓
          </h1>
          <p className="text-center text-gray-600 mb-6">
            Find your perfect match!
          </p>
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                placeholder=""
                required
              />
            </div>{" "}
            <div>
              <label
                htmlFor="aeg"
                className="block text-sm font-medium text-gray-700"
              >
                Age
              </label>
              <input
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                placeholder=""
                required
              />
            </div>
            <div>
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-700"
              >
                Gender
              </label>
              <input
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                placeholder=""
                required
              />
              <div>
                <label
                  htmlFor="bio"
                  className="block text-sm font-medium text-gray-700"
                >
                  Bio
                </label>
                <input
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                  placeholder="Eg:I like to travel...."
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="photo"
                className="block text-sm font-medium text-gray-700"
              >
                Photo URL
              </label>
              <input
                id="photo"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                placeholder="images.google.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="skills"
                className="block text-sm font-medium text-gray-700"
              >
                Skills
              </label>
              <input
                id="skills"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                placeholder="Eg:Web Devlopment, Gaming"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                placeholder="you@gmail.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                placeholder="********"
                required
              />
            </div>
            <p className="text-red-500">{error}</p>
            <button
              type="submit"
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 rounded-lg transition"
            >
              Sign up
            </button>
          </form>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Existing User?{" "}
              <Link
                to="/login"
                className="text-pink-500 font-semibold hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
