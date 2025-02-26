import { useState, useEffect } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Autoplay } from "swiper/modules"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBan, faLock, faBookmark } from "@fortawesome/free-solid-svg-icons"
import useStore from "../../store"
import { useMediaQuery } from "react-responsive" // Añade esta importación

import Title from "../components/Title"
import Subtitle from "../components/Subtitle"
import Instruction from "../components/Instruction"

import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

// Import images
import KitBloqueoSlide1 from "../../assets/img/Kit-Bloqueo-Slide-1.png"
import KitBloqueoSlide2 from "../../assets/img/Kit-Bloqueo-Slide-2.png"
import KitBloqueoSlide3 from "../../assets/img/Kit-Bloqueo-Slide-3.png"
import KitBloqueoSlide4 from "../../assets/img/Kit-Bloqueo-Slide-4.png"

import KitCandadoSlide1 from "../../assets/img/Kit-Candado-Slide-1.png"
import KitCandadoSlide2 from "../../assets/img/Kit-Candado-Slide-2.png"
import KitCandadoSlide3 from "../../assets/img/Kit-Candado-Slide-3.png"
import KitCandadoSlide4 from "../../assets/img/Kit-Candado-Slide-4.png"
import KitCandadoSlide5 from "../../assets/img/Kit-Candado-Slide-5.png"

import KitEtiquetaSlide1 from "../../assets/img/Kit-Etiqueta-Slide-1.png"
import KitEtiquetaSlide2 from "../../assets/img/Kit-Etiqueta-Slide-2.png"
import Paragraph from "../components/Paragraph"

const tabData = [
  {
    id: "bloqueo",
    icon: faBan,
    label: "ELEMENTOS DE BLOQUEO",
    slides: [
      { imageURL: KitBloqueoSlide1, text: "Bloqueo de Válvulas" },
      { imageURL: KitBloqueoSlide2, text: "Bloqueo de Válvulas" },
      { imageURL: KitBloqueoSlide3, text: "Bloqueo de Válvulas" },
      { imageURL: KitBloqueoSlide4, text: "Bloqueo de Válvulas" },
    ],
  },
  {
    id: "candados",
    icon: faLock,
    label: "CANDADOS",
    slides: [
      { imageURL: KitCandadoSlide1, text: "Amarillo: Operaciones / Producción" },
      { imageURL: KitCandadoSlide2, text: "Rojo: Eléctrico" },
      { imageURL: KitCandadoSlide3, text: "Verde: Instrumentación" },
      { imageURL: KitCandadoSlide4, text: "Azul: Mecánico" },
      { imageURL: KitCandadoSlide5, text: "Naranja: Contratista" },
    ],
  },
  {
    id: "etiquetas",
    icon: faBookmark,
    label: "ETIQUETAS",
    slides: [
      { imageURL: KitEtiquetaSlide1, text: "Qué, quién, tipo de peligro, advertencias" },
      { imageURL: KitEtiquetaSlide2, text: "Qué, quién, tipo de peligro, advertencias" },
    ],
  },
]

function ReconoceElementosKitBloqueo() {
  const [activeTab, setActiveTab] = useState("bloqueo")
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor)
  const isMobile = useMediaQuery({ maxWidth: 768 }) // Detectar si es móvil

  useEffect(() => {
    setIsOnDivisor(false)
  }, [setIsOnDivisor])

  return (
    <div className="flex flex-col md:flex-row mb-36 md:mb-0">
      {/* Left Column */}
      <div className="md:flex-1 bg-dark-color md:w-1/2 w-full sm:h-screen py-6 px-2 sm:px-24 flex-col justify-center items-center">
        <div className="h-full my-auto flex flex-col justify-center items-center px-6">
          <div className="px-6 text-center">
            <Title className="text-white text-center font-bold text-title-size mt-6">
              Reconoce los Elementos del KIT de Bloqueo
            </Title>
          </div>
          <Subtitle>¡Conoce cada elemento!</Subtitle>
          <div className="md:mx-24 my-3 mb-3 text-justify">
            <Paragraph justify="justify">
              El KIT de bloqueo es esencial para la seguridad en el trabajo. Cada elemento cumple una función específica
              en el proceso de bloqueo y etiquetado, asegurando la protección de los trabajadores durante el mantenimiento
              de equipos.
            </Paragraph>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="md:flex-2 bg-white md:w-1/2 w-full md:h-screen px-10 md:pr-20 flex mx-auto justify-center items-center">
        <div className="flex flex-col justify-center items-center p-0 gap-4 sm:h-[90vh] max-w-[100%] mx-auto">
          <Instruction theme="light" arrow="down">
            Haz clic en las pestañas para ver el contenido
          </Instruction>

          <div className="bg-white rounded-lg shadow-md overflow-hidden w-full">
            {/* Cambio de flex a flex-col en móviles */}
            <div className={`${isMobile ? 'flex-col' : 'flex'} border-b`}>
              {tabData.map((tab) => (
                <button
                  key={tab.id}
                  className={`${isMobile ? 'w-full py-3' : 'flex-1 py-2'} px-4 text-sm font-medium text-center focus:outline-none ${activeTab === tab.id ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <FontAwesomeIcon icon={tab.icon} className="mr-2" />
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-4">
              {tabData.map((tab) => (
                <div key={tab.id} className={activeTab === tab.id ? "block" : "hidden"}>
                  <Swiper
                    modules={[Pagination, Autoplay]}
                    loop={true}
                    slidesPerView={1}
                    spaceBetween={30}
                    autoplay={{
                      delay: 3500,
                      disableOnInteraction: false,
                    }}
                    className={`${isMobile ? 'h-[50vh]' : 'h-[60vh]'}`}
                  >
                    {tab.slides.map((slide, index) => (
                      <SwiperSlide key={index}>
                        <div className="relative h-full">
                          <img
                            src={slide.imageURL || "/placeholder.svg"}
                            alt={slide.text}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 flex items-end justify-center p-4 bg-gradient-to-t from-black/60 to-transparent">
                            <h2 className="text-white text-xl font-bold text-center">{slide.text}</h2>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReconoceElementosKitBloqueo