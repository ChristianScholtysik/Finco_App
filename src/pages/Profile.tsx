// import { MdArrowForwardIos } from "react-icons/md";
// import Navbar from "../components/Navbar";
// import { LuLogOut } from "react-icons/lu";
// import { IoMdPerson } from "react-icons/io";
// import { FiFeather } from "react-icons/fi";
// import Logo from "../components/Logo";
// import supabaseClient from "../lib/supabaseClient";
// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { useUserContext } from "../context/UserContext";

// const Profile = () => {
//   const userContext = useUserContext();
//   const user = userContext?.user;

//   const [avatarFile, setAvatarFile] = useState<File | null>(null);
//   const [avatarUrl, setAvatarUrl] = useState<string | null>(
//     userContext?.profile?.avatar_url || null
//   );
//   const [uploading, setUploading] = useState<boolean>(false);
//   const [isDeleting, setIsDeleting] = useState<boolean>(false);

//   const navigate = useNavigate();
//   if (!user) {
//     return;
//   }

//   const handleUpload = async () => {
//     if (!avatarFile) {
//       return;
//     }
//     setUploading(true);

//     const fileName = `${user.id}_${avatarFile.name}`;
//     const uploadAvatarResponse = await supabaseClient.storage
//       .from("avatars")
//       .upload(fileName, avatarFile, { upsert: true });

//     if (uploadAvatarResponse.error) {
//       console.error("Error uploading Avatar", uploadAvatarResponse.error);
//       setUploading(false);
//       return;
//     }

//     const publicUrlForAvatar = await supabaseClient.storage
//       .from("avatars")
//       .getPublicUrl(fileName);

//     if (!publicUrlForAvatar.data) {
//       console.error("Error getting publicUrl");
//       setUploading(false);
//       return;
//     }

//     const updateProfilesResponse = await supabaseClient
//       .from("profiles")
//       .update({ avatar_url: publicUrlForAvatar.data.publicUrl })
//       .eq("id", user.id);

//     if (updateProfilesResponse.error) {
//       console.error(
//         "Error setting avatar Url",
//         updateProfilesResponse.error.message
//       );
//       setUploading(false);
//       return;
//     }

//     setAvatarUrl(publicUrlForAvatar.data.publicUrl);
//     setUploading(false);
//   };

//   const handleDelete = async () => {
//     if (!avatarUrl) {
//       return;
//     }

//     setIsDeleting(true);

//     const filePath = avatarUrl.split("/").slice(-2).join("/");

//     const deleteAvatarResponse = await supabaseClient.storage
//       .from("avatars")
//       .remove([filePath]);

//     if (deleteAvatarResponse.error) {
//       console.error("Error deleting Avatar", deleteAvatarResponse.error);
//       setIsDeleting(false);
//       return;
//     }

//     const updateProfilesResponse = await supabaseClient
//       .from("profiles")
//       .update({ avatar_url: null })
//       .eq("id", user.id);

//     if (updateProfilesResponse.error) {
//       console.error(
//         "Error removing avatar Url",
//         updateProfilesResponse.error.message
//       );
//       setIsDeleting(false);
//       return;
//     }

//     setAvatarUrl(null);
//     setIsDeleting(false);
//   };

//   const handleLogout = async (e: React.MouseEvent) => {
//     e.preventDefault();
//     const signoutResponse = await supabaseClient.auth.signOut();

//     if (signoutResponse.error) {
//       console.log("Logout error", signoutResponse.error);
//     } else {
//       userContext?.setUser(null);
//       navigate("/login");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center ">
//       <section className="bg-white p-6 rounded-lg w-full max-w-sm ">
//         <div className="flex justify-between items-center mb-10 w-full">
//           <Logo />
//           {avatarUrl ? (
//             <Link to="profile">
//               <img
//                 alt="User Avatar"
//                 src={avatarUrl}
//                 className="inline-block h-14 w-14 rounded-full cursor-pointer object-cover object-center"
//               />
//             </Link>
//           ) : (
//             <Link to="profile">
//               <div className=" h-14 w-14 rounded-full bg-stone-300 flex items-center text-xs text-center text-tBase">
//                 Add image
//               </div>
//             </Link>
//           )}
//         </div>
//         <h2 className="text-3xl font-semibold text-center mb-4 text-tBase">
//           {userContext.profile?.first_name}`s Profile
//         </h2>
//         <p className="text-center mb-12 mt-4 font-normal text-sm text-tBase p-2">
//           "Welcome to your profile, where you can manage your account and
//           personal details."
//         </p>
//         <Link to="/mywallet">
//           <button className="bg-stone-200 text-tBase text-small font-base rounded-lg shadow-lg px-4 py-4 w-full flex justify-between items-center mb-4">
//             <div className="flex items-center gap-2">
//               <FiFeather />
//               <span>My wallet</span>
//             </div>
//             <div>
//               <MdArrowForwardIos />
//             </div>
//           </button>
//         </Link>
//         <button className="bg-stone-200 text-tBase text-small font-base rounded-lg shadow-lg px-4 py-4 w-full flex justify-between items-center mb-4">
//           <div className="flex items-center gap-2">
//             <IoMdPerson />
//             <section className="flex flex-col text-left">
//               <span>First name: {userContext.profile?.first_name}</span>
//               <span>Last name: {userContext.profile?.last_name}</span>
//               <span>Email: {user.email}</span>
//               <span>
//                 Account created: {new Date(user.created_at).toLocaleString()}
//               </span>
//             </section>
//           </div>
//           <div>
//             <MdArrowForwardIos />
//           </div>
//         </button>

