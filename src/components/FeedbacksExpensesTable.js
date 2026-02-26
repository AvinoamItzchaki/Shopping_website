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
    <div className="w-full">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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