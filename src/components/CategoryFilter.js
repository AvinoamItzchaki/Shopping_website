import { useState } from "react";

function CategoryFilter(props) {
  const arrayOfCategories = [...new Set(props.list.map(item => item.category))];
  const arrayOfBrands = [...new Set(props.list.map(item => item.brand))];
  const [selectedOptionOfCategory, setSelectedOptionOfCategory] = useState("");
  const [selectedOptionOfBrand, setSelectedOptionOfBrand] = useState("");

  const handleCategoryChange = (event) => {
    setSelectedOptionOfCategory(event.target.value);
  };
  const handleBrandChange = (event) => {
    setSelectedOptionOfBrand(event.target.value);
  };
  const applyFilterProducts = () => {
    props.updateCategory(selectedOptionOfCategory);
    props.updateBrand(selectedOptionOfBrand);
  };
  const applyBackToNormal = () => {
    setSelectedOptionOfCategory("");
    setSelectedOptionOfBrand("");
    props.updateCategory("");
    props.updateBrand("");
  };

  const baseButton =
    "inline-flex items-center justify-center rounded-xl px-3 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2";

  return (
    <div className="flex flex-col gap-4">
      <label className="flex items-center gap-3 text-sm text-slate-800">
        <span>Choose a category:</span>
        <select
          className="rounded-xl border border-slate-300 bg-white px-2 py-1 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500"
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

      <label className="flex items-center gap-3 text-sm text-slate-800">
        <span>Choose a brand:</span>
        <select
          className="rounded-xl border border-slate-300 bg-white px-2 py-1 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500"
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

      <div className="flex gap-3">
        <button
          type="button"
          className={`${baseButton} bg-slate-900 text-white hover:bg-slate-800`}
          onClick={applyFilterProducts}
        >
          Filter Products
        </button>
        <button
          type="button"
          className={`${baseButton} bg-white text-slate-900 border border-slate-300 hover:bg-slate-50`}
          onClick={applyBackToNormal}
        >
          Back To Normal
        </button>
      </div>
    </div>
  );
}

export default CategoryFilter;