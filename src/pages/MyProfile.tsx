import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { PiLeafBold } from "react-icons/pi";
import { MdLogout } from "react-icons/md";
import React, { useState, useEffect } from "react";

const MyProfile = () => {
  // Zustand für das Avatar-Bild
  const [imageSrc, setImageSrc] = useState<string>(
    localStorage.getItem("avatar") ||
      "https://tecdn.b-cdn.net/img/new/avatars/2.webp"
  );

  // Bild-Upload-Funktion
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setImageSrc(imageUrl);
      localStorage.setItem("avatar", imageUrl); // Bild-URL im LocalStorage speichern
    }
  };

  // Effekt, um das Bild aus dem LocalStorage beim ersten Laden zu laden
  useEffect(() => {
    const storedImage = localStorage.getItem("avatar");
    if (storedImage) {
      setImageSrc(storedImage); // Bild aus LocalStorage laden
    }
  }, []);

  return (
    <>
      <p className="text-center text-xs font-light mr-36 pt-10">
        Welcome Back,
      </p>
      <h1 className="text-center font-bold font-Urbanist mr-20">
        Jonathan@gmail.com
      </h1>
      <div className="flex justify-center pt-10">
        <button
          style={{ backgroundColor: "#F7F7F7" }}
          className="py-4 flex items-center w-60 px-4 py-2 rounded-lg bg-slate-200 text-black font-sans">
          <PiLeafBold className="mr-2" />
          <p className="text-xs">My wallet</p>
          <span className="ml-auto flex items-center">
            <MdOutlineKeyboardArrowRight />
          </span>
        </button>
      </div>

      {/* HIER IST DER BILD-UPLOADER */}
      <div className="flex flex-col items-center pt-5">
        <img src={imageSrc} className="w-32 rounded-full" alt="Avatar" />
        <label
          htmlFor="avatar-upload"
          style={{ backgroundColor: "#F7F7F7" }}
          className="mt-4 bg-white- text-black shadow-md px-4 py-2 rounded-lg cursor-pointer text-sm">
          Avatar ändern
        </label>
        <input
          id="avatar-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
      </div>

      <div className="flex justify-center pt-40">
        <button
          style={{ backgroundColor: "#F7F7F7" }}
          className="py-4 flex items-center w-60 px-4 py-2 rounded-lg bg-slate-200 text-black font-sans">
          <MdLogout className="mr-2" />
          <p className="text-xs">Logout</p>
          <span className="ml-auto flex items-center">
            <MdOutlineKeyboardArrowRight />
          </span>
        </button>
      </div>
    </>
  );
};

export default MyProfile;
