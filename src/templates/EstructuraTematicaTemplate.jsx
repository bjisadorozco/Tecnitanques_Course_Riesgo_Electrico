import momento1 from "../assets/img/momentos/moment-1.png";
import momento2 from "../assets/img/momentos/moment-2.png";
import momento3 from "../assets/img/momentos/moment-3.png";
import Paragraph from "../pages/components/Paragraph";
import Instruction from "../pages/components/Instruction";
import "../templates/styles/EstructuraTematica.css"

import { useEffect } from "react";
import useStore from "../store";

function EstructuraTematica() {

  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);

  useEffect(() => {
    setIsOnDivisor(false);
  }, [])
  return (
    <div className="px-4 w-full flex items-center justify-center mb-36 md:mb-0">
      <div className="container current pt-3">
        <div className="col-lg-12 col-md-12 flex flex-col justify-center items-center">
          <div className="text-center">
            <h1 className="text-title-size font-bold text-secondary-color text-center mb-2">
              Estructura temática
            </h1>
            <div>
            <Paragraph theme='ligth' justify='justify'>
            A través del recorrido  de este módulo, te invitamos a revisar estos 3 momentos de aprendizaje
            </Paragraph>
            </div>
            <div className="w-auto flex justify-center items-center">
            <Instruction arrow="down" theme="light">
              Desplaza el mouse sobre cada imagen para ver el contenido
            </Instruction>
            </div>
          </div>
          <section className="section-tours my-3">
            <div className="container bgazul-doble-lateral p-0">
              <div className="row">
                <div className="col-lg-12 col-md-12 grid justify-center p-0">
                  <div className="contenido-central">
                    <div className="col-lg-12 col-md-12 pcslide-flex_sld3">
                      <div className="col-lg-4 col-md-6 col-sm-12 flex justify-center">
                        <article className="card_new ">
                          <img
                            className="card_new__background"
                            src={momento1}
                            alt="Momento 1"
                            width="1920"
                            height="2193"
                          />
                          <div className="card_new__content | flow">
                            <div className="card_new__content--container | flow">
                              <h2 className="card_new__title cardh2" style={{ lineHeight: '1.3rem' }}>
                              1 - Conozcamos las cargas y sus tipos
                              </h2>
                              <p className="card_new__description pt-4">
                              Vamos a identificar los tipos de energía existentes en nuestro trabajo, y la regulación en Colombia                             en Colombia
                              </p>
                            </div>
                          </div>
                        </article>
                      </div>
                      <div className="col-lg-4 col-md-6 col-sm-12 flex justify-center">
                        <article className="card_new">
                          <img
                            className="card_new__background"
                            src={momento2}
                            alt="Momento 2"
                            width="1920"
                            height="2193"
                          />
                          <div className="card_new__content | flow">
                            <div className="card_new__content--container | flow">
                              <h2 className="card_new__title cardh2" style={{ lineHeight: '1.3rem' }}>
                              2- Recomendaciones de manipulación de carga
                              </h2>
                              <p className="card_new__description pt-4">
                              Recordaremos los conceptos clave de Energía CERO, y el proceso y tipos de etiquetado clave.
                              </p>
                            </div>
                          </div>
                        </article>
                      </div>

                      <div className="col-lg-4 col-md-6 col-sm-12 flex justify-center">
                        <article className="card_new">
                          <img
                            className="card_new__background"
                            src={momento3}
                            alt="Momento 3"
                            width="1920"
                            height="2193"
                          />
                          <div className="card_new__content | flow">
                            <div className="card_new__content--container | flow">
                              <h2 className="card_new__title cardh2  px-2" style={{ lineHeight: '1.3rem' }}>
                              3 - Prevengamos lesiones por mala manipulación de carga en obra
                              </h2>
                              <p className="card_new__description pt-4">
                              Revisemos el procedimiento de bloqueo y etiquetado
                              </p>
                            </div>
                          </div>
                        </article>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default EstructuraTematica;
