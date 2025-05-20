import './css/ExpenseItemTable.css'
import React from 'react';
import { Img } from 'react-image';
import {AddFeedbackOnProduct} from "./HandleDB";

function FeedbacksExpenseItemTable(props) {
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
                    <div className="row-for-feedbacks">
                        <strong style={{
                            color: "blue",
                        }}> {props.likesCounter}
                        </strong>
                        <strong style={{
                            color: "indianred",
                        }}> {props.dislikesCounter}
                        </strong>
                    </div>

                    <div className="row">
                        <div className='expense-item__price'><h3>{props.price}$</h3></div>

                    </div>

                    <div className="row-for-feedbacks">
                        <button onClick={() => {
                            const addFeedbackLikeOnProduct = async () => {
                                await AddFeedbackOnProduct(props.image, props.title, props.price
                                    , props.category, props.brand, true);
                            }
                            addFeedbackLikeOnProduct();
                        }}><h2>
                            👍
                        </h2>

                        </button>
                        <button className="button11" onClick={() => {
                            const addFeedbackDislikeOnProduct = async () => {
                                await AddFeedbackOnProduct(props.image, props.title, props.price
                                    , props.category, props.brand, false);
                            }
                            addFeedbackDislikeOnProduct();
                        }}>
                            <h2>
                                👎
                            </h2>
                        </button>
                    </div>
                </div>
            </div>
        </td>

);
}

export default FeedbacksExpenseItemTable;




/*
    <button variant="danger"
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
<Button variant="primary"
                                onClick={
                                    AddFeedbackOnProduct(props.image, props.title, props.price
                                        , props.category, props.brand, true)
                                }>
                            Like
                        </Button>
                        <Button variant="danger"
                                onClick={
                                    AddFeedbackOnProduct(props.image, props.title, props.price
                                        , props.category, props.brand, false)
                                }>
                        >
                            Dislike
                        </Button>
*/
