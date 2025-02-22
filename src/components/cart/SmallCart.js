import React, { useCallback, useEffect, useState } from "react";
import { IoMdBasket } from "react-icons/io";

// import { getCartAction } from '../../actions/cart';
import { CART_PRODUCTS_QUERY } from "../../gql/Query";
import { useLazyQuery } from "@apollo/client";

const SmallCart = (props) => {
  const [ids, setIds] = useState([]);

  // const [cartValue, setCartValue] = useState(0);

  const [getCartProducts, { data, error, loading }] = useLazyQuery(
    CART_PRODUCTS_QUERY,
    {
      variables: { ids: ids },
      // pollInterval: 1000,
    }
  );

  useEffect(() => {
    // props.getCartAction();
    // setCartValue(sum);
  }, []);

  useEffect(() => {
    const ids = props?.cart?.map((cart) => cart.productId);
    setIds(ids);
  }, [props?.cart?.length]);

  useEffect(() => {
    if (props?.cartLoading === "loading") {
      console.log("cart is loading");
    } else {
      console.log("cart is done loading");
      getCartProducts();
    }
  }, [props?.cartLoading]);

  useEffect(() => {
    getCartProducts();
  }, [ids]);

  useEffect(() => {
    //     if(loading === 'false'){
    //         console.log('loading is false')
    //     }else {
    //         const sumWithQuantity =
    //         data?.cartProducts.map((cartProduct)=> {
    //       if((props?.cart.find((cartItem)=> cartItem?.productId === cartProduct._id))){

    //               cartProduct.quantity = props?.cart?.filter((cartItem)=> cartItem?.productId === cartProduct._id)[0].quantity;

    //          return  cartProduct;
    //       }
    //       return cartProduct;
    //    });

    //    const sumQuantity =
    //    sumWithQuantity?.reduce((partialSum, a) => partialSum + a.quantity, 0);

    //    const sum =
    //    sumWithQuantity?.reduce((partialSum, a) => partialSum + (a.quantity * a.guestPrice), 0);

    //   console.log('sumQuantity', sumQuantity);

    //   console.log('sum', sum);

    //   setCartValue(sum)
    //     }

    console.log("fun loading", loading);
  }, [loading]);

  const sumQuantity = props.cart?.reduce(
    (partialSum, a) => partialSum + a.quantity,
    0
  );

  //     const sumWithQuantity =
  //         data?.cartProducts.map((cartProduct)=> {
  //       if((props?.cart.find((cartItem)=> cartItem?.productId === cartProduct._id))){
  //               cartProduct.quantity = props?.cart?.filter((cartItem)=> cartItem?.productId === cartProduct._id)[0].quantity;
  //          return  cartProduct;
  //       }
  //       return cartProduct;
  //    });

  //    const sum =
  //    sumWithQuantity?.reduce((partialSum, a) => partialSum + (a.quantity * a.guestPrice), 0);

  return (
    <>
      <span className="badge badge--circle">{sumQuantity}</span>
      <IoMdBasket size={35} />
      {/* <span>${sum?.toFixed(2)}</span>     */}
    </>
  );
};

export default SmallCart;
