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
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-3">
              <h1 className="text-right text-slate-700">
                כאן תוכל לסמן האם אהבת את אחד מהמוצרים או פחות על ידי הכפתורים.
              </h1>
              <h1 className="text-right text-slate-700">
                תוכל לבחור מוצר לסמן עליו לפי: טווח מחירים, קטגוריה ומותג.
              </h1>
              <h1 className="text-right text-slate-700">
                בנוסף תוכל לסמן כמה שתרצה על כל מוצר לפי תחושתך.
              </h1>

              <label className="flex items-center justify-end gap-4">
                <button
                  onClick={handleClickIsFavorite}
                  className={`inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium text-white transition ${
                    isFavorite ? "bg-slate-900 hover:bg-slate-800" : "bg-rose-600 hover:bg-rose-500"
                  }`}
                >
                  {isFavorite ? "מוצרים אהובים" : "מוצרים פחות אהובים"}
                </button>
                <h1 className="text-lg font-medium text-slate-800">
                  :סינון לפי
                </h1>
              </label>
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
        </div>

        <h1 className="mt-10 text-2xl font-bold text-center text-slate-700">
          שהות נעימה
        </h1>
      </div>
    </div>
  );
}

export default Feedbacks;