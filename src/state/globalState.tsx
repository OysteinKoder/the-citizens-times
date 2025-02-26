import { signal } from "@preact/signals";
import dogScientist from "../assets/scientistDog.png";
import badmintonImg from "../assets/badminton.png";

export const MockNewsData = signal([
  {
    title:
      "The new arena for badminton is of high quality. “No surprise there”, says supreme court.",
    img: badmintonImg,
    ingress:
      "The supreme court has praised the new badminton arena for its exceptional quality, stating that it meets all the expected standards. The arena features state-of-the-art facilities and has been designed to provide the best experience for players and spectators alike.",
  },
  {
    title:
      "The Dog Scientist Collective has come to a unanimous conclusion after hours of debate and research: “Cats suck”.",
    img: dogScientist,
    ingress:
      "After extensive research and debate, the Dog Scientist Collective has reached a unanimous decision, declaring their disdain for cats. The collective's findings are based on a series of experiments and observations that highlight the differences between dogs and cats, ultimately favoring dogs.",
  },
]);
