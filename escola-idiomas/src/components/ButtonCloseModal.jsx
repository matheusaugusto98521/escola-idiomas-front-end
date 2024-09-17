import PropTypes from 'prop-types';

function ButtonCloseModal({ funcClick }){
    return(
        <button id="close" onClick={funcClick}>Fechar</button>
    );
}

ButtonCloseModal.propTypes = {
    funcClick: PropTypes.func.isRequired
}

export default ButtonCloseModal;