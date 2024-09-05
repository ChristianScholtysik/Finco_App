import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { PiLeafBold } from "react-icons/pi";
import { MdLogout } from "react-icons/md";

const MyProfile = () => {
  return (
    <>
      <p className="text-center text-xs font-light  mr-36 pt-10">
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
          <p className="text-xs"> My wallet</p>

          <span className="ml-auto flex items-center">
            <MdOutlineKeyboardArrowRight />
          </span>
        </button>
      </div>
      {/* Kommentar in JSX */}
      <div className="flex justify-center pt-5">
        <img
          src="https://tecdn.b-cdn.net/img/new/avatars/2.webp"
          className="w-32 rounded-full"
          alt="Avatar"
        />
      </div>

      {/* Kommentar in JSX */}
      <div className="flex justify-center pt-40">
        <button
          style={{ backgroundColor: "#F7F7F7" }}
          className="py-4 flex items-center w-60 px-4 py-2 rounded-lg bg-slate-200 text-black font-sans">
          <MdLogout className="mr-2" />{" "}
          {/* Abstand zwischen Logout-Icon und Text */}
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
