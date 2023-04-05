// import {useState} from 'react';
import {Link} from '@remix-run/react';
import {Image, Money} from '@shopify/hydrogen';

const orientation = [
  'A1',
  'A2',
  'A3',
  'A4',
  'B1',
  'B2',
  'B3',
  'B4',
  'C1',
  'C2',
  'C3',
  'C4',
  'D1',
  'D2',
  'D3',
  'D4',
  'E1',
  'E2',
  'E3',
  'E4',
  'F1',
  'F2',
  'F3',
  'F4',
];

export default function ProductCard({product, index}) {
  const {price, compareAtPrice} = product.variants?.nodes[0] || {};

  return (
    <div className="Product">
      <Link to={`/products/${product.handle}`} style={{textDecoration: 'none'}}>
        <Image
          data={product.variants.nodes[0].image}
          alt={product.title}
          className="prod-images"
        />
        <h6 style={{color: '#195A2E'}}>{product.title}</h6>
        <div className="vending-text-div" style={{display: 'flex'}}>
          <h6 className="vending-text">{orientation[index]}</h6>
          <Money data={price} className="vending-price-text" />
        </div>
      </Link>
    </div>
  );
}
