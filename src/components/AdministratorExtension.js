import PriceFilter from "./PriceFilter";
import { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import CategoryFilter from "./CategoryFilter";
import { GetItemsOfHistory, GetRegisteredPeople } from "./HandleDB";
import StatisticsExpensesTable from "./StatisticsExpensesTable";

function AdministratorExtension() {
  const [listOfProductsHistory, setListOfProductsHistory] = useState([]);
  const [listOfRegisteredPeople, setListOfRegisteredPeople] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const { username } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const items = await GetItemsOfHistory();
      setListOfProductsHistory(items);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData1 = async () => {
      const items1 = await GetRegisteredPeople();
      setListOfRegisteredPeople(items1);
    };
    fetchData1();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-6xl mx-auto px-4 py-8" dir="rtl">
        <h1 className="text-3xl font-semibold text-slate-900 text-center mb-6">
          הרחבה למנהל
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          <section className="w-full lg:w-80 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
              <PriceFilter updateMinPrice={setMinPrice} updateMaxPrice={setMaxPrice} />
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
              <CategoryFilter
                list={listOfProductsHistory}
                updateCategory={setCategory}
                updateBrand={setBrand}
              />
              <h2 className="text-lg font-medium text-slate-800 text-right">
                Hello {username}!
              </h2>
            </div>
          </section>

          <section className="flex-1 space-y-8">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900 text-center mb-4">
                רשימת היסטורית הקניות באתר
              </h1>
              <StatisticsExpensesTable
                list={listOfProductsHistory}
                minPrice={minPrice}
                maxPrice={maxPrice}
                category={category}
                brand={brand}
                isManager={true}
              />
            </div>

            <div>
              <h1 className="text-2xl font-semibold text-slate-900 text-center mb-4">
                רשימת האנשים הרשומים באתר
              </h1>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 bg-white rounded-xl shadow-sm border border-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-2 text-right text-xs font-semibold text-slate-700">
                        שם המשתמש
                      </th>
                      <th className="px-4 py-2 text-right text-xs font-semibold text-slate-700">
                        זמן יצירה
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {listOfRegisteredPeople.map((user, index) => (
                      <tr
                        key={index}
                        className="hover:bg-slate-50 transition"
                      >
                        <td className="px-4 py-2 text-sm text-slate-800">
                          {user.username}
                        </td>
                        <td className="px-4 py-2 text-sm text-slate-600">
                          {user.createdAt.toDate().toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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

export default AdministratorExtension;