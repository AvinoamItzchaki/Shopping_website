import {GetItems} from "./HandleDB";
import { useState, useEffect } from 'react';
import HandleCartProducts from "./HandleCartProducts";

function CartPage() {
    const [data, setData] = useState([]);
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const items = await GetItems();
            setData(items);
        }
        fetchData();
    }, [counter]);
    return (
        <HandleCartProducts list={data} updateCounter={setCounter} Counter1={counter} />
    )
}
export default CartPage;