import { signal } from "@preact/signals";
import dogScientist from "../assets/scientistDog.png";
import badmintonImg from "../assets/badminton.png";

// Mock data used for generating news
// Will later be replaced by a fetch and data from a backend

export const MockMainNewsData = signal([
  {
    title:
      "The new arena for badminton is of high quality. “No surprise there”, says supreme court.",
    img: badmintonImg,
    alt: "badminton court",
    ingress:
      "The supreme court has praised the new itself for its exceptional quality, stating that it meets all the expected standards. The arena features state-of-the-art facilities and has been designed to provide the best experience for players and spectators alike. Worries are raised about the unbiased nature of the supreme court if any lawsuits should happen as they are siblings in name",
  },
  {
    title:
      "The Dog Scientist Collective has come to a unanimous conclusion after hours of debate and research: “Cats suck”.",
    img: dogScientist,
    alt: "dog scientist wearing a lab coat and glasses with glasses",
    ingress:
      "After extensive research and debate, the Dog Scientist Collective has reached a unanimous decision, declaring their disdain for cats. The collective's findings are based on a series of experiments and observations that highlight the differences between dogs and cats, ultimately favoring dogs.",
  },
  {
    title:
      "The new arena for badminton is of high quality. “No surprise there”, says supreme court.",
    img: badmintonImg,
    alt: "badminton court",
    ingress:
      "The supreme court has praised the new itself for its exceptional quality, stating that it meets all the expected standards. The arena features state-of-the-art facilities and has been designed to provide the best experience for players and spectators alike. Worries are raised about the unbiased nature of the supreme court if any lawsuits should happen as they are siblings in name",
  },
  {
    title:
      "The new arena for badminton is of high quality. “No surprise there”, says supreme court.",
    img: badmintonImg,
    alt: "badminton court",
    ingress:
      "The supreme court has praised the new itself for its exceptional quality, stating that it meets all the expected standards. The arena features state-of-the-art facilities and has been designed to provide the best experience for players and spectators alike. Worries are raised about the unbiased nature of the supreme court if any lawsuits should happen as they are siblings in name",
  },
  {
    title:
      "The Dog Scientist Collective has come to a unanimous conclusion after hours of debate and research: “Cats suck”.",
    img: dogScientist,
    alt: "dog scientist wearing a lab coat and glasses with glasses",
    ingress:
      "After extensive research and debate, the Dog Scientist Collective has reached a unanimous decision, declaring their disdain for cats. The collective's findings are based on a series of experiments and observations that highlight the differences between dogs and cats, ultimately favoring dogs.",
  },
  {
    title:
      "The new arena for badminton is of high quality. “No surprise there”, says supreme court.",
    img: badmintonImg,
    alt: "badminton court",
    ingress:
      "The supreme court has praised the new itself for its exceptional quality, stating that it meets all the expected standards. The arena features state-of-the-art facilities and has been designed to provide the best experience for players and spectators alike. Worries are raised about the unbiased nature of the supreme court if any lawsuits should happen as they are siblings in name",
  },
  {
    title:
      "The Dog Scientist Collective has come to a unanimous conclusion after hours of debate and research: “Cats suck”.",
    img: dogScientist,
    alt: "dog scientist wearing a lab coat and glasses with glasses",
    ingress:
      "After extensive research and debate, the Dog Scientist Collective has reached a unanimous decision, declaring their disdain for cats. The collective's findings are based on a series of experiments and observations that highlight the differences between dogs and cats, ultimately favoring dogs.",
  },
]);

// Mock data used for generating ads
// Will later be replaced by google ads or something similar
export const MockAdsData = signal([
  {
    title: "The new volvo xc40 is here and it is a real game changer!",
    img: "https://images.unsplash.com/photo-1704340142770-b52988e5b6eb?q=80&w=1100&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Volvo XC40",
    ingress:
      "Experience the new Volvo XC40 with advanced safety features and modern design.",
  },
  {
    title: "Apple iPhone 14",
    img: "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Apple iPhone 14",
    ingress:
      "Discover the latest iPhone 14 with cutting-edge technology and sleek design.",
  },
]);

const loadState = (key: string, defaultValue: any) => {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : defaultValue;
};

const saveState = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const postFormSignal = signal(
  loadState("formState", {
    title: "",
    ingress: "",
    mainPicture: null as File | null,
    pictures: [] as File[],
    text: "",
    tags: [] as string[],
  })
);

postFormSignal.subscribe(() => {
  saveState("formState", postFormSignal.value);
});

export const userInfoSignal = signal(
  loadState("userInfoSignal", {
    first_name: "",
    last_name: "",
    birth_date: "",
    country: "",
    gender: "",
    interests: "",
  })
);

userInfoSignal.subscribe(() => {
  saveState("userInfoSignal", userInfoSignal.value);
});
