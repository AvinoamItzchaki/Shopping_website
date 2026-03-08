import PriceFilter from "./PriceFilter";
import { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import CategoryFilter from "./CategoryFilter";
import { GetItemsOfFeedbackProducts } from "./HandleDB";
import FeedbacksExpensesTable from "./FeedbacksExpensesTable";

//'https://fakestoreapi.in/api/products'
//'https://fakestoreapi.com/products'

function Feedbacks() {
  const [list, setList] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const { username } = useAuth();

  const [isFavorite, setIsFavorite] = useState(true);
  const handleClickIsFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  useEffect(() => {
    const fetchData = async () => {
      const items = await GetItemsOfFeedbackProducts();
      setList(items);
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-6xl mx-auto px-4 py-8" dir="rtl">
        <h1 className="text-3xl font-semibold text-slate-900 text-center mb-6">
          משוב למוצרים
        </h1>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="flex-1">
              <PriceFilter updateMinPrice={setMinPrice} updateMaxPrice={setMaxPrice} />
            </div>
            <div className="flex-1">
              <CategoryFilter list={list} updateCategory={setCategory} updateBrand={setBrand} />
            </div>
          </div>
          <h2 className="text-lg font-medium text-slate-800 text-right">
            Hello {username}!
          </h2>
        </div>

        <section className="mt-6 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-3">
            <p className="text-right text-slate-700">
              כאן תוכל לסמן האם אהבת את אחד מהמוצרים או פחות על ידי הכפתורים.
            </p>
            <p className="text-right text-slate-700">
              תוכל לבחור מוצר לסמן עליו לפי: טווח מחירים, קטגוריה ומותג.
            </p>
            <p className="text-right text-slate-700">
              בנוסף תוכל לסמן כמה שתרצה על כל מוצר לפי תחושתך.
            </p>

            <div className="flex items-center justify-end gap-4">
              <button
                type="button"
                onClick={handleClickIsFavorite}
                className={`inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium text-white transition focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 ${
                  isFavorite ? "bg-slate-900 hover:bg-slate-800" : "bg-rose-600 hover:bg-rose-500"
                }`}
              >
                {isFavorite ? "מוצרים אהובים" : "מוצרים פחות אהובים"}
              </button>
              <h2 className="text-lg font-medium text-slate-800">
                :סינון לפי
              </h2>
            </div>
          </div>

          <FeedbacksExpensesTable
            list={list}
            minPrice={minPrice}
            maxPrice={maxPrice}
            category={category}
            brand={brand}
            isSortedByLikes={isFavorite}
          />
        </section>

        <h2 className="mt-10 text-2xl font-bold text-center text-slate-700">
          שהות נעימה
        </h2>
      </div>
    </div>
  );
}

export default Feedbacks;