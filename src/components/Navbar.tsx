import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const { pathname } = useLocation();
  const isActive = (path: string): boolean => pathname === path;
  const [showPopover, setShowPopover] = useState(false);

  // Schaut, auf welcher Transaction Seite der User ist
  const isAddTransactionPage = (): boolean =>
    ["/add-transaction-income", "/add-transaction-expenses"].includes(pathname);

  const togglePopover = () => {
    setShowPopover(!showPopover);
  };

  return (
    <section className="fixed bottom-0 z-[1000] flex justify-between items-center w-full bg-white shadow-md py-4 px-8 text-[#0d1636]">
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
              className="stroke-current text-[#0d1636] group-hover:text-blue-500 transition-all duration-300"
            >
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
              className="stroke-current text-[#0d1636] group-hover:text-blue-500 transition-all duration-300"
            >
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
              } group-hover:text-blue-500 transition-all duration-300`}
            >
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
          <div className="absolute bottom-10 flex flex-col items-center bg-white border border-[rgba(0,0,0,0.1)] rounded shadow-lg py-2 px-4 z-50">
            <Link
              to="/add-transaction-income"
              className="text-sm text-inactive hover:text-active"
              onClick={() => setShowPopover(false)}
            >
              Income
            </Link>
            <div className="w-full border-t border-[rgba(0,0,0,0.1)] my-3"></div>
            <Link
              to="/add-transaction-expenses"
              className="text-sm text-inactive hover:text-active mt-2"
              onClick={() => setShowPopover(false)}
            >
              Expenses
            </Link>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-r border-b border-[rgba(0,0,0,0.1)] rotate-45"></div>
          </div>
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
              className="stroke-current text-[#0d1636] group-hover:text-blue-500 transition-all duration-300"
            >
              <path
                d="M21.21 15.89C20.5738 17.3945 19.5788 18.7202 18.3119 19.7513C17.0449 20.7824 15.5447 21.4874 13.9424 21.8048C12.3401 22.1221 10.6844 22.0421 9.12012 21.5718C7.55585 21.1015 6.1306 20.2551 4.969 19.1067C3.80739 17.9582 2.94479 16.5428 2.45661 14.984C1.96843 13.4251 1.86954 11.7705 2.16857 10.1646C2.46761 8.55878 3.15547 7.05063 4.17202 5.77203C5.18857 4.49343 6.50286 3.48332 7.99998 2.83"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2V12H22Z"
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
          {isActive("/myprofile") ? (
            <span className="text-[#0d1636] text-sm font-semibold">
              Profile
            </span>
          ) : (
            <svg
              width="17"
              height="22"
              viewBox="0 0 17 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current text-[#0d1636] group-hover:text-blue-500 transition-all duration-300"
            >
              <path
                d="M8.50666 0.500044L8.50667 0.499867L8.49334 0.500044C7.76133 0.5098 7.03885 0.668803 6.3677 0.967445C5.69658 1.26607 5.0905 1.6982 4.58399 2.23816C4.07751 2.77808 3.68054 3.41516 3.41528 4.11231C3.15122 4.8063 3.02268 5.54663 3.03667 6.29108C3.0232 7.03543 3.15206 7.77555 3.41626 8.46936C3.68166 9.16632 4.07858 9.80327 4.58489 10.3432C5.09123 10.8831 5.69703 11.3154 6.36785 11.6144C7.03871 11.9134 7.76092 12.073 8.49279 12.0836L8.49995 12.0837L8.50711 12.0836C9.23904 12.0732 9.96132 11.9137 10.6322 11.6147C11.3031 11.3157 11.909 10.8834 12.4154 10.3435C12.9217 9.8035 13.3186 9.16649 13.584 8.46945C13.8481 7.7756 13.9769 7.03542 13.9633 6.29105C13.9773 5.54661 13.8488 4.80629 13.5847 4.11231C13.3195 3.41516 12.9225 2.77808 12.416 2.23816C11.9095 1.6982 11.3034 1.26607 10.6323 0.967445C9.96115 0.668803 9.23867 0.5098 8.50666 0.500044ZM8.5 13.6745C6.46533 13.6745 4.51564 13.8432 3.05873 14.3858C2.32586 14.6587 1.68522 15.0379 1.22534 15.5682C0.75679 16.1085 0.5 16.7786 0.5 17.5755C0.5 18.371 0.754823 19.0416 1.22075 19.5839C1.6783 20.1164 2.31647 20.4991 3.04831 20.7755C4.50305 21.3249 6.45331 21.5 8.5 21.5C10.5348 21.5 12.4844 21.3309 13.9413 20.7881C14.6742 20.515 15.3148 20.1358 15.7746 19.6056C16.2432 19.0654 16.5 18.3955 16.5 17.5991C16.5 16.8036 16.2453 16.133 15.7794 15.5907C15.3219 15.0582 14.6838 14.6755 13.952 14.3991C12.4974 13.8497 10.5471 13.6745 8.5 13.6745Z"
                stroke="#565C72"
              />
            </svg>
          )}
        </div>
      </Link>
    </section>
  );
};

export default Navbar;
