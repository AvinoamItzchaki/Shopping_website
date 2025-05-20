import './css/ExpensesTable.css'
import FeedbacksExpenseItemTable from "./FeedbacksExpenseItemTable";
import { useEffect, useState } from 'react';

function FeedbacksExpensesTable(props) {
    const [filteredAndSortedList, setFilteredAndSortedList] = useState([]);

    useEffect(() => {
        const list = [...props.list]
            .filter(product =>
                product.price >= props.minPrice &&
                product.price <= props.maxPrice &&
                (props.category === "" || product.category === props.category) &&
                (props.brand === "" || product.brand === props.brand)
            )
            .sort((a, b) =>
                props.isSortedByLikes
                    ? b.likesCounter - a.likesCounter
                    : b.dislikesCounter - a.dislikesCounter
            );
        setFilteredAndSortedList(list);
    }, [props.list, props.minPrice, props.maxPrice, props.category, props.brand, props.isSortedByLikes]);

    return (
        <div className="shoppingList">
            <div className="expense-grid-to-manager">
                {filteredAndSortedList.map(product => (
                    <FeedbacksExpenseItemTable
                        key={product.id}
                        image={product.image}
                        title={product.title}
                        price={product.price}
                        category={product.category}
                        brand={product.brand}
                        likesCounter={product.likesCounter}
                        dislikesCounter={product.dislikesCounter}
                    />
                ))}
            </div>
        </div>
    );
}

export default FeedbacksExpensesTable;