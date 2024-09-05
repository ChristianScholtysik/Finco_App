import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Transaction from "./pages/Transaction";
import SearchResultPage from "./pages/SearchResultPage";
import Income from "./pages/Income";
import Expenses from "./pages/Expenses";
import Report from "./pages/Report";
import MyProfile from "./pages/MyProfile";
import { UserProvider } from "./context/UserContext";
import PrivateRoute from "./lib/PrivateRoute";
// import { ProfileProvider } from "./context/ProfileContext";
import Profile from "./pages/Profile";
import CategoryPage from "./pages/CategoryPage";

import { TransactionProvider } from "./context/TotalIncomeContext";
// import { AccountContext } from "./context/AccountContext";
// const [account, setAccount] = useState<IAccount | null>(null);

function App() {
  return (
    <UserProvider>
      <TransactionProvider>
        {/* <ProfileProvider> */}
        {/* <AccountContext.Provider value={{ account, setAccount }}> */}
        <BrowserRouter>
          <div>
            <main>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route element={<PrivateRoute />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/transaction" element={<Transaction />} />
                  <Route
                    path="/transaction-search-result"
                    element={<SearchResultPage />}
                  />
                  <Route path="/add-transaction-income" element={<Income />} />
                  <Route
                    path="/add-transaction-expenses"
                    element={<Expenses />}
                  />
                  <Route path="/report" element={<Report />} />
                  <Route
                    path="/category/:category"
                    element={<CategoryPage />}
                  />
                  <Route path="/myprofile" element={<MyProfile />} />
                  <Route path="/profile" element={<Profile />} />
                </Route>
              </Routes>
            </main>
          </div>
        </BrowserRouter>
        {/* </AccountContext.Provider> */}
        {/* </ProfileProvider> */}
      </TransactionProvider>
    </UserProvider>
  );
}

export default App;
