import { MockMainNewsData } from "../state/globalState";

const MainNewsCard = () => {
  console.log(MockMainNewsData);
  return (
    <div>
      {MockMainNewsData.value.map((news) => (
        <>
          <div className="bg-base-100 shadow-xl mt-4 md:mt-10 md:pt-2">
            <figure className="flex justify-center align-center md:h-60">
              <img src={news.img} alt="badminton court" />
            </figure>
            <div className="p-1">
              <h2 className="sm:font-semibold md:font-extrabold">
                {news.title}
              </h2>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default MainNewsCard;
