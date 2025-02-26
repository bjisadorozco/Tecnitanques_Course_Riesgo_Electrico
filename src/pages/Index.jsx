import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../assets/img/logo_tecnitanques_blanco.webp";
// Cambia el URL del video aquí
import VideoBienvenida from "../assets/video/video_intro_hd.mp4";
import "./Index.css";
import { useNavigate } from "react-router-dom";
import { faHandPointRight } from "@fortawesome/free-solid-svg-icons";

function Index() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/introduccion");
  };

  return (
    <div>
      <div className="contInd text-[40px] md:text-5xl parrafo z-20 mt-[-30px]">
        <div className="w-[40%]">
          <img src={Logo} alt="LogoW" />
        </div>
        <div>
          <h1 className="font-alata font-bold mt-2 text-white">
            Riesgo Eléctrico
            <br /> (Aislamiento Seguro,
            <br /> Bloqueo y Tarjeteo)
          </h1>
        </div>
      </div>
      <video id="iniVideo" autoPlay muted loop className="h-screen">
        {/* Asegúrate de que la nueva ruta del video esté correctamente referenciada aquí */}
        <source src={VideoBienvenida} type="video/mp4" />
      </video>
      <div className="opacidad z-10"></div>

      <button
        className="button-1 button-right z-20"
        role="button"
        id="btn_espanol"
        onClick={handleClick}
      >
        <span className="button-1-shadow"></span>
        <span className="button-1-edge bg-secondary-color"></span>
        <span className="button-1-front bg-secondary-color text hover:-translate-y-2 font-alata">
          <FontAwesomeIcon icon={faHandPointRight} className="pr-1" /> Iniciar
        </span>
      </button>
    </div>
  );
}

export default Index;
