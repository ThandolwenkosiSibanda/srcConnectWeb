import { useQuery } from '@apollo/client';
import React from 'react';


import { PRODUCTS_QUERY } from '../../gql/Query';







const Brands = () => {

  console.log('Best Sellers');

    const {data: productsData, loading: productsLoading, error: productsError} = useQuery(PRODUCTS_QUERY, {
        fetchPolicy: 'network-only',
        // pollInterval: 500,
      });

      console.log('productsData', productsData);
      console.log('productsLoading', productsLoading);
      console.log('productsError', productsError);


	return (
		<>

            <div className="c-products c-products--slider row brands-container"  >
            <h4 className="brands-heading">Thousands of products from trusted brands and suppliers</h4>

            <div className="c-products__list" >

                {productsData?.products?.slice(0, 4).map((product, index)=> (<img height="50" alt={product.name} loading="lazy" src="" key ={index} product ={product} />))}

              </div>

            </div>
            


		</>
	);
};



export default Brands;
