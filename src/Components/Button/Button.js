import s from './button.module.css'
import PropTypes from 'prop-types';

const Button = ({ setPageNumber }) => {

    return (
        <button type='button' className={s.Button} onClick={() => setPageNumber({type: 'setPageNumber'})}>Load more</button>
    );
};

export default Button;

Button.propTypes = {
  setPageNumber: PropTypes.func.isRequired,
};