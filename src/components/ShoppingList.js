import ExpensesTable from "./ExpensesTable";
import PriceFilter from "./PriceFilter";
import { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import CategoryFilter from "./CategoryFilter";
import { GetSiteProducts, SeedSiteProductsFromHistory } from "./HandleDB";

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
        let products = await GetSiteProducts();

        // If the catalog is empty, seed it from purchase history once (idempotent).
        if (!products || products.length === 0) {
          await SeedSiteProductsFromHistory();
          products = await GetSiteProducts();
        }

        setList(products || []);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setList([]);
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

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="flex-1">
              <PriceFilter
                list={list}
                updateMinPrice={setMinPrice}
                updateMaxPrice={setMaxPrice}
              />
            </div>
            <div className="flex-1">
              <CategoryFilter
                list={list}
                updateCategory={setCategory}
                updateBrand={setBrand}
              />
            </div>
          </div>
          <h2 className="mt-4 text-lg font-medium text-slate-800 text-right">
            Hello {username}!
          </h2>
        </div>

        <section className="mt-6">
          <ExpensesTable
            list={list}
            minPrice={minPrice}
            maxPrice={maxPrice}
            category={category}
            brand={brand}
          />
        </section>

        <h1 className="mt-10 text-2xl font-bold text-center text-slate-700">
          קנייה נעימה
        </h1>
      </div>
    </div>
  );
}

export default ShoppingList;