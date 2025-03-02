import { MockMainNewsData, MockAdsData } from "../state/globalState";

// Sub news will be after the headline news
const SubNewsCard = () => {
  console.log(MockMainNewsData);
  return (
    <div>
      {MockMainNewsData.value.map((news, index) => {
        const isAd = index % 3 === 2;
        const data = isAd
          ? MockAdsData.value[Math.floor(index / 3) % MockAdsData.value.length]
          : news;
        return (
          <div
            key={index}
            className="flex flex-row-reverse bg-base-100 shadow-xl mt-4 md:mt-10 md:pt-2"
          >
            <figure className="flex justify-center align-center md:h-60 w-1/3">
              <img
                src={data.img}
                alt={data.title}
                className="object-cover w-full"
              />
            </figure>
            <div className="p-2 w-2/3">
              <h2 className="sm:font-semibold md:font-extrabold">
                {data.title}
              </h2>
              {isAd && (
                <span className="font-extralight text-sm">Sponsored Ad</span>
              )}
              <span className="sm hidden md:block md:font-light mt-2 mb-2">
                {data.ingress}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SubNewsCard;
