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
          <figure className="flex justify-center align-center md:h-60 p-0">
            <img src={news.img} alt={news.alt} className="w-full" />
          </figure>
          <div className="p-1">
            <h2 className="sm:font-semibold md:font-extrabold p-4">
              {news.title}
            </h2>
            <span className="sm hidden md:block md:font-light p-4">
              {news.ingress}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeadlineNewsCard;
