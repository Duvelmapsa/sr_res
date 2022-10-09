import logo from './logo.svg';
import './App.css';
import Filtering from './components/Filtering'
import Product from './components/Product'
import {useEffect, useState} from 'react'

function App() {

  const [productsData, setProductsData] = useState();
  const [productsPerPage, setProductsPerPage] = useState([]);
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // This is old code including limit and page from API.
  // const fetchSettings = async () => {
  //   const response = await fetch('http://localhost:3001/settings');
  //   let data = await response.json();
  //   data.pages = Math.ceil(data.total / data.limit);
  //   setSettings(data);
  // }

  const chunkProductsForPages = (products, limit) => {
    const newProductsArray = products.reduce((resultArray, item, index) => { 
      const chunkIndex = Math.floor(index/limit);
      if(!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = [];
      }
      resultArray[chunkIndex].push(item);
      return resultArray
    }, [])
    return newProductsArray;
  }

  const getProducts = async () => {
    const filter_url = filterProducts(filters);

    // This is old fetch including limit and page from API.
    // const response = await fetch(`http://localhost:3001/products?_limit=${settings?.limit}&_page=${currentPage}${filter_url || ''}`);

    const response = await fetch(`http://localhost:3001/products?${filter_url || ''}`);
    const data = await response.json();
    const chunked_data = chunkProductsForPages(data, 5);
    setProductsData(data);
    setProductsPerPage(chunked_data);
    setProducts(chunked_data[0]);
  }

  const filterProducts = (filters) => {
    let selected_filters = Object.entries(filters).filter((key, item) => {return key[1].value.length > 0});
    selected_filters = selected_filters.map(item => {return item[1]});
    let filters_url = '';
    selected_filters.forEach((item, key) => {
      filters_url+=`&${item.filterVName}=${item.value.join(`&${item.filterVName}=`)}`;
    })
    return filters_url;
  }

  const selectedFiltersCb = (obj) => {
    setFilters(obj);
  }

  const loadMoreProducts = () => {
    setCurrentPage(currentPage+1)
    if (!products.length) return false;
    setProducts([...products, ...productsPerPage[currentPage]]);
  }
  
  useEffect(() => {
    setProducts([]);
    setCurrentPage(1);
    getProducts();
  }, [filters]);
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div id="content" className="container">
        {productsData && <Filtering selectedFiltersCb={selectedFiltersCb} productsData={productsData}/>}
        <div className="products">
          {products ? products.map(product => {
            const {id, title: name, thumbnail, stock, price, discountPercentage, description, brand} = product
            return <Product key={id} id={id} name={name} icon={thumbnail} description={description} stock={stock} price={price} discountPercentage={discountPercentage} brand={brand}/>
          }): "Brak produktów"}
        </div>
        {productsPerPage && productsPerPage[currentPage] !== undefined ? 
          <button className="load-more-button" onClick={loadMoreProducts}>Wczytaj więcej</button>
        : ''}
      </div>
    </div>
  );
}

export default App;
