import PropTypes from 'prop-types';
import s from './imageGallery.module.css'

const ImageGalleryItem = ({ webformatURL, tags }) => {
  
    return (
        <img src={webformatURL} alt={tags} className={s.ImageGalleryItemImage} />
    );
        
};
export default ImageGalleryItem

ImageGalleryItem.defaultProps = {
    tags: 'picture'
}

ImageGalleryItem.propTypes = {
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string,
};