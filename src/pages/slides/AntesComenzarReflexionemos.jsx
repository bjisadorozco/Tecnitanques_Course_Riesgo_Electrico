import Title from "../../pages/components/Title";
import Subtitle from "../../pages/components/Subtitle";
import Paragraph from "../../pages/components/Paragraph";
import Instruction from "../../pages/components/Instruction";
import Button from "../../pages/components/Button";
import ModalDialog from "../../pages/components/ModalDialog";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import useStore from "../../store";
import { useMediaQuery } from "react-responsive";
import imgSabiasQue from "../../assets/img/botones/pregunta_icono.webp";
import gifPresentacion from "../../assets/img/cuerpo_completo/avatar_completo_neutro.webp"

function AntesComenzarReflexionemos() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const handleOpenModal = () => {
    setIsModalOpen(true);
  }
  useEffect(() => {
    setIsOnDivisor(false);
  }, [setIsOnDivisor]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  return (
    <div className="flex flex-col md:flex-row overflow-x-hidden mb-36 md:mb-0">
      <div className="md:flex-1 bg-dark-color md:w-1/2 w-full h-auto md:h-screen py-6 md:py-3 px-[6px] md:px-[14px] flex-col justify-center items-center">
        <div className="h-full my-auto flex flex-col justify-center items-center">
          {/* Left Column */}
          <div className="my-8 text-center">
            <Title>Antes de comenzar...</Title>
            <Subtitle>Reflexionemos...</Subtitle>
          </div>
          <div className="px-6 md:px-14 text-justify">
            <Paragraph justify={isMobile ? 'justify' : 'center'}>
              Lee esta situación y concluye: ¿Realmente vale la pena realizar nuestra labor diaria, sin identificar los peligros alrededor y protegernos de estos?
            </Paragraph>
            <br />
            <Paragraph justify={isMobile ? 'justify' : 'justify'}>
              Tamara es un operario de obra desde hace varios meses, es muy positiva y ve en su trabajo diario muchas oportunidades para aprender, superarse, colaborar y progresar en su desempeño laboral y profesional.
              Sin embargo, el entorno de trabajo también está lleno de PELIGROS que conllevan unos RIESGOS que pueden ocasionar ACCIDENTES DE TRABAJO y ENFERMEDADES LABORALES a largo plazo.
              Tamara, como tú, trabaja para sí mismo y para su familia... Pero desafortunadamente, aún no presta mucha atención a los peligros y riesgos...
            </Paragraph>
            <br />
            <Paragraph justify={isMobile ? 'justify' : 'center'}>
              ¡¡Veamos cómo este curso puede ayudarle...!!
            </Paragraph>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="md:flex-1 bg-white md:w-1/2 w-full h-auto md:h-screen py-6 md:py-3 px-[6px] md:px-[14px] flex-col justify-center items-center">
        <div className="h-full my-auto flex flex-col justify-center items-center">
          {/* Left Column */}
          <div className=" px-6 md:px-14 flex justify-center w-auto">
            <Instruction arrow="down" theme="ligth">
              Haz clic en el botón para ver la pregunta
            </Instruction>
          </div>
          <div className="w-[40%]">
            <img src={gifPresentacion} alt="gif de presentacion" />
          </div>
          <Button
            bold={false}
            icon={faCircleQuestion}
            roundedFull={true}
            onClick={handleOpenModal}
          >
            Pregunta
          </Button>
        </div>
      </div>

      <ModalDialog
        open={isModalOpen}
        handleClose={handleCloseModal}
        title="Pregunta"
      >
        <div className="flex justify-center">
          <img
            src={imgSabiasQue}
            alt="Imagen pregunta"
            className="image-boton w-32"
          />
        </div>
        <Paragraph theme="ligth" justify={isMobile ? 'justify' : 'justify'}>
          ¿Consideras que el jefe de Tamara tiene alguna responsabilidad en que él todavía no tenga en cuenta los peligros y riesgos en su trabajo?
        </Paragraph>
      </ModalDialog>
    </div>
  );
}

export default AntesComenzarReflexionemos;
