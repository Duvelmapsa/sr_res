import './Product.css';
import { useState } from 'react';

const Product = (props) => {
  const {id, brand, name, icon, price, discountPercentage, stock, description} = props
  const [currency, setCurrency] = useState('zł');

  return (
    <div className="product">
      <div className="product__icon">
        <a href={'/product/'+id} title={name}>
          <img alt={name} src={icon} loading="lazy"/>
        </a>
      </div>
        <div className="product__details">
          <a href="/" className='product__brand'>{brand}</a>
          <a href={'/product/'+id} title={name} className="product__name">
            <h3>
              {name}
            </h3>
          </a>
          <div className="product__prices">
            <span className="product__price">{price} {currency}</span>
            {discountPercentage ? 
              <span className="product__discountPercentage">-{Math.ceil(discountPercentage)}%</span>
            : ''}
          </div>
          {description ? 
            <div className="product__description">
              {description}
            </div>
          : ''}
          <div className="product__stockLeft">
            Pozostało: {stock} szt.
          </div>
        </div>
    </div>
  )
}

export default Product