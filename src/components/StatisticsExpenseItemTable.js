import React from 'react';
import { Img } from 'react-image';

function StatisticsExpenseItemTable(props) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-col items-center space-y-4">
      <Img
        src={props.image}
        alt={props.title}
        className="w-40 h-40 object-cover rounded-lg border border-slate-200"
      />

      <div className="w-full text-center">
        <h5 className="text-sm font-medium text-slate-900 line-clamp-2">
          {props.title}
        </h5>
      </div>

      <div className="w-full flex flex-col items-center space-y-2">
        <div className="text-sm font-semibold text-slate-700">
          x {props.count}
        </div>

        <div className="inline-flex items-center justify-center rounded-full bg-slate-900 text-white px-3 py-1 text-sm font-semibold">
          {props.price}$
        </div>
      </div>
    </div>
  );
}

export default StatisticsExpenseItemTable;