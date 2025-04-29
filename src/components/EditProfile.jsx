import React from "react";
import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [skills, setSkills] = useState([]);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, age, gender, about },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <>
      <div className="flex justify-center my-2">
        <div className="flex justify-center mx-10">
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend text-xl">Edit Profile</legend>

            <label className="label">First Name</label>
            <input
              type="text"
              value={firstName}
              className="input"
              onChange={(e) => setFirstName(e.target.value)}
            />

            <label className="label">Last Name</label>
            <input
              type="text"
              value={lastName}
              className="input"
              onChange={(e) => setLastName(e.target.value)}
            />

            <label className="label">Photo URL</label>
            <input
              type="text"
              value={photoUrl}
              className="input"
              onChange={(e) => setPhotoUrl(e.target.value)}
            />

            <label className="label">Age</label>
            <input
              type="text"
              value={age}
              className="input"
              onChange={(e) => setAge(e.target.value)}
            />

            <label className="label">Gender</label>
            <input
              type="text"
              value={gender}
              className="input"
              onChange={(e) => setGender(e.target.value)}
            />

            <label className="label">About</label>
            <input
              type="text"
              value={about}
              className="input"
              onChange={(e) => setAbout(e.target.value)}
            />

            <p className="text-red-500">{error}</p>
            <button className="btn btn-neutral mt-4" onClick={saveProfile}>
              Save Profile
            </button>
          </fieldset>
        </div>
        <UserCard
          user={{ firstName, lastName, photoUrl, age, gender, about }}
        />
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully!</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
