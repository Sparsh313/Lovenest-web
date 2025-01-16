import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/const";
import { addUser } from "../utils/userSlice";
import axios from "axios";

const EditProfile = () => {
  const dispatch = useDispatch();
  // Fetch user data from the Redux store
  const user = useSelector((store) => store.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("Profile has been updated");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          name,
          age,
          bio,
          gender,
        },
        { withCredentials: true }
      );
      setShowToast(true);
      dispatch(addUser(res.data.data));
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      console.log(err);
    }
    console.log("Form submitted");
  };
  const [name, setName] = useState(user?.name);
  const [bio, setBio] = useState(user?.bio);
  const [gender, setGender] = useState(user?.gender);
  const [age, setAge] = useState(user?.age);
  const [showToast, setShowToast] = useState(false);

  // If the user data is not available, show a loading state
  if (!user) {
    return <div>Loading...</div>; // Or any loading indicator of your choice
  }

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-center">Edit Profile</h2>
          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>

            {/* Age */}
            <div className="mb-4">
              <label
                htmlFor="age"
                className="block text-sm font-medium text-gray-700"
              >
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>

            {/* Gender */}
            <div className="mb-4">
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-700"
              >
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              >
                <option value="">{gender}</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Bio */}
            <div className="mb-4">
              <label
                htmlFor="bio"
                className="block text-sm font-medium text-gray-700"
              >
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                required
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                rows="4"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full py-2 bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold rounded-full shadow-md hover:opacity-90 transition"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>

      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
