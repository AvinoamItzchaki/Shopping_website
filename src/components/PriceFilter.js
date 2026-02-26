import { useState } from "react";

function PriceFilter(props) {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };
  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };
  const applyFilterProducts = () => {
    props.updateMinPrice(minPrice);
    props.updateMaxPrice(maxPrice);
  };
  const applyBackToNormal = () => {
    setMinPrice(0);
    setMaxPrice(Infinity);
    props.updateMinPrice(0);
    props.updateMaxPrice(Infinity);
  };

  const baseButton =
    "inline-flex items-center justify-center rounded-xl px-3 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2";

  return (
    <div className="flex flex-col gap-4" dir="rtl">
      <label className="flex items-center gap-3 text-sm text-slate-800">
        <span>Min Price:</span>
        <input
          className="w-40 rounded-xl border border-slate-300 bg-white px-2 py-1 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500"
          type="number"
          name="minPrice"
          min="0"
          value={minPrice}
          onChange={handleMinPriceChange}
        />
      </label>

      <label className="flex items-center gap-3 text-sm text-slate-800">
        <span>Max Price:</span>
        <input
          className="w-40 rounded-xl border border-slate-300 bg-white px-2 py-1 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500"
          type="number"
          name="maxPrice"
          min="0"
          value={maxPrice}
          onChange={handleMaxPriceChange}
        />
      </label>

      <div className="flex gap-3">
        <button
          className={`${baseButton} bg-slate-900 text-white hover:bg-slate-800`}
          onClick={applyFilterProducts}
        >
          Filter Products
        </button>
        <button
          className={`${baseButton} bg-white text-slate-900 border border-slate-300 hover:bg-slate-50`}
          onClick={applyBackToNormal}
        >
          Back To Normal
        </button>
      </div>
    </div>
  );
}

export default PriceFilter;