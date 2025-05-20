import {useState} from "react";
import './css/PriceFilter.css'

function CategoryFilter(props) {
    let arrayOfCategories = [...new Set(props.list.map(item => item.category))]
    let arrayOfBrands = [...new Set(props.list.map(item => item.brand))]
    const [selectedOptionOfCategory, setSelectedOptionOfCategory] = useState("");
    const [selectedOptionOfBrand, setSelectedOptionOfBrand] = useState("");

    const handleCategoryChange = (event) => {
        setSelectedOptionOfCategory(event.target.value)
    }
    const handleBrandChange = (event) => {
        setSelectedOptionOfBrand(event.target.value)
    }
    const applyFilterProducts = () => {
        props.updateCategory(selectedOptionOfCategory)
        props.updateBrand(selectedOptionOfBrand)
    }
    const applyBackToNormal = () => {
        setSelectedOptionOfCategory("");
        setSelectedOptionOfBrand("");
        props.updateCategory("");
        props.updateBrand("");
    };

    return (
        <div className="divFilter">
            <label className="labelFilter">
                <h5>Choose a category:</h5>
                <select
                    value={selectedOptionOfCategory}
                    onChange={handleCategoryChange}
                >
                    <option value=""></option>
                    {arrayOfCategories.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </label>

            <label className="labelFilter">
                <h5>Choose a brand:</h5>
                <select
                    value={selectedOptionOfBrand}
                    onChange={handleBrandChange}
                >
                    <option value=""></option>
                    {arrayOfBrands.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </label>

            <button className="buttonFilterProducts" onClick={applyFilterProducts}>
                Filter Products
            </button>
            <button className="buttonBackToNormal" onClick={applyBackToNormal}>
                Back To Normal
            </button>
        </div>
    );

}

export default CategoryFilter;