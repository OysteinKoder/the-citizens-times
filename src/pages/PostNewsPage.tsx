import { postFormSignal } from "../state/globalState";
import { signal } from "@preact/signals";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "../supa-base-client";
import { useState } from "preact/hooks";
import TitleInput from "./postNewsPage/TitleInput";
import IngressInput from "./postNewsPage/IngressInput";
import TextInput from "./postNewsPage/TextInput";
import TagsInput from "./postNewsPage/TagsInput";
import ImageUrlInput from "./postNewsPage/ImageUrlInput";
import CountryStateCityFields from "../components/CountryStateCityFields";

interface PostInput {
  title: string;
  ingress: string;
  main_text: string;
  tags: string[];
  country: string;
  state: string;
  city: string;
  image: string;
}

const createPost = async (post: PostInput) => {
  const { data, error } = await supabase.from("Posts").insert([post]);
  if (error) throw new Error(error.message);
  return data;
};

const PostNewsPage = () => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const refresh = signal(0);

  const { mutate } = useMutation({
    mutationFn: createPost,
    onError: (error: any) => {
      setErrorMsg(error.message);
    },
    onSuccess: () => {
      setErrorMsg(null);
    },
  });

  if (!postFormSignal.value.country) {
    postFormSignal.value.country = "USA";
  }

  const isValidImageUrl = (url: string): boolean => {
    return (
      // Unsplash
      /^https?:\/\/(images\.unsplash\.com|plus\.unsplash\.com)\/.+[?&]w=\d/.test(
        url
      ) ||
      /^https?:\/\/(images\.unsplash\.com|plus\.unsplash\.com)\/.+\.(jpe?g|png|webp|gif)/i.test(
        url
      ) ||
      // Pexels
      /^https?:\/\/(www\.)?pexels\.com\/(photo\/[^/]+\/|\w+-)\d+\/?/.test(
        url
      ) ||
      /^https?:\/\/images\.pexels\.com\/photos\/\d+\/pexels-photo-\d+\.(jpe?g|png|webp|gif)/i.test(
        url
      ) ||
      // Pixabay
      /^https?:\/\/cdn\.pixabay\.com\/.+\/.+\.(jpe?g|png|gif|webp|svg)/i.test(
        url
      )
    );
  };

  const handleSubmit = (e: Event) => {
    if (postFormSignal.value.tags) {
      e.preventDefault();
      if (
        postFormSignal.value.mainPicture &&
        !isValidImageUrl(postFormSignal.value.mainPicture)
      ) {
        setErrorMsg(
          "Image URL must be from Unsplash (images.unsplash.com), Pexels (www.pexels.com/photo/...), or Pixabay (cdn.pixabay.com)."
        );
        return;
      }
      const post: PostInput = {
        title: postFormSignal.value.title || "",
        ingress: postFormSignal.value.ingress || "",
        main_text: postFormSignal.value.text || "",
        tags: postFormSignal.value.tags,
        country: postFormSignal.value.country || "",
        state: postFormSignal.value.state || "",
        city: postFormSignal.value.city || "",
        image: postFormSignal.value.mainPicture || "",
      };
      mutate(post);
      // Reset form
      postFormSignal.value = {
        title: "",
        ingress: "",
        text: "",
        mainPicture: "",
        pictures: "",
        tags: "",
        country: "USA",
        state: "",
        city: "",
      };
      refresh.value++;
    } else {
      alert("Please enter tags");
    }
  };

  return (
    <>
      <h1 class="sr-only">Post News Story form</h1>
      <form
        onSubmit={handleSubmit}
        class="form-control w-full max-w-2xl mx-auto p-4"
      >
        <TitleInput />
        <IngressInput />
        <TextInput />
        <TagsInput />
        <CountryStateCityFields
          signal={postFormSignal}
          saveKey="postFormSignal"
        />
        <ImageUrlInput />

        {errorMsg && <div class="alert alert-error mb-4">{errorMsg}</div>}
        <button type="submit" class="btn btn-primary w-full">
          Submit
        </button>
      </form>
    </>
  );
};

export default PostNewsPage;
