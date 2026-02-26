import PriceFilter from "./PriceFilter";
import { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import CategoryFilter from "./CategoryFilter";
import { GetItemsOfHistory } from "./HandleDB";
import StatisticsExpensesTable from "./StatisticsExpensesTable";

//'https://fakestoreapi.in/api/products'
//'https://fakestoreapi.com/products'

function Statistics() {
  const [list, setList] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const { username } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const items = await GetItemsOfHistory();
      setList(items);
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-6xl mx-auto px-4 py-8" dir="rtl">
        <h1 className="text-3xl font-semibold text-slate-900 text-center mb-6">
          אזור הסטטיסטיקות
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          <section className="w-full lg:w-80 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
              <PriceFilter updateMinPrice={setMinPrice} updateMaxPrice={setMaxPrice} />
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
              <CategoryFilter list={list} updateCategory={setCategory} updateBrand={setBrand} />
              <h2 className="text-lg font-medium text-slate-800 text-right">
                Hello {username}!
              </h2>
            </div>
          </section>

          <section className="flex-1 space-y-6">
            <div className="space-y-2">
              <h1 className="text-right text-lg text-slate-700">
                נבחר המותג וגם הקטגוריה בין המחירים שבחרת ובהם:
              </h1>
              <h1 className="text-center text-2xl font-semibold text-slate-900">
                שלושת המוצרים הכי נמכרים
              </h1>
              <StatisticsExpensesTable
                list={list}
                minPrice={minPrice}
                maxPrice={maxPrice}
                category={category}
                brand={brand}
                isStatistic={true}
                isManager={false}
              />
            </div>

            <div className="space-y-2">
              <h1 className="text-center text-2xl font-semibold text-slate-900">
                שלושת המוצרים הכי פחות נמכרים
              </h1>
              <StatisticsExpensesTable
                list={list}
                minPrice={minPrice}
                maxPrice={maxPrice}
                category={category}
                brand={brand}
                isStatistic={false}
                isManager={false}
              />
            </div>
          </section>
        </div>

        <h1 className="mt-10 text-2xl font-bold text-center text-slate-700">
          שהות נעימה
        </h1>
      </div>
    </div>
  );
}

export default Statistics;