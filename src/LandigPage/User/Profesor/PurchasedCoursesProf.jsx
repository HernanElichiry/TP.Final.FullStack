import { useEffect, useState } from "react";
import { useUser } from "../UserContext/UserContext";
import Cookies from "js-cookie";
import { PurchasedFavCard } from "./PurchasedFavCard";
import { motion, AnimatePresence } from "framer-motion";
import { PopupCourseDetail } from "./PopupCourseDetail";

export const PurchasedCoursesProf = () => {
    const [courses, setCourses] = useState([]);
    const [selectedId, setSelectedId] = useState(null); // Estado para la tarjeta seleccionada
    const user = useUser();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const token = Cookies.get("token");
                const user_id = user.user.sub;

                const response = await fetch(`http://localhost:3000/buy-courses/${user_id}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });
                const data = await response.json();
                setCourses(data);
            } catch (error) {
                console.error("Error al obtener los cursos:", error);
            }
        };

        fetchCourses();
    }, []);

    return (
        <div>
            <h2>Mis Cursos</h2>
            <div className="buycourses-grid">
                {courses.length > 0 ? (
                    courses.map((course) => (
                        <PurchasedFavCard
                            key={course.id}
                            course={course}
                            setSelectedId={setSelectedId}
                        />
                    ))
                ) : (
                    <p className="no-courses-message">No tiene cursos Comprados.</p>
                )}
            </div>

            {/* Renderizar la ventana emergente al seleccionar un curso */}
            <AnimatePresence>
                {selectedId && (
                      <PopupCourseDetail
                        key={selectedId}
                        course={courses.find((c) => c.id === selectedId)}
                        onClose={() => setSelectedId(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};
