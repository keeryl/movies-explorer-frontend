import './SearchForm.css';
import React from 'react';

function SearchForm (props) {

  const handleCheckBox = () => {
    props.setIsChecked(!props.isChecked);
  }

  const handleSearchInput = (e) => {
    props.setSearchRequest(e.target.value);
  }

  const handleSearchFormSubmit = (e) => {
    e.preventDefault();
    props.onSearchRequest();
  }

  return(
    <form className="search-form" onSubmit={handleSearchFormSubmit}>
      <fieldset className="search-form__search-field">
        <label className="search-form__input-lable"></label>
        <input
          className="search-form__input"
          placeholder="Фильм"
          value={props.searchRequest}
          onChange={handleSearchInput}
          required
        >
        </input>
        <button className="search-form__button" type="submit" disabled={!props.isValid}></button>
      </fieldset>
      <fieldset className="search-form__checkbox-field">
        <div
          onClick={handleCheckBox}
          className={
            props.isChecked ?
            `search-form__checkbox search-form__checkbox_checked`
            :
            `search-form__checkbox`
          }
        >
          <div
            className={ props.isChecked ?
              `search-form__checkbox-circle search-form__checkbox-circle_checked`
              :
              `search-form__checkbox-circle`
            }
          >
          </div>
        </div>
        <p className="search-form__checkbox-text">Короткометражки</p>
      </fieldset>
    </form>
  );
}

export default SearchForm;
