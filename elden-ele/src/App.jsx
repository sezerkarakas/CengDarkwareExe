import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import UserLiked from "./pages/userLiked";
import NewAdvert from "./pages/NewAdvert";
import ProfilePage from "./pages/ProfilePage";
import UpdatePage from "./pages/UpdatePage";
import Details from "./pages/Details";
import MessageInterface from "./pages/MessageInterface";
import ProductSearch from "./pages/ProductSearch";
import ChangePassword from "./pages/ChangePassword";
import App12 from "./pages/Test";
import CategoriesPage from "./pages/CategoriesPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/" element={<Home />} />
        <Route exact path="/mylist" element={<UserLiked />} />
        <Route exact path="/ilanekle" element={<NewAdvert />} />
        <Route exact path="/profile" element={<ProfilePage />} />
        <Route exact path="/ilanguncelle/:id" element={<UpdatePage />} />
        <Route
          path="/category"
          element={<CategoriesPage categoryName={"Vasita"} />}
        />
        <Route path="/ilan/:id" element={<Details />} />
        <Route exact path="/message" element={<MessageInterface />} />
        <Route exact path="/search" element={<ProductSearch />} />
        <Route exact path="/changepassword" element={<ChangePassword />} />
        <Route exact path="/test" element={<App12 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
