import {useEffect, useState} from 'react'
import './Filtering.css';

const FilterSelect = (props) => {
  const {filterName, filterVName, selectedFiltersCallback, options: selectOptions} = props
  const [isOpened, setIsOpened] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);


  const selectItemHandler = (e) => {
    e.currentTarget.classList.toggle('--selected');
    setIsOpened(!isOpened);
    const selectedValue = e.currentTarget.innerHTML;
    setSelectedItems(() => selectedItems.includes(selectedValue) ? selectedItems.filter(item => item !== selectedValue) : [...selectedItems, selectedValue])
  }

  useEffect(() => {
    const selectedObj = {
      "fitlerName": filterName,
      "filterVName": filterVName,
      "value": selectedItems
    }
    selectedFiltersCallback(selectedObj);
  }, [selectedItems]);

  return (
    <div className={`filter${isOpened ? ' --opened': ''}`}>
      <input type="hidden" name={`selected_${filterVName}`}/>
      <div className="filter__trigger" onClick={() => setIsOpened(!isOpened)}>{filterName} {selectedItems.join(" ")}</div>
      <ul className="filter__options">
        {selectOptions.map(option => {
          return <li key={option} className="filter__item"><a href="#selectFilter" className="filter__link" onClick={selectItemHandler}>{option}</a></li>
        })}
      </ul>
    </div>
  )
}

export default FilterSelect;