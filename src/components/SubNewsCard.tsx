import { MockMainNewsData, MockAdsData } from "../state/globalState";

// Sub news will be after the headline news
const SubNewsCard = () => {
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
            class="flex flex-row-reverse  bg-base-100 shadow-xl mt-4 md:mt-10"
          >
            <figure class="flex justify-center align-center md:h-60 w-1/3">
              <img
                src={data.img}
                alt={data.title}
                class="object-cover w-full"
              />
            </figure>
            <div class=" w-2/3">
              <h2 class="sm:font-semibold md:font-extrabold p-4">
                {data.title}
              </h2>
              {isAd && (
                <span class="font-extralight text-sm">Sponsored Ad</span>
              )}
              <span class="sm hidden md:block md:font-light mt-2 mb-2">
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
