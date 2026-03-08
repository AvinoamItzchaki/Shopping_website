import React from 'react';
import { Img } from 'react-image';
import { AddFeedbackOnProduct } from "./HandleDB";

function FeedbacksExpenseItemTable(props) {
  const handleLike = () => {
    const addFeedbackLikeOnProduct = async () => {
      await AddFeedbackOnProduct(
        props.image,
        props.title,
        props.price,
        props.category,
        props.brand,
        true
      );
    };
    addFeedbackLikeOnProduct();
  };

  const handleDislike = () => {
    const addFeedbackDislikeOnProduct = async () => {
      await AddFeedbackOnProduct(
        props.image,
        props.title,
        props.price,
        props.category,
        props.brand,
        false
      );
    };
    addFeedbackDislikeOnProduct();
  };

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

      <div className="w-full flex flex-col items-center space-y-3">
        <div className="flex items-center justify-between gap-4 text-lg font-semibold">
          <span className="text-sky-600">{props.likesCounter}</span>
          <span className="text-rose-500">{props.dislikesCounter}</span>
        </div>

        <div className="inline-flex items-center justify-center rounded-full bg-slate-900 text-white px-3 py-1 text-sm font-semibold">
          {props.price}$
        </div>

        <div className="flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={handleLike}
            aria-label={`אהבתי: ${props.title}`}
            className="inline-flex items-center justify-center rounded-xl bg-sky-600 px-3 py-2 text-lg text-white hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
          >
            👍
          </button>
          <button
            type="button"
            onClick={handleDislike}
            aria-label={`לא אהבתי: ${props.title}`}
            className="inline-flex items-center justify-center rounded-xl bg-rose-600 px-3 py-2 text-lg text-white hover:bg-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
          >
            👎
          </button>
        </div>
      </div>
    </div>
  );
}

export default FeedbacksExpenseItemTable;




/*
    <button variant="danger"
            onClick={() => {
                const clearSingleProduct = async () => {
                    await DeletingSingleProduct(props.id);
                    props.updateCounter(prevState => prevState + 1);
                                    }
                                    clearSingleProduct()
                                }
                                }
                        >
                            Remove From Cart
                        </button>
<Button variant="primary"
                                onClick={
                                    AddFeedbackOnProduct(props.image, props.title, props.price
                                        , props.category, props.brand, true)
                                }>
                            Like
                        </Button>
                        <Button variant="danger"
                                onClick={
                                    AddFeedbackOnProduct(props.image, props.title, props.price
                                        , props.category, props.brand, false)
                                }>
                        >
                            Dislike
                        </Button>
*/
