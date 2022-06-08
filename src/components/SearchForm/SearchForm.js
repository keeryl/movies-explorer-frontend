import './SearchForm.css';

function SearchForm () {

  return(
    <form className="search-form">
      <fieldset className="search-form__search-field">
        <lable className="search-form__input-lable"></lable>
        <input className="search-form__input" placeholder="Фильм"></input>
        <button className="search-form__button"></button>
      </fieldset>
      <fieldset className="search-form__checkbox-field">
        <div className="search-form__checkbox">
          <div className="search-form__checkbox-circle"></div>
        </div>
        <p className="search-form__checkbox-text">Короткометражки</p>
      </fieldset>
    </form>
  );
}

export default SearchForm;
