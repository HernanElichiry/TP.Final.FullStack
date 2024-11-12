
import { UserProvider } from "./LandigPage/User/UserContext/UserContext";
import HomePage from "./LandigPage/Home/HomePage";
import "./../node_modules/bulma/css/bulma.css";
import Navbar from "./LandigPage/navbar/navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserMenu from "./LandigPage/User/User/user";
import ChangePasswordForm from "./LandigPage/User/ChangePassword/changePasword";
import DataComponent from "./LandigPage/User/DataComponent/dataComponent";
import LoginForm from "./LandigPage/Login/login";
import MyCoursesAlumno from "./LandigPage/User/User/MyCoursesUser";
import MyCoursesProfessor from "./LandigPage/User/Profesor/MyCoursesProfessor";
import FavoritesAlumno from "./LandigPage/User/User/UserFavorite";
import FavoritesProfessor from "./LandigPage/User/Profesor/ProfessorFavorite";
import ProfessorMenu from "./LandigPage/User/Profesor/professor";
import RegisterForm from "./LandigPage/Login/register";
import { FavoritesProvider } from "./LandigPage/User/FavoritesContext";
import AddCourseForm from "./LandigPage/User/AddCourseForm/AddCourseForm";
import CourseDetail from "./LandigPage/DetailPage/CourseDetail";
import SearchResults from "./LandigPage/SearchResult/SearchResults";
import CategoriesPage from "./LandigPage/Categorias/CategoriesPage";
import Admin from "./LandigPage/admin/admin";
import CoursePlatform from "./LandigPage/User/Profesor/ProfessorCoursesPlataform/ProfessorCoursesPlataform";
import CheckoutPage from "./LandigPage/CheckoutPage/CheckoutPage ";
import { PurchasedCoursesProf } from "./LandigPage/User/Profesor/PurchasedCoursesProf";
import UserCoursePlatform from "./LandigPage/User/User/UserCoursePlatform/UserCoursePlatform";

function App() {
  return (
    <div>
      <BrowserRouter>
        <UserProvider>
          <FavoritesProvider>
            <Navbar />
            <Routes>
              <Route path="admin" element={<Admin />} />
              <Route path="/" element={<HomePage />} />
              <Route path="Login" element={<LoginForm />} />
              <Route path="register" element={<RegisterForm />} />
              <Route path="/CategoriesPage/:categoryName" element={<CategoriesPage/>} />
              <Route path="/usermenu/*" element={<UserMenu />}>
                <Route path="change-password" element={<ChangePasswordForm />}/>
                <Route path="data" element={<DataComponent />} />
                <Route path="my-courses-alumno" element={<MyCoursesAlumno />} />
                <Route path="favorites-alumno" element={<FavoritesAlumno />} />
              </Route>
              <Route path="/professormenu/*" element={<ProfessorMenu />}>
                <Route path="add-course" element={<AddCourseForm />} />
                <Route path="change-password" element={<ChangePasswordForm />}/>  
                <Route path="data" element={<DataComponent />} />
                <Route path="my-courses-professor" element={<MyCoursesProfessor />} />
                <Route path="purchased-courses-professor" element={<PurchasedCoursesProf />} />
                <Route path="favorites-professor" element={<FavoritesProfessor />}/>
            
              </Route>
              <Route path= "/course-platform/:id" element={<CoursePlatform/>} />
                <Route path= "/course-user-platform/:id" element={<UserCoursePlatform/>} />
              <Route path="/search/:searchTerm" element={<SearchResults />} />
              <Route path="/course/:id" element={<CourseDetail />} />
              <Route path="/checkout" element={<CheckoutPage />} />
           
            </Routes>
          </FavoritesProvider>
        </UserProvider>
      </BrowserRouter>

    </div>
    
  );
}

export default App;
