import { useEffect } from 'react'
import PropTypes from 'prop-types';
import s from './modal.module.css'

function Modal({ closeModal, pictureData:{ largeImageURL, tags } }) {

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
    });

    const handleKeyDown = (e) => {
        if (e.code === 'Escape') {
            window.removeEventListener('keydown', handleKeyDown)
            closeModal({type: 'toggleModal'});
        };
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            window.removeEventListener('keydown', handleKeyDown)
            closeModal({type: 'toggleModal'});
        };
    };

    return (
        <div className={s.Overlay} onClick={handleBackdropClick}>
            <div className={s.Modal}>
                <img src={largeImageURL} alt={tags} />
            </div>
        </div>
    );
};

export default Modal

Modal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    pictureData: PropTypes.shape({
        largeImageURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired
    })
}