//         {/* Image Upload */}
//         <div className="flex flex-col items-center mb-6">
//           {avatarUrl ? (
//             <img
//               src={avatarUrl}
//               className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
//             />
//           ) : (
//             <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center">
//               No image
//             </div>
//           )}
//           <label className="mt-4 mb-2 text-tBase font-normal ">
//             <strong>Upload Image</strong>
//           </label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => {
//               if (e.target.files) {
//                 setAvatarFile(e.target.files[0]);
//               }
//             }}
//             className="mt-2 mb-4 text-sm "
//           />
//           <section className="flex gap-4">
//             <button
//               onClick={handleUpload}
//               disabled={uploading}
//               className={`w-40 px-4 py-2 text-white font-semibold rounded-md transition-colors mt-2 ${
//                 uploading
//                   ? "bg-gradient-to-b from-[#44bbfe] to-[#1e78fe]  cursor-not-allowed"
//                   : "bg-gradient-to-b from-[#44bbfe] to-[#1e78fe] :bg-sky-900"
//               }`}>
//               {uploading ? "Uploading..." : "Upload"}
//             </button>
//             <button
//               onClick={handleDelete}
//               disabled={isDeleting}
//               className={`w-40 px-4 py-2 text-white font-semibold rounded-md transition-colors mt-2 ${
//                 isDeleting
//                   ? "bg-gradient-to-b from-[#FFCF53] to-[#FF9900]  cursor-not-allowed"
//                   : "bg-gradient-to-b from-[#FFCF53] to-[#FF9900] :bg-red-900"
//               }`}>
//               {isDeleting ? "Deleting..." : "Delete"}
//             </button>
//           </section>
//         </div>
//         <button
//           className="bg-stone-200 text-tBase text-small font-base rounded-lg shadow-lg px-4 py-4 w-full flex justify-between items-center mb-10"
//           onClick={handleLogout}>
//           <div className="flex items-center gap-2">
//             <LuLogOut />
//             <span>Logout</span>
//           </div>
//           <MdArrowForwardIos />
//         </button>
//       </section>
//       <Navbar />
//     </div>
//   );
// };

// export default Profile;

import { MdArrowForwardIos } from "react-icons/md";
import Navbar from "../components/Navbar";
import { LuLogOut } from "react-icons/lu";
import { IoMdPerson } from "react-icons/io";
import { FiFeather } from "react-icons/fi";
import Logo from "../components/Logo";
import supabaseClient from "../lib/supabaseClient";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUserContext } from "../context/UserContext";

