import { postFormSignal } from "../state/globalState";
import { signal } from "@preact/signals";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "../supa-base-client";
import { useState } from "preact/hooks";
postFormSignal;

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

const PostForm = () => {
  // Local signal to force re-render
  const refresh = signal(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const saveState = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const { mutate } = useMutation({
    mutationFn: createPost,
    onError: (error: any) => {
      setErrorMsg(error.message);
    },
    onSuccess: () => {
      setErrorMsg(null);
    },
  });

  // Set default country if not set
  if (!postFormSignal.value.country) {
    postFormSignal.value.country = "USA";
  }

  // Helper to validate image URL with regex for Unsplash, Pexels, or Pixabay
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
      // Validate image URL
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
      console.log("Form submitted:", post);
      console.log("current state", postFormSignal);
      postFormSignal.value.title = "";
      postFormSignal.value.ingress = "";
      postFormSignal.value.text = "";
      postFormSignal.value.mainPicture = "";
      postFormSignal.value.pictures = "";
      postFormSignal.value.tags = "";
      refresh.value++;
    } else {
      alert("Please enter tags");
    }
  };

  const handleTagInput = (e: Event) => {
    if (e instanceof KeyboardEvent && e.key === "Enter") {
      e.preventDefault();
      const input = e.target as HTMLInputElement;
      if (input.value.trim()) {
        postFormSignal.value.tags = [
          ...postFormSignal.value.tags,
          input.value.trim(),
        ];
        saveState("formState", postFormSignal.value);
        input.value = "";
        refresh.value++; // trigger re-render
      }
    }
  };

  const removeTag = (idx: number) => {
    postFormSignal.value.tags = postFormSignal.value.tags.filter(
      (_: any, i: any) => i !== idx
    );
    saveState("formState", postFormSignal.value);
    refresh.value++; // trigger re-render
  };

  postFormSignal.subscribe(() => {
    saveState("formState", postFormSignal.value);
  });

  return (
    <>
      <h1 class="sr-only">Post News Story form</h1>
      <form
        onSubmit={handleSubmit}
        class="form-control w-full max-w-lg mx-auto p-4"
      >
        {/* Title Input */}
        <label for="Title" class="label">
          <span class="label-text">Title</span>
        </label>
        <input
          required
          type="text"
          id="title"
          value={postFormSignal.value.title}
          class="input input-bordered w-full text-center mb-4"
          onInput={(e) => {
            postFormSignal.value.title = (e.target as HTMLInputElement).value;
            saveState("formState", postFormSignal.value);
          }}
        />
        {/* Ingress Input*/}
        <label for="Ingress" class="label">
          <span class="label-text">Ingress</span>
        </label>
        <input
          required
          type="text"
          id="Ingress"
          value={postFormSignal.value.ingress}
          onInput={(e) => {
            postFormSignal.value.ingress = (e.target as HTMLInputElement).value;
            saveState("formState", postFormSignal.value);
          }}
          class="input input-bordered w-full text-center mb-4"
        />
        {/* Text Input */}
        <label for="text" class="label">
          <span class="label-text">Text</span>
        </label>
        <textarea
          required
          id="text"
          value={postFormSignal.value.text}
          onInput={(e) => {
            postFormSignal.value.text = (e.target as HTMLTextAreaElement).value;
            saveState("formState", postFormSignal.value);
          }}
          class="textarea textarea-bordered w-full h-30 text-center mb-4"
        ></textarea>
        {/* Tags Input */}
        <label for="tags" class="label">
          <span class="label-text">Tags</span>
        </label>
        <input
          type="text"
          id="tags"
          onKeyDown={handleTagInput}
          class="input input-bordered w-full text-center"
          placeholder="Press Enter to add tags"
        />
        <div class="mt-2 mb-4">
          {/* Use refresh.value to trigger re-render so that tag becomes visible after enter is hit */}
          <span class="invisible">{refresh.value}</span>
          {postFormSignal.value.tags
            ? postFormSignal.value.tags.map((tag: string, idx: number) => (
                <span class="badge badge-primary mr-2 mb-2" key={idx}>
                  {tag}
                  <button
                    type="button"
                    class="ml-1"
                    onClick={() => removeTag(idx)}
                  >
                    &times;
                  </button>
                </span>
              ))
            : null}
        </div>
        {/* country selector */}
        <label for="country" class="label">
          <span class="label-text">Country</span>
        </label>
        <select
          id="country"
          value={postFormSignal.value.country}
          onChange={(e) => {
            postFormSignal.value.country = (
              e.target as HTMLSelectElement
            ).value;
            saveState("formState", postFormSignal.value);
            refresh.value++;
          }}
          class="select select-bordered w-full text-center -z-10 mb-4"
        >
          <option value="USA">USA</option>
          <option value="Australia">Australia</option>
          <option value="Canada">Canada</option>
          <option value="Australia">England</option>
          <option value="Australia">Scotland</option>
          <option value="Australia">Ireland</option>
          <option value="Australia">Norway</option>
          <option value="Australia">Germany</option>
          <option value="Australia">Other</option>
        </select>
        {/* Image Url Input */}
        <label for="mainPicture" class="label">
          <span class="label-text">Img url</span>
        </label>
        <input
          type="text"
          id="mainPicture"
          onInput={(e) => {
            postFormSignal.value.mainPicture = (
              e.target as HTMLInputElement
            ).value;
            saveState("formState", postFormSignal.value);
          }}
          class="file-input w-full text-center"
          placeholder="Paste image url"
          pattern="^(https:\/\/images\.unsplash\.com\/.+|https:\/\/www\.pexels\.com\/photo\/.+|https:\/\/cdn\.pixabay\.com\/.+)$"
          title="Only image URLs from Unsplash, Pexels, or Pixabay are allowed. Remember to right click and open image in new tab to get the accepted source"
          required
        />
        <div class="text-center text-xs text-gray-400 mt-2 mb-4">
          <span>Only image URLs from </span>
          <div class="flex justify-center gap-2 mt-1 mb-1 text-xs">
            <a
              href="https://unsplash.com/"
              target="_blank"
              rel="noopener noreferrer"
              class="link link-hover text-gray-500"
            >
              Unsplash
            </a>
            <span>|</span>
            <a
              href="https://www.pexels.com/"
              target="_blank"
              rel="noopener noreferrer"
              class="link link-hover text-gray-500"
            >
              Pexels
            </a>
            <span>|</span>
            <a
              href="https://pixabay.com/"
              target="_blank"
              rel="noopener noreferrer"
              class="link link-hover text-gray-500"
            >
              Pixabay
            </a>
          </div>
          <span> are allowed at the moment.</span>
        </div>
        {errorMsg && <div class="alert alert-error mb-4">{errorMsg}</div>}
        <button type="submit" class="btn btn-primary w-full">
          Submit
        </button>
        <button
          type="button"
          class="btn btn-secondary w-full"
          onClick={() => {
            console.log(postFormSignal.value);
          }}
        >
          console.log
        </button>
      </form>
    </>
  );
};

export default PostForm;
