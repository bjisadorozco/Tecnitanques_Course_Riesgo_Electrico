import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import { setPorcentajeTraking, getPorcentajeTraking } from "../../traking.js";

function Drawer({ isOpen, closeDrawer }) {
  const navigate = useNavigate();
  const location = useLocation(); // Para obtener la ruta actual

  // Definir rutas asociadas a los elementos
  const routes = {
    "Presentación": "/",
    "Introducción": "/introduccion",
    "Contenido": "/slides",
    "Evaluación": "/evaluación",
    "Mis cursos": "https://tecnitanques.sofactia.pro/courses/",
    "Cerrar sesión": "/",
  };

  // Manejar navegación
  const handleNavigation = (route, item) => {
    if (item === "Contenido" && location.pathname === "/slides") {
      window.location.reload();
    } else if (item === "Mis cursos") {
      window.location.href = route;
    } else if (route) {
      navigate(route);
      closeDrawer();
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-40 ${isOpen ? "block" : "hidden"
        }`}
      onClick={closeDrawer}
    >
      <div
        className={`fixed right-0 top-0 h-full  bg-white shadow-lg z-50 p-4 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end items-center">
          <a onClick={closeDrawer} className="text-gray-700 cursor-pointer">
            <FontAwesomeIcon icon={faTimes} />
          </a>
        </div>
        <div className="p-4">
          <h1 className="text-blue-600 font-arial font-bold text-xl">Hola!</h1>
          <p className="text-green-600 font-bold">
            Bienvenido a su Ruta de Aprendizaje!
          </p>
          <div className="my-4">
            <p className="font-bold">
              Progreso:
              <span className="bg-green-500 text-white rounded-full px-2 ml-4">
              {" " + getPorcentajeTraking() + "% "}
              </span>
            </p>
          </div>
          <hr className="h-2 mx-auto my-4" />
          <ul className="space-y-2">
            {[
              "Presentación",
              "Introducción",
              "Contenido",
              "Evaluación",
              "Mis cursos",
              "Cerrar sesión",
            ].map((item, index) => (
              <li
                key={index}
                onClick={() => handleNavigation(routes[item], item)} // Pasar el nombre del elemento para validación
                className={`p-2 ${item === "Contenido" ? "bg-green-200" : "bg-gray-100"
                  } flex justify-start gap-2 items-center rounded-lg hover:bg-gray-300 hover:cursor-pointer`}
              >
                <FontAwesomeIcon icon={faCaretRight} size="md" />
                {item}
              </li>
            ))}
          </ul>
          <div className="my-4">
            <hr className="h-2 mx-auto my-4" />
            <p className="font-bold text-center text-black text-sm">
              TUS ESTADISTICAS GENERALES
            </p>
            <div className="flex justify-start items-center gap-2 ">
              {/* <img src={RutaIcon} className=" w-12 p-0 m-0" /> */}
              <p>Has recorrido un {getPorcentajeTraking()}% de tu ruta de aprendizaje.</p>
            </div>
            <hr className="h-2 mx-auto my-4" />
            <div className="bg-zinc-200 p-6">
              <p className="text-center text-black font-bold text-xs">
                © Sofactia. powered by Unydos
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Drawer;
