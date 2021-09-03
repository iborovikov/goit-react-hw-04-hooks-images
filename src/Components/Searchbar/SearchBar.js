import { useState } from "react";
import PropTypes from 'prop-types';
import s from './searchBar.module.css'

function SearchBar({ onSubmit }) {
    const [searchInputValue, setSearchInputValue] = useState('');

    const formSubmit = (e) => {
        e.preventDefault();
        onSubmit(searchInputValue);
    };

    const handleInputChange = (e) => {
        setSearchInputValue(e.currentTarget.value);
    };

    return (
        <header className={ s.Searchbar }>
            <form className={ s.SearchForm } onSubmit={formSubmit}>
                <button type="submit" className={ s.SearchFormButton }>
                    <span className={ s.SearchFormButtonLabel }>Search</span>
                </button>
                <input
                    className={ s.SearchFormInput }
                    type="text"
                    value={searchInputValue}
                    onChange={handleInputChange}
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                />
            </form>
        </header>
    );
};

export default SearchBar;

SearchBar.propTypes = {
    onSubmit: PropTypes.func.isRequired
}