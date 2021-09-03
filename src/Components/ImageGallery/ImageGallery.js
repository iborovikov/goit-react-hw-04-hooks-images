import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem'
import s from './imageGallery.module.css'

const ImageGallery = ({ pictures, openLargeImg }) => {
    const shortid = require('shortid');

    return (
        <ul className={s.ImageGallery}>
            {pictures && pictures.map(picture =>
                <li key={shortid.generate()} className={s.ImageGalleryItem} onClick={() => openLargeImg(picture.id)}>
                    <ImageGalleryItem webformatURL={picture.webformatURL} tags={picture.tags} />
                </li>)}
        </ul>
    );
};

export default ImageGallery;

ImageGallery.propTypes = {
    pictures: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        tags: PropTypes.string,
        })).isRequired,
    openLargeImg:PropTypes.func.isRequired,
}