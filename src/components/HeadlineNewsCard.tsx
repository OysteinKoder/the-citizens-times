import { MockMainNewsData } from "../state/globalState";

// The headline news will be the first two news shown
const HeadlineNewsCard = () => {
  return (
    <div>
      {MockMainNewsData.value.slice(0, 2).map((news) => (
        <div
          key={news.ingress}
          class="bg-base-100 shadow-xl mt-4 md:mt-10 md:pt-2"
        >
          <figure class="flex justify-center align-center md:h-60 p-0">
            <img src={news.img} alt={news.alt} class="w-full object-contain" />
          </figure>
          <div class="p-1">
            <h2 class="sm:font-semibold md:font-extrabold p-4">{news.title}</h2>
            <span class="sm hidden md:block md:font-light p-4">
              {news.ingress}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeadlineNewsCard;
