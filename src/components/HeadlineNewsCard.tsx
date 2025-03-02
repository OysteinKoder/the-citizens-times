import { MockMainNewsData } from "../state/globalState";

// The headline news will be the first two news shown
const HeadlineNewsCard = () => {
  return (
    <div>
      {MockMainNewsData.value.slice(0, 2).map((news) => (
        <div
          key={news.ingress}
          className="bg-base-100 shadow-xl mt-4 md:mt-10 md:pt-2"
        >
          <figure className="flex justify-center align-center md:h-60 p-3">
            <img src={news.img} alt={news.alt} />
          </figure>
          <div className="p-1">
            <h2 className="sm:font-semibold md:font-extrabold">{news.title}</h2>
            <span className="sm hidden md:block md:font-light mt-2 mb-2">
              {news.ingress}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeadlineNewsCard;
