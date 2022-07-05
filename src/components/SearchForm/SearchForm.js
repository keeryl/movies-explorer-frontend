import './SearchForm.css';
import React from 'react';

function SearchForm () {

  const [isChecked, setIsChecked] = React.useState(true);
  const [searchRequest, setSearchRequest] = React.useState('');

  const handleCheckBox = () => {
    setIsChecked(!isChecked);
  }

  const handleSearchInput = (e) => {
    setSearchRequest(e.target.value);
  }

  const handleSearchFormSubmit = (e) => {
    e.preventDefault();
  }

  return(
    <form className="search-form" onSubmit={handleSearchFormSubmit}>
      <fieldset className="search-form__search-field">
        <label className="search-form__input-lable"></label>
        <input
          className="search-form__input"
          placeholder="Фильм"
          value={searchRequest}
          onChange={handleSearchInput}
          required
        >
        </input>
        <button className="search-form__button"></button>
      </fieldset>
      <fieldset className="search-form__checkbox-field">
        <div
          onClick={handleCheckBox}
          className={
            isChecked ?
            `search-form__checkbox search-form__checkbox_checked`
            :
            `search-form__checkbox`
          }
        >
          <div
            className={ isChecked ?
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
