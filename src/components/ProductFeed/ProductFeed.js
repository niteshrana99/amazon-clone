import React from 'react'
import Product from '../Product/Product';

const ProductFeed = ({ products }) => {
    return (
        <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.slice(0,4).map(({ id, title, description, category, image , price}) => (
                <Product 
                key={id} 
                id={id} 
                title={title} 
                description={description} 
                category={category} 
                image={image} 
                price={price} />
            ))}

            <img className="md:col-span-full" src="https://links.papareact.com/dyz" />
            {products.slice(5,products.length).map(({ id, title, description, category, image , price}) => (
                <Product 
                key={id} 
                id={id} 
                title={title} 
                description={description} 
                category={category} 
                image={image} 
                price={price} />
            ))}
        </div>
    )
}

export default ProductFeed;
