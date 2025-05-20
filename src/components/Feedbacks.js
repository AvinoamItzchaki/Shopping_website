import PriceFilter from "./PriceFilter";
import { useState, useEffect } from "react";
import {useAuth} from "./AuthContext";
import CategoryFilter from "./CategoryFilter";
import {GetItemsOfFeedbackProducts} from "./HandleDB";
import FeedbacksExpensesTable from "./FeedbacksExpensesTable";

//'https://fakestoreapi.in/api/products'
//'https://fakestoreapi.com/products'


function Feedbacks() {
    const [list, setList] = useState([]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(Infinity);
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const {username} = useAuth();

    const [isFavorite, setIsFavorite] = useState(true);
    const handleClickIsFavorite = () => {
        setIsFavorite((prev) => !prev);
    };

    useEffect(() => {
        const fetchData = async () => {
            const items = await GetItemsOfFeedbackProducts();
            setList(items);
        }
        fetchData();
    }, );


    return (
        <div className="shoppingList1">
            <h1 className="title">משוב למוצרים</h1>
            <div className="shoppingList">
                <div>
                    <PriceFilter updateMinPrice={setMinPrice} updateMaxPrice={setMaxPrice}/>
                    <div style={{height: "30px"}}></div>
                    <CategoryFilter list={list} updateCategory={setCategory} updateBrand={setBrand}/>
                    <h2>Hello {username}!</h2>
                </div>
                <div>
                    <h1 className="right">
                        כאן תוכל לסמן האם אהבת את אחד מהמוצרים או פחות על ידי הכפתורים.
                    </h1>
                    <h1 className="right">
                        תוכל לבחור מוצר לסמן עליו לפי: טווח מחירים, קטגוריה ומותג.
                    </h1>
                    <h1 className="right">
                        בנוסף תוכל לסמן כמה שתרצה על כל מוצר לפי תחושתך.
                    </h1>
                    <label className="row-for-feedbacks-title">
                        <button
                            onClick={handleClickIsFavorite}
                            style={{
                                backgroundColor: isFavorite ? "blue" : "red",
                                color: "white",
                                border: "none",
                                padding: "10px 20px",
                                fontSize: "16px",
                                borderRadius: "8px",
                                cursor: "pointer",
                            }}
                        >
                            {isFavorite ? "מוצרים אהובים" : "מוצרים פחות אהובים"}
                        </button>
                        <h1>:סינון לפי</h1>
                    </label>
                    <FeedbacksExpensesTable list={list} minPrice={minPrice} maxPrice={maxPrice} category={category}
                                             brand={brand} isSortedByLikes={isFavorite}/>
                </div>
            </div>
            <h1 className="end">שהות נעימה</h1>
        </div>
    )
}


//FeedbacksExpensesTable
//FeedbacksExpenseItemTable
export default Feedbacks;