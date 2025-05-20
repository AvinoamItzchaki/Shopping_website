import ExpenseItemTable from "./ExpenseItemTable";
import {ClearCollection, GetMoneyAmount, ReduceMoneyAmount, SavePurchasedItemsToHistory} from "./HandleDB";
import './css/ExpensesTable.css'
import {useEffect, useState} from "react";

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

    return (
        <div className="shoppingList">
            <div className='expense-grid-to-cart'>
                {
                    props.list.map((item, index) => {
                        return (
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
                        )
                    })
                }
            </div>
            <div className="divRight">
                <br/>
                <h2>סכום הקנייה שלך הוא: ${total}.</h2>
                <br/>
                <h2>סכום הכסף בחשבון כרגע {customerMoneyAmount}$</h2>
                <br/>
                {customerMoneyAmountAfterPurchase >= 0 ? (
                    <h2>לאחר רכישת המוצרים הסכום שישאר לך בחשבונך הוא: {customerMoneyAmountAfterPurchase}$.</h2>
                ) : (
                    <h2>אין לך מספיק כסף בחשבון להשלמת הרכישה, הורד מוצרים מהעגלה או שחזור בפעם אחרת.</h2>
                )}
                <br/>
                <div style={{display: "flex", justifyContent: "right", gap: "10px"}}>
                    <button onClick={() => {
                        const purchase = async () => {
                            await ReduceMoneyAmount(total);
                            await SavePurchasedItemsToHistory();
                            await ClearCollection();
                            alert('הרכישה בוצעה בהצלחה');
                            props.updateCounter(prevState => prevState + 1);
                        }
                        purchase()
                    }}>קניית העגלה
                    </button>
                    <button onClick={() => {
                        const clear = async () => {
                            await ClearCollection();
                            alert('העגלה נוקתה');
                            props.updateCounter(prevState => prevState + 1);
                        }
                        clear()
                    }}>מחיקת תכולת העגלה
                    </button>
                </div>
                <br/><br/><br/>
                <h2>.</h2>
            </div>
        </div>
    )
}

export default HandleCartProducts;