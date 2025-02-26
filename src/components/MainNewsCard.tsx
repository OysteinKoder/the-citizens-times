import bandmingtonImg from "../assets/badminton.png";
import scientistDog from "../assets/scientistDog.png";

const MainNewsCard = () => {
  return (
    <div>
      <div className="bg-base-100 shadow-xl mt-2">
        <figure className="flex justify-center align-center md:h-60">
          <img src={bandmingtonImg} alt="badminton court" />
        </figure>
        <div className="p-1">
          <h2 className="sm bold">
            The new arena for badminton is of high quality. “No surprise there”,
            says supreme court.
          </h2>
        </div>
      </div>
      <div className="bg-base-100 shadow-xl mt-8">
        <figure className="flex justify-center align-center md:h-60">
          <img src={scientistDog} alt="badminton court" />
        </figure>
        <div className="p-1">
          <h2 className="sm bold">
            The Dog Scientist Collective has come to a unanimous conclution
            after hours of debate and research: "Cats suck".
          </h2>
        </div>
      </div>
    </div>
  );
};

export default MainNewsCard;
