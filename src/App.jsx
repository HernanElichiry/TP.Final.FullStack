import "./App.css";

import HomePage from "./LandigPage/Home/HomePage";
import "./../node_modules/bulma/css/bulma.css";
import Navbar from "./LandigPage/navbar/navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserMenu from "./LandigPage/User/user";
import ChangePasswordForm from "./LandigPage/User/changePasword";
import DataComponent from "./LandigPage/User/dataComponent";
import LoginForm from "./LandigPage/Login/login";
import MyCourses from "./LandigPage/User/myCourses";
import Favorites from "./LandigPage/User/favorites";
import ProfessorMenu from "./LandigPage/User/professor";
import RegisterForm from "./LandigPage/Login/register";
import { UserProvider } from "./LandigPage/User/UserContext";
import AddCourseForm from "./LandigPage/User/AddCourseForm";

function App() {
  return (
    <div>
      <BrowserRouter>
        <UserProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="Login" element={<LoginForm />} />
            <Route path="register" element={<RegisterForm />} />
            <Route path="/usermenu/*" element={<UserMenu />}>
              <Route path="change-password" element={<ChangePasswordForm />} />
              <Route path="data" element={<DataComponent />} />
              <Route path="my-courses" element={<MyCourses />} />
              <Route path="favorites" element={<Favorites />} />
            </Route>
            <Route path="/professormenu/*" element={<ProfessorMenu />}>
              <Route path="add-course" element={<AddCourseForm/>} />
              <Route path="change-password" element={<ChangePasswordForm />} />
              <Route path="data" element={<DataComponent />} />
              <Route path="my-courses" element={<MyCourses />} />
              <Route path="favorites" element={<Favorites />} />
            </Route>
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
