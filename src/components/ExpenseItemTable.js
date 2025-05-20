import './css/ExpenseItemTable.css'
import React from 'react';
import { Img } from 'react-image';
import {AddItemToDB, DeletingSingleProduct} from "./HandleDB";

function ExpenseItemTable(props) {
    return (
        <td>
            <div className='expense-item'>
                <Img
                    src={props.image}
                    alt={props.title}
                    style={{width: "150px", height: "150px", objectFit: "cover", border: "1px solid #ccc"}}
                />
                <div className="full-row">
                    <div className='expense-item__title'><h5>{props.title} </h5></div>
                </div>
                <div className="container">
                    <div className="row">
                        {props.isCart && (
                            <strong> x {props.count}</strong>
                        )}
                    </div>

                    <div className="row">
                        <div className='expense-item__price'><h3>{props.price}$</h3></div>
                    </div>

                    <div className="row">
                        {!props.isCart && (
                            <button className="buttonFilterProducts1"
                                onClick={() => {
                                    AddItemToDB(props.image, props.title, props.price, props.category, props.brand)
                                    //alert('item added to cart!')
                                }}
                            >
                                Add To Cart
                            </button>
                        )}
                        {props.isCart && (
                            <button className="buttonFilterProducts1"
                                onClick={() => {
                                    const clearSingleProduct = async () => {
                                        await DeletingSingleProduct(props.id);
                                        props.updateCounter(prevState => prevState + 1);
                                    }
                                    clearSingleProduct()
                                }
                                }
                            >
                                Remove From Cart
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </td>

    );
}

export default ExpenseItemTable;

