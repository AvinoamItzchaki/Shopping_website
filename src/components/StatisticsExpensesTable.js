import StatisticsExpenseItemTable from './StatisticsExpenseItemTable';

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
    <div className="w-full">
      {props.isManager ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {props.isStatistic
            ? filteredAndSortedList.slice(0, 3).map(product => (
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
            : filteredAndSortedList.slice(-3).reverse().map(product => (
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
      )}
    </div>
  );
}

export default StatisticsExpensesTable;
