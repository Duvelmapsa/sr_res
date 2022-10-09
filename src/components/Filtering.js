import { useState, useEffect } from "react";
import FilterSelect from "./FilterSelect";

const Filtering = (props) => {

  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filtersData, setFiltersData] = useState({});
  const {selectedFiltersCb, productsData} = props;


  // Callback z zaznaczoną opcją z "selecta" od filtrów.
  const selectedFiltersCallback = (obj) => { 
    const newObj = {...selectedFilters};
    newObj[obj.filterVName] = obj
    setSelectedFilters(newObj)
  }

  
  /**
   * Funkcja tworząca obiekt z danymi wykorzystywanymi do stworzenia filtrów.
   * @param {Object} data - obiekt zawierający pełny response z API.
   */
  const getFiltersData = (data) => {
    const _filtersData = {brand: [], category: []};
    data.forEach(item => {
      _filtersData['brand'].push(item.brand);  
      _filtersData['category'].push(item.category);  
    })
    _filtersData.brand = [...new Set(_filtersData.brand)];
    _filtersData.category = [...new Set(_filtersData.category)];

    setFiltersData(_filtersData);
  }

  useEffect(() => {
    getFiltersData(productsData);
  },[])

  useEffect(() => {
    selectedFiltersCb(selectedFilters);
  }, [selectedFilters])

  return (
    <div className="filtering">
      <div className="filtering__filtersWrapper">
        {productsData && Object.entries(filtersData).map(item => {
         return <FilterSelect key={item[0]} filterName={item[0]} filterVName={item[0]} options={item[1]} selectedFiltersCallback={selectedFiltersCallback}/>
        })  
        }
      </div>
      <div className="filtering__selectedFilters">

      </div>
    </div>
  )
}

export default Filtering;