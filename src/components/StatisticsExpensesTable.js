import StatisticsExpenseItemTable from './StatisticsExpenseItemTable';
import './css/ExpensesTable.css'

function StatisticsExpensesTable(props) {
    const filteredAndSortedList = [...props.list]
        .sort((a, b) => b.count - a.count)
        .filter(product =>
            product.price >= props.minPrice &&
            product.price <= props.maxPrice &&
            (props.category === "" || product.category === props.category) &&
            (props.brand === "" || product.brand === props.brand)
        );

    return (
        <div className="shoppingList">
                {props.isManager ? (
                    <div className="expense-grid-to-manager">
                        {filteredAndSortedList.map(product => (
                            <StatisticsExpenseItemTable
                                key={product.id}
                                image={product.image}
                                title={product.title}
                                price={product.price}
                                category={product.category}
                                brand={product.brand}
                                count={product.count}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="expense-grid-to-statistics">
                        {props.isStatistic ? (
                            filteredAndSortedList.slice(0, 3).map(product => (
                                <StatisticsExpenseItemTable
                                    key={product.id}
                                    image={product.image}
                                    title={product.title}
                                    price={product.price}
                                    category={product.category}
                                    brand={product.brand}
                                    count={product.count}
                                />
                            ))
                        ) : (
                            filteredAndSortedList.slice(-3).reverse().map(product => (
                                <StatisticsExpenseItemTable
                                    key={product.id}
                                    image={product.image}
                                    title={product.title}
                                    price={product.price}
                                    category={product.category}
                                    brand={product.brand}
                                    count={product.count}
                                />
                            ))
                        )}
                    </div>
                )}
        </div>

    );
}

export default StatisticsExpensesTable;
