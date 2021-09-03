
const API_KEY = '23129863-59f8a41eed57593cb3097b5c2'
const URL = 'https://pixabay.com/api/'

export default function fetchPictures(query, pageNumber) {
  return (
    fetch(`${URL}?q=${query}&page=${pageNumber}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
      .then(res => res.json())

  )
    
};