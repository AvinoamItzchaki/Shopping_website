import PriceFilter from "./PriceFilter";
import { useState, useEffect } from "react";
import {useAuth} from "./AuthContext";
import CategoryFilter from "./CategoryFilter";
import {GetItemsOfHistory} from "./HandleDB";
import StatisticsExpensesTable from "./StatisticsExpensesTable";

//'https://fakestoreapi.in/api/products'
//'https://fakestoreapi.com/products'


function Statistics() {
    const [list, setList] = useState([])
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(Infinity);
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const {username} = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            const items = await GetItemsOfHistory();
            setList(items);
        }
        fetchData();
    }, );


    return (
        <div className="shoppingList1">
            <h1 className="title">אזור הסטטיסטיקות</h1>
            <div className="shoppingList">
                <div>
                    <PriceFilter updateMinPrice={setMinPrice} updateMaxPrice={setMaxPrice}/>
                    <div style={{height: "30px"}}></div>
                    <CategoryFilter list={list} updateCategory={setCategory} updateBrand={setBrand}/>
                    <h2>Hello {username}!</h2>
                </div>
                <div>
                    <h1 className="right"> נבחר המותג וגם הקטגוריה בין המחירים שבחרת ובהם:</h1>
                    <h1 className="title">שלושת המוצרים הכי נמכרים</h1>
                    <StatisticsExpensesTable list={list} minPrice={minPrice} maxPrice={maxPrice} category={category}
                                             brand={brand} isStatistic={true} isManager={false}/>
                    <h1 className="title">שלושת המוצרים הכי פחות נמכרים</h1>
                    <StatisticsExpensesTable list={list} minPrice={minPrice} maxPrice={maxPrice} category={category}
                                             brand={brand} isStatistic={false} isManager={false}/>
                </div>
            </div>
            <h1 className="end">שהות נעימה</h1>
        </div>
    )
}

//StatisticsExpensesTable
//StatisticsExpenseItemTable
export default Statistics;