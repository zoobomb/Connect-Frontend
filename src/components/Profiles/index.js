import React, { useEffect, useState } from "react";

import NewProfileForm from "./NewProfileForm";
import ProfilesList from "./ProfilesList";
import { BACKEND_URL } from "../../config";

/* DATA TO DISPLAY

Mentor or mentee
First name
Last name
Background info
Interests
Experience
Email address

*/

// const profilesArray = [
//   {
//     id: 0,
//     type: "Mentee",
//     firstName: "Hajoo",
//     lastName: "Chung",
//     aboutMe: "Used to be a mechanical engineer.",
//     interests: ["JavaScript"],
//     experience: "A little",
//     emailAddress: "hajoo@soc.co.uk",
//   },
//   {
//     id: 1,
//     type: "Mentor",
//     firstName: "Ben",
//     lastName: "Lee",
//     aboutMe: "Makes crazy jingles for SoC.",
//     interests: ["Front-end"],
//     experience: "0-5 years",
//     emailAddress: "ben@soc.co.uk",
//   },
//   {
//     id: 2,
//     type: "Mentee",
//     firstName: "Thomas",
//     lastName: "Bennett",
//     aboutMe: "Used to be a lifeguard.",
//     interests: ["Node", "API", "Express"],
//     experience: "A little",
//     emailAddress: "tom@soc.co.uk",
//   },
// ];

function Profiles() {
  const [profiles, setProfiles] = useState([]);

  // GETs all profiles
  async function getProfiles() {
    const res = await fetch(`${BACKEND_URL}/profiles`);
    const { payload } = await res.json();
    console.log(payload);
    setProfiles(payload);
  }

  // Calls getProfiles on page load-up
  useEffect(() => getProfiles(), []);

  // Sends POST request to API at /profiles - if successful, updates state
  async function addProfile(newProfile) {
    const res = await fetch(`${BACKEND_URL}/profiles`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ payload: newProfile }),
    });
    const { success } = await res.json();
    if (success) {
      const updatedProfiles = profiles.map((profile) => ({ ...profile }));
      updatedProfiles.push({ ...newProfile });
      console.log("Success!");
      setProfiles(updatedProfiles);
    }
    if (!success) {
      console.log("There was an error adding the profile!");
    }
  }

  // WIP - Sends DELETE request to API at target profile ID path
  async function deleteProfile(profileId) {
    const res = await fetch(`${BACKEND_URL}/${profileId}`, {
      method: "DELETE",
    });
    const { success } = await res.json();
    if (success) {
      setProfiles(profiles.filter(({ id }) => id !== profileId));
      console.log(profiles);
    }
    if (!success) {
      console.log("There was an error deleting the profile!");
    }
  }
  return (
    <div>
      <NewProfileForm addProfile={addProfile} />
      <ProfilesList profiles={profiles} deleteProfile={deleteProfile} />
    </div>
  );
}

export default Profiles;
