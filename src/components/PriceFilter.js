import {useState} from "react";
import './css/PriceFilter.css'

function PriceFilter(props) {
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(Infinity);

    const handleMinPriceChange = (event) => {
        setMinPrice(event.target.value)
    }
    const handleMaxPriceChange = (event) => {
        setMaxPrice(event.target.value)
    }
    const applyFilterProducts = () => {
        props.updateMinPrice(minPrice)
        props.updateMaxPrice(maxPrice)
    }
    const applyBackToNormal = () => {
        setMinPrice(0)
        setMaxPrice(Infinity)
        props.updateMinPrice(minPrice)
        props.updateMaxPrice(maxPrice)
    }
    return (
        <div className="divFilter">
            <label className="labelFilter">
                <h5>Min Price:</h5>
                <input
                    className="inputFilter"
                    type="number"
                    name="minPrice"
                    min="0"
                    value={minPrice}
                    onChange={handleMinPriceChange}
                />
            </label>

            <label className="labelFilter">
                <h5>Max Price:</h5>
                <input
                    className="inputFilter"
                    type="number"
                    name="maxPrice"
                    min="0"
                    value={maxPrice}
                    onChange={handleMaxPriceChange}
                />
            </label>

            <button className="buttonFilterProducts" onClick={applyFilterProducts}>
                Filter Products
            </button>
            <button className="buttonBackToNormal" onClick={applyBackToNormal}>
                Back To Normal
            </button>
        </div>
    )
}

export default PriceFilter;