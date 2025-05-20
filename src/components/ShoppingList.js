import ExpensesTable from "./ExpensesTable";
import PriceFilter from "./PriceFilter";
import { useState, useEffect } from "react";
import {useAuth} from "./AuthContext";
import CategoryFilter from "./CategoryFilter";
import "./css/ShoppingList.css"

//'https://fakestoreapi.in/api/products'
//'https://fakestoreapi.com/products'

function ShoppingList() {
    const [list, setList] = useState([])
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(Infinity);
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const {username} = useAuth();


    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await fetch('https://fakestoreapi.in/api/products', {
                    method: 'GET',
                    headers: {
                    }
                })
                const result = await response.json();
                const resultProducts = result.products;
                setList(resultProducts);
            }
            catch (error) {
                console.error('Error fetching data: ', error);
            }
        }
        fetchTask();
    }, [])


    return (
        <div className="shoppingList1">
            <h1 className="title">החנות</h1>
                    <div className="shoppingList">
                        <div>
                    <PriceFilter list={list} updateMinPrice={setMinPrice} updateMaxPrice={setMaxPrice}/>
                    <div style={{height: "30px"}}></div>
                    <CategoryFilter list={list} updateCategory={setCategory} updateBrand={setBrand}/>
                    <h2>Hello {username}!</h2>
                </div>
                <ExpensesTable list={list} minPrice={minPrice} maxPrice={maxPrice} category={category} brand={brand}/>
            </div>
            <h1 className="end">קנייה נעימה</h1>
        </div>
    )
}

export default ShoppingList;
//'https://fakestoreapi.in/api/products'