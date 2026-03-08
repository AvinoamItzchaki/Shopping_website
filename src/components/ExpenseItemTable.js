import React from 'react';
import { Img } from 'react-image';
import { AddItemToDB, DeletingSingleProduct } from "./HandleDB";

function ExpenseItemTable(props) {
  const handleAddToCart = () => {
    AddItemToDB(props.image, props.title, props.price, props.category, props.brand);
  };

  const handleRemoveFromCart = () => {
    const clearSingleProduct = async () => {
      await DeletingSingleProduct(props.id);
      props.updateCounter(prevState => prevState + 1);
    };
    clearSingleProduct();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-col items-center space-y-4">
      <Img
        src={props.image}
        alt={props.title}
        className="w-40 h-40 object-cover rounded-lg border border-slate-200"
      />

      <div className="w-full text-center">
        <h5 className="text-sm font-medium text-slate-900 line-clamp-2">
          {props.title}
        </h5>
      </div>

      <div className="w-full flex flex-col items-center space-y-2">
        {props.isCart && (
          <div className="text-sm font-semibold text-slate-700">
            x {props.count}
          </div>
        )}

        <div className="inline-flex items-center justify-center rounded-full bg-slate-900 text-white px-3 py-1 text-sm font-semibold">
          {props.price}$
        </div>

        {!props.isCart && (
          <button
            type="button"
            className="mt-2 inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
            onClick={handleAddToCart}
          >
            Add To Cart
          </button>
        )}

        {props.isCart && (
          <button
            type="button"
            className="mt-2 inline-flex items-center justify-center rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            onClick={handleRemoveFromCart}
          >
            Remove From Cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ExpenseItemTable;