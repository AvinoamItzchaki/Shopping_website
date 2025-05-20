import './css/ExpenseItemTable.css'
import React from 'react';
import { Img } from 'react-image';

function StatisticsExpenseItemTable(props) {
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
                        <strong> x {props.count}</strong>
                    </div>

                    <div className="row">
                        <div className='expense-item__price'><h3>{props.price}$</h3></div>
                    </div>

                    <div className="row">

                    </div>
                </div>
            </div>
        </td>

    );
}

export default StatisticsExpenseItemTable;

