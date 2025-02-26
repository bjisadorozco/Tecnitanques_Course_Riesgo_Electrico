import '../templates/styles/EvaluacionCursoTemplate.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import imgEvaluacion from "../assets/img/avatar_neutro.webp"
import Title from "../pages/components/Title";
import Subtitle from "../pages/components/Subtitle";
import Paragraph from "../pages/components/Paragraph";
import Instruction from "../pages/components/Instruction";
import Button from "../pages/components/Button";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useStore from "../store";
import { setArrayValidacionTraking, getArrayValidacionTraking, setPorcentajeTraking, getPorcentajeTraking } from "../traking.js";
import axios from 'axios';
import React, { useState, useEffect } from "react";

function EvaluacionCurso() {
    const isMobile = useMediaQuery({ maxWidth: 640 });
    const navigate = useNavigate();
    const isOnDivisor = useStore((state) => state.isOnDivisor);

    const handleGoBack = () => {
        // Navegar de vuelta a la última diapositiva
        navigate('/slides', { state: { returnFromEvaluation: true } });
    };

    const [porcentaje, setPorcentaje] = useState(0);

    useEffect(() => {
        const logEmployeeData = () => {
            const params = new URLSearchParams(window.location.search);
            axios.get('../../../data_user.php', {
                params: {
                    course_code: params.get('course_code'),
                    uid: params.get('uid'),
                    mid: params.get('mid')
                }
            })
                .then((response) => {
                    const datos = response.data;
                    if (datos.data_course[0].react_progress_object !== "") {
                        setArrayValidacionTraking(JSON.parse(datos.data_course[0].react_progress_object));
                        const storedArray = getArrayValidacionTraking();
                        const sum = storedArray.length;
                        const porcentajeCalculado = (sum / 22) * 100;
                        setPorcentajeTraking(parseInt(porcentajeCalculado));
                        setPorcentaje(parseInt(porcentajeCalculado)); // Actualizamos el estado
                    } else {
                        addNumber(1);
                        setPorcentajeTraking(0);
                        setPorcentaje(0); // Asegurar que porcentaje se actualiza
                    }
                })
                .catch((error) => {
                    console.error('Error al obtener los datos:', error);
                });
        };

        logEmployeeData();
    }, []); // Solo se ejecuta cuando se monta el componente

    return (
        <div
            className={`flex h-[100vh] bg-dark-color px-6 py-8 overflow-x-hidden `}
            style={{ justifyContent: isMobile ? 'start' : 'center', alignItems: isMobile ? 'start' : 'center' }}
        >
            {/* version web */}
            <div
                className="web-active absolute bottom-0 right-1/2 md:right-auto md:left-0 md:top-1/2 md:bottom-auto group md:h-fit transform -translate-y-1/2 z-10 hover:bg-gray-300/50 transition duration-300 rounded-md py-0 md:py-0 cursor-pointer"
                onClick={handleGoBack}
            >
                <FontAwesomeIcon
                    icon={faChevronLeft}
                    size="4x"
                    className={`${isOnDivisor === true ? "group-hover:text-main-color text-white" : "group-hover:text-main-color text-secondary-color"} transition-colors px-4 py-2`}
                />
            </div>
            {/* <div
                className="absolute top-5 left-5 cursor-pointer group z-10"
                onClick={handleGoBack}
            >
                <FontAwesomeIcon
                    icon={faChevronLeft}
                    size="2x"
                    className="text-white group-hover:text-purple-500 transition-colors duration-300"
                />
            </div> */}
            <div className="flex md:flex-row items-center justify-center w-full max-w-6xl relative" style={{ left: isMobile ? '0' : '4rem', flexDirection: isMobile ? 'column' : 'row', top: isMobile ? '0' : '0' }}>
                {/* Columna Izquierda (Texto) */}
                <div className="md:w-1/2 w-full max-w-md mb-8 md:mb-0 text-white text-center md:text-left mb-36 md:mb-0">
                    <div className="md:mb-6 mb-3 flex justify-center items-center">
                        <Title>EVALUACIÓN</Title>
                    </div>
                    <Paragraph theme='dark' justify={isMobile ? 'justify' : 'justify'}>
                        Ahora vamos a ver cuánto has aprendido.
                        Al hacer clic afirmas que eres la misma persona que ha realizado este curso,
                        y que va a presentar la evaluación.
                    </Paragraph>
                    <div className="w-auto justify-center items-center">
                        <Instruction arrow="down" theme="dark" className="my-4">
                            {porcentaje >= 70 ? (
                                "Alcanzaste el puntaje mínimo del 70% y desbloqueaste la evaluación final."
                            ) : "Tu puntaje actual es del " + porcentaje + "%. No puedes presentar la Evaluación, revisa el módulo y vuelve a intentarlo."}
                        </Instruction>
                    </div>
                    {porcentaje >= 70 ? (
                        <div className=" flex justify-center items-center">
                            <button
                                onClick={() =>
                                (window.location.href =
                                    "https://tecnitanques.sofactia.pro/amatia/audit/1734369986/CeZMYIQzmulAW6efSnOmwr6Pp7nKbqxj5k4y8d732NgDTl93IPJ0ZaRoup5VGi1z")
                                }
                                className="flex justify-center items-center bg-button-color hover:bg-button-color/80 rounded-full px-6 py-2 text-white mx-auto md:mx-0 my-4 transition duration-300"
                            >
                                <i className="fa fa-check mr-2"></i> Iniciar Evaluación
                            </button>
                        </div>
                    ) : null}
                    {/* <div className=" flex justify-center items-center">
                        <button
                            style={{ backgroundColor: '#003454' }}
                            className="flex justify-center items-center bg-button-color hover:bg-button-color/80 rounded-full px-6 py-2 text-white mx-auto md:mx-0 my-4 transition duration-300"
                        >
                            <i className="fa fa-check mr-2"></i> Iniciar Evaluación
                        </button>
                    </div> */}
                    <Paragraph theme='dark' justify={isMobile ? 'justify' : 'center'} className="mt-4">
                        Recuerda que debes superar el 70% de la valoración para aprobar el módulo.
                    </Paragraph>
                </div>

                {/* Columna Derecha (Imagen Holográfica) */}
                <div className="md:w-1/2 w-full md:w-[50%] flex justify-center items-center mt-8 md:mt-0">
                    <div className="hologram-container">
                        <div className="hologram-image">
                            <img
                                src={imgEvaluacion}
                                alt="Trabajador con Diploma"
                                className="w-full h-full"
                            />
                        </div>
                        <div className="hologram-ring"></div>
                        <div className="hologram-dots"></div>
                    </div>
                </div>
                {/* version mobile */}
                <div className="mobile-active relative bottom-[-8.75rem] left-1 cursor-pointer group z-10">
                    <div
                        className="static bottom-0 right-1/2 md:right-auto md:left-0 md:top-1/2 md:bottom-auto group md:h-fit transform -translate-y-1/2 z-10 hover:bg-gray-300/50 transition duration-300 rounded-md py-0 md:py-0 cursor-pointer"
                        onClick={handleGoBack}
                    >
                        <FontAwesomeIcon
                            icon={faChevronLeft}
                            size="4x"
                            className={`${isOnDivisor === true ? "group-hover:text-main-color text-white" : "group-hover:text-main-color text-secondary-color"} transition-colors px-4 py-2`}
                        />
                    </div>
                </div>
            </div>

            <style jsx>{`
        .hologram-container {
          position: relative;
          width: 300px;
          height: 300px;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: visible;
        }
        .hologram-image {
          position: relative;
          z-index: 2;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          overflow: hidden;
          background-color: #003454;
        }
        .hologram-ring {
          position: absolute;
          top: -5%;
          left: -5%;
          right: -5%;
          bottom: -5%;
          border: 2px solid #003454;
          border-radius: 50%;
          animation: rotate 20s linear infinite;
        }
        .hologram-dots {
          position: absolute;
          top: -10%;
          left: -10%;
          right: -10%;
          bottom: -10%;
          background-image: radial-gradient(circle, #003454 2px, transparent 2px);
          background-size: 20px 20px;
          opacity: 0.5;
          animation: rotate 30s linear infinite reverse;
        }
        @keyframes rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
        </div>
    );
}

export default EvaluacionCurso;