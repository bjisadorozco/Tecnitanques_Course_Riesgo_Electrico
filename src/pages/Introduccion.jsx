import logoMorelco from '../assets/img/logo_tecnitanques_blanco.webp';
import background from '../assets/img/fondo01.webp';
import { Clock, BookOpen, User, CheckSquare } from 'lucide-react';
import ButtonNext from './components/ButtonNext';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from "react-responsive";
import React, { useState } from 'react';
import axios from 'axios';
import { setArrayValidacionTraking, getArrayValidacionTraking, setPorcentajeTraking, getPorcentajeTraking } from "../traking.js";

export default function Introduccion() {
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const sections = [
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Duración del Curso",
      content: [
        { label: "Tiempo máximo estimado de duración virtual", value: "1 hora" },
        { label: "Tiempo asociado a su perfil de formación", value: "4 horas" }
      ]
    },
    {
      icon: <User className="w-8 h-8" />,
      title: "Objetivo del Curso",
      content: [
        { label: "Este curso le permitirá", value: " Desarrollar habilidades prácticas para manejar cargas de forma segura y eficiente, reduciendo el riesgo de lesiones." }
      ]
    },
    {
      icon: <CheckSquare className="w-8 h-8" />,

      title: "Usted podrá:",
      content: [
        { label: "1", value: "Reconocer las políticas de seguridad que buscan cuidarte en la operación." },
        { label: "2", value: "Recordar los principios del bloqueo y etiquetado." },
        { label: "3", value: "Conocer el procedimiento de bloqueo y etiquetado." }
      ]
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Recomendaciones",
      content: [
        { label: "1", value: "Disponerse a adquirir nuevos conocimientos y reforzar los existentes para su seguridad" },
        { label: "2", value: "Disponer el tiempo mínimo estimado de duración para tomar este curso" },
        { label: "3", value: "Contar con conexión a internet" },
        { label: "4", value: "Realizar todas las actividades de refuerzo y repetirlas si es necesario" },
        { label: "5", value: "No olvides firmar tu compromiso y presentar la Evaluación del curso" },
        { label: "6", value: "Si estás en un lugar abierto, usa AUDÍFONOS; hay audios con información valiosa que no te querrás perder" }
      ]
    }
  ];

  const navigate = useNavigate();

  const addNumber = (number) => {
    const storedArray = (getArrayValidacionTraking()) || [];
    if (!storedArray.includes(number)) {
      const updatedNumbers = [...storedArray, number];
      setArrayValidacionTraking((updatedNumbers));
    }
  };

  const handleClick = () => {
    logEmployeeData();
    navigate("/slides");
  };

  const logEmployeeData = () => {
    const params = new URLSearchParams(window.location.search);
    axios.get('../../../data_user.php',
      {
        params: {
          course_code: params.get('course_code'),
          uid: params.get('uid'),
          mid: params.get('mid')
        }
      }
    )
      .then((response) => {
        const datos = response.data;
        if (datos.data_course[0].react_progress_object != "") {
          setArrayValidacionTraking((JSON.parse(datos.data_course[0].react_progress_object)));
          const storedArray = getArrayValidacionTraking();
          const sum = storedArray.length;
          const porcentaje = (sum / parseInt(22)) * 100;
          setPorcentajeTraking(parseInt(porcentaje));
        } else {
          addNumber(parseInt(1))
          setPorcentajeTraking(0)
        }
      })
      .catch((error) => {
        console.error('Error al obtener los datos:', error);
      });
  };


  return (
    <div className="mx-auto p-6 md:h-screen h-auto"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8)), url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className={`relative mb-14 flex ${isMobile ? 'flex-col items-center' : 'flex-col'}`}>
        <div style={{ justifyContent: isMobile ? 'center' : 'center', }} className={`absolute flex top-0 ${isMobile ? 'relative' : 'left-0'}`}>
          <img src={logoMorelco} className="w-36" alt="logo" />
        </div>

        {/* Título centrado */}
        <h1
          className="text-3xl font-bold text-white pt-2"
          style={{
            justifyContent: isMobile ? 'center' : 'center',
            alignItems: isMobile ? 'center' : 'center',
            textAlign: isMobile ? 'center' : 'center'
          }}
        >
          Información del Curso
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg hover:shadow-xl hover:shadow-main-color/30 transition-shadow size-cuadros">
            <div className="p-4 bg-introduccion">
              <div className="flex items-center space-x-4">
                <div className="text-white bg-introduccion p-2 rounded-full">{section.icon}</div>
                <h2 className="text-xl font-semibold text-white">{section.title}</h2>
              </div>
            </div>
            <div className="p-4">
              {section.content.map((item, itemIndex) => (
                <div key={itemIndex} className="mb-2">
                  <span className="font-medium text-gray-700">{item.label}: </span>
                  {Array.isArray(item.value) ? (
                    <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                      {item.value.map((subItem, subIndex) => (
                        <li key={subIndex} className="text-gray-600">{subItem}</li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-gray-600">{item.value}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className='flex justify-center items-center my-6'>
        <ButtonNext
          bold={false}
          icon={faArrowRight}
          roundedFull={true}
          onClick={handleClick}
        >
          Siguiente
        </ButtonNext>
      </div>
    </div>
  );
}
