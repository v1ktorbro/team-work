import './FilterSelectListItem.css';
import React from 'react';
import BtnSwitchBlind from '../BtnSwitchBlind/BtnSwitchBlind';
import BtnResetCross from '../BtnResetCross/BtnResetCross';
import DropDownList from '../DropDownList/DropDownList';
import { borderStyleHandlerThemeForFilter } from '../../utils/utils';

function FilterSelectListItem ({theme, data, nameFilter, handlerSelectList, handlerResetList}) {
  const [isOpenListAuthor, setIsOpenListAuthor] = React.useState(false);
  const [isFocus, setIsFocus] = React.useState(false);
  const [selectValue, setSelectValue] = React.useState('');

  const toggleOpenListAuthor = () => {
    setIsOpenListAuthor(prev => !prev);
    setIsFocus(prev => !prev);
  };

  const selectItemList = (evt) => {
    handlerSelectList(evt.currentTarget.textContent);
    setSelectValue(evt.currentTarget.textContent);
    toggleOpenListAuthor();
  };

  const handlerReset = () => {
    handlerResetList();
    setSelectValue('');
    setIsOpenListAuthor(false);
    setIsFocus(false);
  };

  const onBlur = (evt) => {
    const thisComponent = document.getElementById(`nav-search-${nameFilter.toLowerCase()}`);
    const isClickInsideComponent = thisComponent.contains(evt.target);
    if (!isClickInsideComponent) {
      setIsFocus(false);
      setIsOpenListAuthor(false);
    }
  };

  const escBtnListener = (evt) => {
    if(evt.key === 'Escape' || evt.keyCode === 27) {
      setIsFocus(false);
      setIsOpenListAuthor(false);
    }
  };

  React.useEffect(() => {
    const filterContainer = document.getElementById(`nav-search-${nameFilter.toLowerCase()}`).querySelector('.filter-select-list-item__container');
    borderStyleHandlerThemeForFilter(filterContainer, theme, isOpenListAuthor, isFocus);
  }, [isOpenListAuthor, theme, isFocus]);

  React.useEffect(() => {
    document.addEventListener('click', onBlur);
    return () => document.removeEventListener('click', onBlur);
  }, [isFocus]);

  return (
    <nav 
      className={`filter-select-list-item filter-select-list-item_${theme}`}
      onClick={() => setIsFocus(true)}
      tabIndex="0"
      onKeyDown={escBtnListener}
      id={`nav-search-${nameFilter.toLowerCase()}`}
    >
      <div className={`filter-select-list-item__container filter-select-list-item__container_${theme} ${isFocus && `filter-select-list-item__container_focus-${theme}`}`}>
        <input 
          className='filter-select-list-item__input-display-selected-text' 
          value={selectValue}
          disabled 
          placeholder={nameFilter} 
        />
        <div className='filter-select-list-item__btn-container'>
          {selectValue.length > 0 &&
            <BtnResetCross 
              theme={theme}
              onClick={handlerReset}
            />
          }
          <BtnSwitchBlind
            theme={theme}
            isOpen={isOpenListAuthor}
            onClick={toggleOpenListAuthor}
          />
        </div>
      </div>
      <DropDownList 
        theme={theme}
        data={data}
        isOpen={isOpenListAuthor}
        onClickSelectItem={selectItemList}
      />
    </nav>
  );
}

export default FilterSelectListItem;