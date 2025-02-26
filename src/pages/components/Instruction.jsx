import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTurnUp, faTurnDown } from "@fortawesome/free-solid-svg-icons";

const Instruction = ({ children, theme = 'dark', arrow = 'up', fontWeight = 'font-semibold' }) => {
  const textColor = theme === 'dark' ? 'text-instruction-dark-color' : 'text-instruction-light-color';
  const backgroundColor = theme === 'dark' ? 'bg-instruction-dark-color-background' : 'bg-instruction-light-color-background';
  const arrowDirection = arrow === 'up' ? faTurnUp : faTurnDown;

  return (
    <div className={`${backgroundColor} rounded-lg px-4 py-2 text-center my-4 italic flex items-center gap-2`}>
      <p className={`${textColor} ${fontWeight} text-instructions-size`} style={{ lineHeight: '1.3rem' }}>
        {children}
      </p>
      <FontAwesomeIcon icon={arrowDirection} className={textColor} />
    </div>
  );
};

export default Instruction;