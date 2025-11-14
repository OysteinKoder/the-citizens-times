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
import CountryStateCityField from "../components/CountryField";

interface PostInput {
  title: string;
  ingress: string;
  main_text: string;
  keywords: string;
  country: string;
  image: string;
}

const createPost = async (post: PostInput) => {
  const { data, error } = await supabase.from("Posts").insert([post]);
  if (error) throw new Error(error.message);
  return data;
};

const PostNewsPage = () => {
  const refresh = signal(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

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

  const isValidImageUrl = (url: string) => {
    const unsplashRegex = /^https:\/\/images\.unsplash\.com\/.+/;
    const pexelsRegex = /^https:\/\/www\.pexels\.com\/photo\/.+/;
    const pixabayRegex = /^https:\/\/cdn\.pixabay\.com\/.+/;
    return (
      unsplashRegex.test(url) || pexelsRegex.test(url) || pixabayRegex.test(url)
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
        keywords: postFormSignal.value.tags
          ? postFormSignal.value.tags.join(",")
          : "",
        country: postFormSignal.value.country || "USA",
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
        <CountryStateCityField
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
