import ExpenseItemTable from './ExpenseItemTable';

function ExpensesTable(props) {
  return (
    <div className="w-full">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {props.list.map((product, index) => {
          if (product.price < props.minPrice || product.price > props.maxPrice) {
            return null;
          }
          if (!(props.category === "" || product.category === props.category)) {
            return null;
          }
          if (!(props.brand === "" || product.brand === props.brand)) {
            return null;
          }

          return (
            <ExpenseItemTable
              key={index}
              image={product.image}
              title={product.title}
              price={product.price}
              category={product.category}
              brand={product.brand}
              isCart={false}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ExpensesTable;
