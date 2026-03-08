import ExpenseItemTable from "./ExpenseItemTable";
import { ClearCollection, GetMoneyAmount, ReduceMoneyAmount, SavePurchasedItemsToHistory } from "./HandleDB";
import { useEffect, useState } from "react";

function HandleCartProducts(props) {
  const [counter1, setCounter1] = useState(props.Counter1);
  const [customerMoneyAmount, setCustomerMoneyAmount] = useState(0);

  let total = props.list.reduce((sum, product) => {
    sum += product.price * product.count;
    return sum;
  }, 0);
  props.updateCounter(counter1);

  let customerMoneyAmountAfterPurchase = Number(customerMoneyAmount) - Number(total);

  useEffect(() => {
    const fetchCustomerMoneyAmount = async () => {
      setCustomerMoneyAmount(await GetMoneyAmount());
    };
    fetchCustomerMoneyAmount();
  }, []);

  const primaryButtonClasses =
    "inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2";
  const secondaryButtonClasses =
    "inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-900 border border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2";

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-6xl mx-auto px-4 py-8" dir="rtl">
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)]">
          <div className="space-y-4">
            {props.list.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 text-center text-slate-500">
                העגלה ריקה
              </div>
            ) : (
              <div className="space-y-4">
                {props.list.map((item, index) => (
                  <ExpenseItemTable
                    image={item.image}
                    title={item.title}
                    count={item.count}
                    price={item.price}
                    isCart={true}
                    id={item.id}
                    key={index}
                    updateCounter={setCounter1}
                  />
                ))}
              </div>
            )}
          </div>

          <aside className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
            <h2 className="text-xl font-semibold text-slate-900">
              סיכום קנייה
            </h2>
            <p className="text-sm text-slate-700">
              סכום הקנייה שלך הוא:{" "}
              <span className="font-semibold">${total}</span>.
            </p>
            <p className="text-sm text-slate-700">
              סכום הכסף בחשבון כרגע{" "}
              <span className="font-semibold">{customerMoneyAmount}$</span>
            </p>
            {customerMoneyAmountAfterPurchase >= 0 ? (
              <p className="text-sm text-slate-700">
                לאחר רכישת המוצרים הסכום שישאר לך בחשבונך הוא:{" "}
                <span className="font-semibold">
                  {customerMoneyAmountAfterPurchase}$
                </span>
                .
              </p>
            ) : (
              <p className="text-sm text-rose-600">
                אין לך מספיק כסף בחשבון להשלמת הרכישה, הורד מוצרים מהעגלה או שחזור בפעם אחרת.
              </p>
            )}

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                className={primaryButtonClasses}
                onClick={() => {
                  const purchase = async () => {
                    await ReduceMoneyAmount(total);
                    await SavePurchasedItemsToHistory();
                    await ClearCollection();
                    alert('הרכישה בוצעה בהצלחה');
                    props.updateCounter(prevState => prevState + 1);
                  };
                  purchase();
                }}
              >
                קניית העגלה
              </button>
              <button
                type="button"
                className={secondaryButtonClasses}
                onClick={() => {
                  const clear = async () => {
                    await ClearCollection();
                    alert('העגלה נוקתה');
                    props.updateCounter(prevState => prevState + 1);
                  };
                  clear();
                }}
              >
                מחיקת תכולת העגלה
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default HandleCartProducts;