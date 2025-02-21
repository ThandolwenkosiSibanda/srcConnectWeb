import { useQuery } from '@apollo/client';
import React from 'react';


import { PRODUCTS_QUERY } from '../../gql/Query';
import ProductListItem from './ProductListItem';







const BestSellers = () => {

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

            <div className="c-products c-products--slider row c-row--margin-default" data-name="best-sellers" >
            <h2 className="c-products__heading center-align">Market Bestsellers</h2>

            <div className="c-products__list" >

                {productsData?.products?.slice(0, 8).map((product, index)=> (<ProductListItem key ={index} product ={product} />))}

              
              </div>

            </div>
            


		</>
	);
};



export default BestSellers;
