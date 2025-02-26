import { useState, useEffect } from "react";
import { useImageToggle } from "../../assets/js/interactividad.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/css/styleSlider.css";
import audioAlgunaVez from "../../assets/audio/Sld5_alguna_vez_te_haz_v1.mp3";
import audioComparte from "../../assets/audio/Sld_5_comparte_whatsapp.mp3";
import imgComparteColor from "../../../src/assets/img/botones/comparte-color.png";
import imgSl14_9 from "../../../src/assets/img/sl14-9.png";
import imgSl14_3 from "../../../src/assets/img/sl14-3.png";
import imgSl14_1 from "../../../src/assets/img/sl14-1.png";
import imgSignoInterrogacion from "../../assets/img/signo_interrogacion.png";
import Button from '../components/Button.jsx'
import Subtitle from '../components/Subtitle.jsx'
import Title from '../components/Title.jsx'
import Instruction from '../components/Instruction.jsx'
import Paragraph from '../components/Paragraph.jsx'
import useStore from '../../store';
import { faShare } from "@fortawesome/free-solid-svg-icons";

function ExperimentadoAtrapamiento() {
  const words = ['Sufrido una quemadura?', 'Sufrido un choque eléctrico?', 'Experimentado un atrapamiento?'];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [imageShown, mostrarImagen] = useImageToggle([false, false, false]);
  const [showModal, setShowModal] = useState(false);

  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);

  useEffect(() => {
    setIsOnDivisor(false);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        setFade(true);
      }, 500);
    }, 2000);

    return () => clearInterval(interval);
  }, [words.length]);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  // Image data for better organization
  const imageData = [
    {
      id: 0,
      hiddenImg: imgSignoInterrogacion,
      revealedImg: imgSl14_1,
      altText: "Sufrido una quemadura",
      caption: "SUFRIDO UNA QUEMADURA"
    },
    {
      id: 1,
      hiddenImg: imgSignoInterrogacion,
      revealedImg: imgSl14_3,
      altText: "Choque eléctrico",
      caption: "CHOQUE ELÉCTRICO"
    },
    {
      id: 2,
      hiddenImg: imgSignoInterrogacion,
      revealedImg: imgSl14_9,
      altText: "Atrapamiento",
      caption: "ATRAPAMIENTO"
    }
  ];

  return (
    <>
      <div className="flex flex-col md:flex-row mb-36 md:mb-0">
        {/* Left Column */}
        <div className="md:flex-1 bg-dark-color md:w-1/2 w-full h-fit md:h-screen px-2 flex-col justify-center items-center">
          <div className="h-full my-3 flex flex-col justify-center items-center">
            <Title>¿Alguna vez has…</Title>

            <div className="px-auto text-center">
              <Subtitle>{words[currentWordIndex]}</Subtitle>
            </div>

            <div className="my-3"></div>

            <div className='px-0 md:mx-24'>
              <Paragraph clasName='text-justify' justify="justify">
                Si alguna vez has sufrido alguna quemadura, choque eléctrico, un
                atrapamiento de alguna parte del cuerpo (de un pie, o una mano con
                un guante atrapado con una máquina) Es porque estas interactuando
                con diferentes tipos de energía.
              </Paragraph>
            </div>
            <Instruction arrow="down">Haz clic sobre el audio</Instruction>
            <audio controls className="media-espanol">
              <source src={audioAlgunaVez} type="audio/mp3" />
            </audio>

            {/* Botón de WhatsApp */}
            <div className="mt-4">
              <Button
                icon={faShare}
                roundedFull="true"
                onClick={handleShow}
              >Comparte
              </Button>
            </div>
          </div>
        </div>

        {/* Right Column - Refactored for custom layout */}
        <div className="md:flex-2 bg-white md:w-1/2 w-full h-auto md:mt-0 md:pr-20 flex mx-auto justify-center items-center">
          <div className="flex flex-col justify-center items-center p-6 gap-4 h-auto md:h-[90vh] max-w-[100%] mx-auto">
            <Instruction theme="light" arrow="down">
              Haz clic sobre los círculos y descubre la imagen
            </Instruction>

            {/* Custom layout: vertical on mobile, 2 top + 1 bottom centered on desktop */}
            <div className="w-full">
              {/* Mobile: Vertical stack */}
              <div className="block md:hidden">
                {imageData.map((item) => (
                  <div key={item.id} className="flex flex-col items-center justify-center mb-10">
                    <div className="image-container relative w-[150px] h-[150px] flex justify-center items-center">
                      {!imageShown[item.id] ? (
                        <img
                          className="interrogacion track-element w-full h-full"
                          src={item.hiddenImg}
                          alt="Interrogación"
                          onClick={() => mostrarImagen(item.id)}
                        />
                      ) : (
                        <img
                          className="w-full h-full"
                          src={item.revealedImg}
                          alt={item.altText}
                        />
                      )}
                    </div>
                    <div className="mt-3">
                      <Paragraph theme="ligth">{item.caption}</Paragraph>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop: 2 top, 1 bottom centered */}
              <div className="hidden md:block">
                {/* Top row with 2 images */}
                <div className="flex justify-center gap-16 mb-10">
                  {imageData.slice(0, 2).map((item) => (
                    <div key={item.id} className="flex flex-col items-center">
                      <div className="image-container relative w-[150px] h-[150px] flex justify-center items-center">
                        {!imageShown[item.id] ? (
                          <img
                            className="interrogacion track-element w-full h-full"
                            src={item.hiddenImg}
                            alt="Interrogación"
                            onClick={() => mostrarImagen(item.id)}
                          />
                        ) : (
                          <img
                            className="w-full h-full"
                            src={item.revealedImg}
                            alt={item.altText}
                          />
                        )}
                      </div>
                      <div className="mt-3">
                        <Paragraph theme="ligth">{item.caption}</Paragraph>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom row with 1 centered image */}
                <div className="flex justify-center">
                  <div className="flex flex-col items-center">
                    <div className="image-container relative w-[150px] h-[150px] flex justify-center items-center">
                      {!imageShown[2] ? (
                        <img
                          className="interrogacion track-element w-full h-full"
                          src={imageData[2].hiddenImg}
                          alt="Interrogación"
                          onClick={() => mostrarImagen(2)}
                        />
                      ) : (
                        <img
                          className="w-full h-full"
                          src={imageData[2].revealedImg}
                          alt={imageData[2].altText}
                        />
                      )}
                    </div>
                    <div className="mt-3">
                      <Paragraph theme="ligth">{imageData[2].caption}</Paragraph>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <>
          {/* Backdrop oscuro */}
          <div className="backdrop" onClick={handleClose}></div>

          <div className="modal show fade d-block mt-4" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-contenido">
                <div className="bg-main-color modal-header">
                  <h5 className="modal-title">Comparte</h5>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={handleClose}
                  ></button>
                </div>
                <div className="modal-body">
                  <Paragraph theme="ligth">
                    ¿Has presenciado o vivido un evento con energías peligrosas
                    en el trabajo o en el hogar, y cómo se pudo haber evitado?
                  </Paragraph>
                  <div className="flex justify-center">
                    <audio controls className="media-espanol center-media">
                      <source src={audioComparte} type="audio/mp3" />
                    </audio>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ExperimentadoAtrapamiento;