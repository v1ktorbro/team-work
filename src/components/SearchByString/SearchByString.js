import { useCallback, useEffect, useState } from 'react';
import './SearchByString.css';
import BtnResetCross from '../BtnResetCross/BtnResetCross';
import DropDownList from '../DropDownList/DropDownList';
import { borderStyleHandlerThemeForFilter } from '../../utils/utils';

function SearchByString({ placeholder, theme, data }) {
  const [stringValue, setStringValue] = useState('');
  const [isFocusElem, setIsFocusElem] = useState(false);
  const [isOpenListSearchedResult, setIsOpenListSearchedResult] = useState(false);

  const onChangeSearch = (evt) => {
    const {value} = evt.target;
    setStringValue(value);
    value.length ? setIsOpenListSearchedResult(true) : setIsOpenListSearchedResult(false);
  };

  const handleReset = () => {
    setStringValue('');
    setIsOpenListSearchedResult(false);
    setIsFocusElem(false);
  };

  const listenerEscapeBtn = (evt) => {
    if (evt.key === 'Escape' || evt.keyCode === 27) {
      evt.target.blur();
    }
  };

  const onBlur = useCallback((evt) => {
    const currentTarget = evt.currentTarget;
    requestAnimationFrame(() => {
      if (!currentTarget.classList.contains('.search-by-string_input-focus')) {
        handleReset();
      }
    });
  }, [isFocusElem]);

  useEffect(() => {
    const inputContainer = document.querySelector('.search-by-string__container');
    borderStyleHandlerThemeForFilter(inputContainer, theme, isOpenListSearchedResult, isFocusElem);
  }, [isOpenListSearchedResult, theme, isFocusElem]);

  return (
    <>
      <div 
        className={`search-by-string search-by-string_${theme} ${isFocusElem ? 'search-by-string_input-focus' : ''}`}
          onKeyDown={(evt) => listenerEscapeBtn(evt)}
          onFocus={() => setIsFocusElem(true)}
          onBlur={(evt) => onBlur(evt)}
      >
        <div 
          className={`search-by-string__container search-by-string__container_${theme}`}
        >
          <input 
            className={`search-by-string__input search-by-string__input_${theme}`}
            type='text'
            value={stringValue}
            onChange={onChangeSearch}
            placeholder={placeholder}
          />
          { stringValue.length > 0 &&
            <BtnResetCross 
              hStyle={{right: '18px'}}
              handleReset={handleReset}
              theme={theme}
            />
          }
        </div>
        <DropDownList
          theme={theme}
          data={data}
          isOpen={isOpenListSearchedResult}
          setIsOpen={setIsOpenListSearchedResult}
        />
      </div>
    </>
  );
}

export default SearchByString;