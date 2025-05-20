import ExpenseItemTable from './ExpenseItemTable';
import './css/ExpensesTable.css'

function ExpensesTable(props) {
    return (
        <div className="shoppingList">
            <div className="expense-grid">
                {
                    props.list.map((product, index) => {
                        if ((product.price < props.minPrice) || (product.price > props.maxPrice)) {
                            return null;
                        }
                        if (props.category === "" || product.category === props.category) {

                        }else {
                            return null;
                        }
                        if (props.brand === "" || product.brand === props.brand) {

                        }else {
                            return null;
                        }
                        return (
                            <ExpenseItemTable
                                image={product.image}
                                title={product.title}
                                price={product.price}
                                category={product.category}
                                brand={product.brand}
                                isCart={false}
                            />
                        )
                    })
                }
            </div>
        </div>

    );
}

export default ExpensesTable;
