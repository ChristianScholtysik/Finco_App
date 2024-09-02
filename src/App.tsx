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

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
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
            <Route path="/add-transaction-expenses" element={<Expenses />} />
            <Route path="/report" element={<Report />} />
            <Route path="/myprofile" element={<MyProfile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
