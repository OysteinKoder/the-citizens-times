import bandmingtonImg from "../assets/badminton.png";
import { MockNewsData } from "../state/globalState";

const MainNewsCard = () => {
  console.log(MockNewsData);
  return (
    <div>
      {MockNewsData.value.map((news) => (
        <>
          <div className="bg-base-100 shadow-xl mt-4 md:mt-10 md:pt-2">
            <figure className="flex justify-center align-center md:h-60">
              <img src={news.img} alt="badminton court" />
            </figure>
            <div className="p-1">
              <h2 className="sm:font-semibold md:font-extrabold">
                {news.title}
              </h2>
              <span className="sm hidden md:block md:font-light mt-2 mb-2">
                {news.ingress}
              </span>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default MainNewsCard;