const Profile = () => {
  const userContext = useUserContext();
  const user = userContext?.user;

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(
    userContext?.profile?.avatar_url || null
  ); // Initialize with current avatar URL
  const [uploading, setUploading] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const navigate = useNavigate();
  if (!user) {
    return;
  }

  const handleUpload = async () => {
    if (!avatarFile) {
      return;
    }
    setUploading(true);

    const fileName = `${user.id}_${avatarFile.name}`;
    const uploadAvatarResponse = await supabaseClient.storage
      .from("avatars")
      .upload(fileName, avatarFile, { upsert: true });

    if (uploadAvatarResponse.error) {
      console.error("Error uploading Avatar", uploadAvatarResponse.error);
      setUploading(false);
      return;
    }

    const publicUrlForAvatar = await supabaseClient.storage
      .from("avatars")
      .getPublicUrl(fileName);

    if (!publicUrlForAvatar.data) {
      console.error("Error getting publicUrl");
      setUploading(false);
      return;
    }

    const updateProfilesResponse = await supabaseClient
      .from("profiles")
      .update({ avatar_url: publicUrlForAvatar.data.publicUrl })
      .eq("id", user.id);

    if (updateProfilesResponse.error) {
      console.error(
        "Error setting avatar Url",
        updateProfilesResponse.error.message
      );
      setUploading(false);
      return;
    }

    setAvatarUrl(publicUrlForAvatar.data.publicUrl);
    setUploading(false);
  };

  const handleDelete = async () => {
    if (!avatarUrl) {
      return;
    }

    setIsDeleting(true);

    const filePath = avatarUrl.split("/").slice(-2).join("/");

    const deleteAvatarResponse = await supabaseClient.storage
      .from("avatars")
      .remove([filePath]);

    if (deleteAvatarResponse.error) {
      console.error("Error deleting Avatar", deleteAvatarResponse.error);
      setIsDeleting(false);
      return;
    }

    const updateProfilesResponse = await supabaseClient
      .from("profiles")
      .update({ avatar_url: null })
      .eq("id", user.id);

    if (updateProfilesResponse.error) {
      console.error(
        "Error removing avatar Url",
        updateProfilesResponse.error.message
      );
      setIsDeleting(false);
      return;
    }

    setAvatarUrl(null);
    setIsDeleting(false);
  };

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    const signoutResponse = await supabaseClient.auth.signOut();

    if (signoutResponse.error) {
      console.log("Logout error", signoutResponse.error);
    } else {
      userContext?.setUser(null);
      navigate("/login");
    }
  };

  return (
    <div className="flex items-center justify-center ">
      <section className="bg-white p-6 rounded-lg w-full max-w-sm ">
        <div className="flex justify-between items-center mb-10 w-full">
          <Logo />
          {avatarUrl ? (
            <Link to="profile">
              <img
                alt="User Avatar"
                src={avatarUrl}
                className="inline-block h-14 w-14 rounded-full cursor-pointer object-cover object-center"
              />
            </Link>
          ) : (
            <div className="inline-block h-14 w-14 rounded-full bg-gray-300 flex items-center justify-center">
              No image
            </div>
          )}
        </div>
        <h2 className="text-3xl font-semibold text-center mb-4 text-tBase">
          My Profile
        </h2>
        <p className="text-center mb-12 mt-4 font-normal text-sm text-tBase p-2">
          "Welcome to your profile, where you can manage your account and
          personal details."
        </p>
        <Link to="/mywallet">
          <button className="bg-stone-200 text-tBase text-small font-base rounded-lg shadow-lg px-4 py-4 w-full flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <FiFeather />
              <span>My wallet</span>
            </div>
            <div>
              <MdArrowForwardIos />
            </div>
          </button>
        </Link>
        <button className="bg-stone-200 text-tBase text-small font-base rounded-lg shadow-lg px-4 py-4 w-full flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <IoMdPerson />
            <section className="flex flex-col text-left">
              <span>First name: {userContext.profile?.first_name}</span>
              <span>Last name: {userContext.profile?.last_name}</span>
              <span>Email: {user.email}</span>
              <span>
                Account created: {new Date(user.created_at).toLocaleString()}
              </span>
            </section>
          </div>
          <div>
            <MdArrowForwardIos />
          </div>
        </button>

        {/* Image Upload */}
        <div className="flex flex-col items-center mb-6">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center">
              No image
            </div>
          )}
          <label className="mt-4 mb-2 text-tBase font-normal ">
            <strong>Upload Image</strong>
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files) {
                setAvatarFile(e.target.files[0]);
              }
            }}
            className="mt-2 mb-4 text-sm "
          />
          <section className="flex gap-4">
            <button
              onClick={handleUpload}
              disabled={uploading}
              className={`w-40 px-4 py-2 text-white font-semibold rounded-md transition-colors mt-2 ${
                uploading
                  ? "bg-gradient-to-b from-[#44bbfe] to-[#1e78fe]  cursor-not-allowed"
                  : "bg-gradient-to-b from-[#44bbfe] to-[#1e78fe] :bg-sky-900"
              }`}>
              {uploading ? "Uploading..." : "Upload"}
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className={`w-40 px-4 py-2 text-white font-semibold rounded-md transition-colors mt-2 ${
                isDeleting
                  ? "bg-gradient-to-b from-[#FFCF53] to-[#FF9900]  cursor-not-allowed"
                  : "bg-gradient-to-b from-[#FFCF53] to-[#FF9900] :bg-red-900"
              }`}>
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </section>
        </div>
        <button
          className="bg-stone-200 text-tBase text-small font-base rounded-lg shadow-lg px-4 py-4 w-full flex justify-between items-center mb-10"
          onClick={handleLogout}>
          <div className="flex items-center gap-2">
            <LuLogOut />
            <span>Logout</span>
          </div>
          <MdArrowForwardIos />
        </button>
      </section>
      <Navbar />
    </div>
  );
};

export default Profile;
