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
import { UserProvider } from "./context/UserContext";
import PrivateRoute from "./lib/PrivateRoute";
import Profile from "./pages/Profile";
import CategoryPage from "./pages/CategoryPage";

import MyWallet from "./pages/MyWallet";
import AddAccount from "./pages/AddAccount";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <div>
          <main>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route element={<PrivateRoute />}>
                <Route path="/" element={<Home />} />
                <Route path="/transaction" element={<Transaction />} />
                <Route path="/search-result" element={<SearchResultPage />} />
                <Route path="/add-transaction-income" element={<Income />} />
                <Route
                  path="/add-transaction-expenses"
                  element={<Expenses />}
                />
                <Route path="/report" element={<Report />} />
                <Route path="/category/:category" element={<CategoryPage />} />
                <Route path="/mywallet" element={<MyWallet />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/addaccount" element={<AddAccount />} />
              </Route>
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
