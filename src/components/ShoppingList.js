import ExpensesTable from "./ExpensesTable";
import PriceFilter from "./PriceFilter";
import { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import CategoryFilter from "./CategoryFilter";

//'https://fakestoreapi.in/api/products'
//'https://fakestoreapi.com/products'

function ShoppingList() {
  const [list, setList] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const { username } = useAuth();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch("https://fakestoreapi.in/api/products", {
          method: "GET",
          headers: {},
        });
        const result = await response.json();
        const resultProducts = result.products;
        setList(resultProducts);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchTask();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-6xl mx-auto px-4 py-8" dir="rtl">
        <h1 className="text-3xl font-semibold text-slate-900 text-center mb-6">
          החנות
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          <section className="w-full lg:w-80 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
              <PriceFilter
                list={list}
                updateMinPrice={setMinPrice}
                updateMaxPrice={setMaxPrice}
              />
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
              <CategoryFilter
                list={list}
                updateCategory={setCategory}
                updateBrand={setBrand}
              />
              <h2 className="text-lg font-medium text-slate-800 text-right">
                Hello {username}!
              </h2>
            </div>
          </section>

          <section className="flex-1">
            <ExpensesTable
              list={list}
              minPrice={minPrice}
              maxPrice={maxPrice}
              category={category}
              brand={brand}
            />
          </section>
        </div>

        <h1 className="mt-10 text-2xl font-bold text-center text-slate-700">
          קנייה נעימה
        </h1>
      </div>
    </div>
  );
}

export default ShoppingList;