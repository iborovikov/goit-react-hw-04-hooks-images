import { useEffect, useRef, useReducer } from 'react';
import Loader from "react-loader-spinner";
import './App.css';
import fetchPictures from './services';
import SearchBar from './Components/Searchbar/SearchBar';
import ImageGallery from './Components/ImageGallery/ImageGallery';
import Button from './Components/Button/Button';
import Modal from './Components/Modal/Modal'


const initialState = {
  pictures: [],
  status: 'idle',
  showModal: false,
  largeImg: null,
  query: '',
  pageNumber: 1,
  error: 'Nothing found'
}

function setRedusser(state, action) {
  switch (action.type) {
    case 'setPicture':
      return {...state, pictures: [...state.pictures, ...action.payload]};
    case 'resetPicture':
      return {...state, pictures: []};
    case 'setStatus':
      return {...state, status: action.payload}
    case 'toggleModal':
      return {...state, showModal: !state.showModal}
    case 'setLargeImg':
      return {...state, largeImg: action.payload }
    case 'setQuery':
      return {...state, query: action.payload};
    case 'setPageNumber':
      return {...state, pageNumber: state.pageNumber + 1};
    case 'resetPageNumber':
      return {...state, pageNumber: 1};
    case 'setError':
      return {...state, error: action.payload};
    default: console.log(`unexpected action type ${action.type}`)
  };
}

function App() {

  const [state, dispatch] = useReducer(setRedusser, initialState);
  const isFirstRender = useRef(true);

  const {
    pictures,
    status,
    showModal,
    largeImg,
    query,
    pageNumber,
    error } = state

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    dispatch({type: 'setStatus', payload: 'pending'});
    fetchPictures(query, pageNumber).then(pictures => {
      dispatch({ type: 'setStatus', payload: 'resolved' });
      dispatch({ type: 'setPicture', payload: pictures.hits });
      if (pageNumber > 1) {
        scrollDown()
      };
    })
      .catch(error => {
        dispatch({type: 'setError', payload: error });
        dispatch({type: 'setStatus', payload: 'rejected'})
      });
  }, [query, pageNumber])

  const scrollDown = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const openLargeImg = (id) => {
    const picture = pictures.find(picture => picture.id === id);
    dispatch({ type: 'setLargeImg', payload: picture });
    dispatch({ type: 'toggleModal' });
  };

  const onSubmit = (query) => {
    dispatch({ type: 'resetPicture' });
    dispatch({ type: 'resetPageNumber' });
    dispatch({ type: 'setQuery', payload: query });
  };
    
    if (status === 'idle') {
      return (<div className='container'>
        <SearchBar onSubmit={onSubmit} />
      </div>);
    };

    if (status === 'pending' || status === 'resolved') {
      return (
        <div className='container'>
          <SearchBar onSubmit={onSubmit} />
          <ImageGallery pictures={pictures} openLargeImg={openLargeImg} />
          {status === 'resolved' ?
            <Button setPageNumber={dispatch} /> :
            <div className='loader'>
              <Loader type="ThreeDots" color="#3f51b5" height={80} width={80} />
            </div>}
          {showModal && <Modal closeModal={dispatch} pictureData={largeImg} />}
        </div>
      );
    };

    if (status === 'rejected') {
      return (<div className='container'>
        <SearchBar onSubmit={onSubmit} />
        <h1>Warning: { error }</h1>
      </div>);
    };
};

export default App;