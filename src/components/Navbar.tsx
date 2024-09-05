import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const { pathname } = useLocation();
  const isActive = (path: string): boolean => pathname === path;
  const [showPopover, setShowPopover] = useState(false);

  const isAddTransactionPage = (): boolean =>
    ["/add-transaction-income", "/add-transaction-expenses"].includes(pathname);

  const togglePopover = () => {
    setShowPopover(!showPopover);
  };

  const closePopover = () => {
    setShowPopover(false);
  };

  return (
    <section className="fixed max-w-sm bottom-0 z-[1000] flex justify-between items-center w-full bg-white shadow-md py-4 px-8 text-[#0d1636]">
      {/* Home */}
      <Link to="/">
        <div className="flex flex-col items-center group cursor-pointer transition-all duration-300">
          {isActive("/") ? (
            <span className="text-[#0d1636] text-sm font-semibold">Home</span>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current text-[#0d1636] group-hover:text-blue-500 transition-all duration-300">
              <path
                d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 22V12H15V22"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      </Link>

      {/* Transactions */}
      <Link to="/transaction">
        <div className="flex flex-col items-center group cursor-pointer transition-all duration-300">
          {isActive("/transaction") ? (
            <span className="text-[#0d1636] text-sm font-semibold">
              Transactions
            </span>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current text-[#0d1636] group-hover:text-blue-500 transition-all duration-300">
              <path
                d="M21 4H3C1.89543 4 1 4.89543 1 6V18C1 19.1046 1.89543 20 3 20H21C22.1046 20 23 19.1046 23 18V6C23 4.89543 22.1046 4 21 4Z"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M1 10H23"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      </Link>

      {/* Add Transaction Icon with Popover */}
      <div className="relative flex flex-col items-center group cursor-pointer transition-all duration-300">
        {isAddTransactionPage() ? (
          <span className="text-[#0d1636] text-sm font-semibold">Add</span>
        ) : (
          <div onClick={togglePopover}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`stroke-current ${
                isActive("/add-transaction-income") ||
                isActive("/add-transaction-expenses")
                  ? "text-[#0d1636]"
                  : "text-[#0d1636]"
              } group-hover:text-blue-500 transition-all duration-300`}>
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 8V16"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 12H16"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}

        {showPopover && !isAddTransactionPage() && (
          <>
            {/* Dark transparent layer */}
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-[900]"
              onClick={closePopover}></div>

            {/* Popover */}
            <div className="absolute bottom-10 flex flex-col items-center bg-white border border-[rgba(0,0,0,0.1)] rounded shadow-lg py-2 px-4 z-[1050]">
              <Link
                to="/add-transaction-income"
                className="text-sm text-inactive hover:text-active"
                onClick={() => setShowPopover(false)}>
                Income
              </Link>
              <div className="w-full border-t border-[rgba(0,0,0,0.1)] my-3"></div>
              <Link
                to="/add-transaction-expenses"
                className="text-sm text-inactive hover:text-active mt-2"
                onClick={() => setShowPopover(false)}>
                Expenses
              </Link>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-r border-b border-[rgba(0,0,0,0.1)] rotate-45"></div>
            </div>
          </>
        )}
      </div>

      {/* Report */}
      <Link to="/report">
        <div className="flex flex-col items-center group cursor-pointer transition-all duration-300">
          {isActive("/report") ? (
            <span className="text-[#0d1636] text-sm font-semibold">
              Reports
            </span>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current text-[#0d1636] group-hover:text-blue-500 transition-all duration-300">
              <path
                d="M21.21 15.89C20.5738 17.3945 19.5788 18.7202 18.3119 19.7513C17.0449 20.7824 15.5447 21.4874 13.9424 21.8048C12.3401 22.1221 10.6844 22.0421 9.12012 21.5718C7.55585 21.1015 6.1306 20.2551 4.969 19.1067C3.80739 17.9582 2.94479 16.5428 2.45661 14.984C1.96843 13.4251 1.86954 11.7705 2.16857 10.1646C2.46761 8.55878 3.15547 7.05063 4.17202 5.77203C5.18857 4.49343 6.50286 3.48332 7.99998 2.83"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9993 5.85703 19.0711 4.92891C18.1429 4.00079 17.0401 3.26383 15.8268 2.76125C14.6136 2.25867 13.3132 2 12 2"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 6V12L15 15"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      </Link>

      {/* Profile */}
      <Link to="/myprofile">
        <div className="flex flex-col items-center group cursor-pointer transition-all duration-300">
          {isActive("/profile") ? (
            <span className="text-[#0d1636] text-sm font-semibold">
              Profile
            </span>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current text-[#0d1636] group-hover:text-blue-500 transition-all duration-300">
              <path
                d="M16 7C16 8.5913 15.3679 10.1174 14.2426 11.2426C13.1174 12.3679 11.5913 13 10 13C8.4087 13 6.88258 12.3679 5.75736 11.2426C4.63214 10.1174 4 8.5913 4 7C4 5.4087 4.63214 3.88258 5.75736 2.75736C6.88258 1.63214 8.4087 1 10 1C11.5913 1 13.1174 1.63214 14.2426 2.75736C15.3679 3.88258 16 5.4087 16 7V7Z"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20 21V19C20 17.6739 19.4732 16.4021 18.5355 15.4645C17.5979 14.5268 16.3261 14 15 14H5C3.67392 14 2.40215 14.5268 1.46447 15.4645C0.526784 16.4021 0 17.6739 0 19V21"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      </Link>
    </section>
  );
};

export default Navbar;
