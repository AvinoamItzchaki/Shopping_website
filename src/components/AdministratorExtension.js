import PriceFilter from "./PriceFilter";
import { useState, useEffect } from "react";
import {useAuth} from "./AuthContext";
import CategoryFilter from "./CategoryFilter";
import {GetItemsOfHistory, GetRegisteredPeople} from "./HandleDB";
import StatisticsExpensesTable from "./StatisticsExpensesTable";
import "./css/AdministratorExtension.css";


function AdministratorExtension() {
    const [listOfProductsHistory, setListOfProductsHistory] = useState([]);
    const [listOfRegisteredPeople , setListOfRegisteredPeople] = useState([]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(Infinity);
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const {username} = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            const items = await GetItemsOfHistory();
            setListOfProductsHistory(items);
        }
        fetchData();
    }, );
    useEffect(() => {
        const fetchData1 = async () => {
            const items1 = await GetRegisteredPeople();
            setListOfRegisteredPeople(items1);
        }
        fetchData1();
    }, );


    return (
        <div className="shoppingList1">
            <h1 className="title">הרחבה למנהל</h1>
            <div className="shoppingList">
                <div>
                    <PriceFilter updateMinPrice={setMinPrice} updateMaxPrice={setMaxPrice}/>
                    <div style={{height: "30px"}}></div>
                    <CategoryFilter list={listOfProductsHistory} updateCategory={setCategory} updateBrand={setBrand}/>
                    <h2>Hello {username}!</h2>
                </div>
                <div>
                    <h1 className="title">רשימת היסטורית הקניות באתר</h1>
                    <StatisticsExpensesTable list={listOfProductsHistory} minPrice={minPrice} maxPrice={maxPrice}
                                             category={category}
                                             brand={brand} isManager={true}/>
                    <br/>

                    <h1 className="title">רשימת האנשים הרשומים באתר</h1>
                    <table className="user-table">
                        <thead>
                        <tr>
                            <th >שם המשתמש</th>
                            <th >זמן יצירה</th>
                        </tr>
                        </thead>
                        <tbody>
                        {listOfRegisteredPeople
                            .map((user, index) => (
                            <tr  key={index} className="user-row">
                                <td className="td1">{user.username}</td>
                                <td className="td1">{user.createdAt.toDate().toLocaleString()}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <h1 className="end">שהות נעימה</h1>
        </div>

    )
}
export default AdministratorExtension;