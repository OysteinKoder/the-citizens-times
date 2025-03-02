import { h } from "preact";
import { signal } from "@preact/signals";

const PostForm = () => {
  const formState = signal({
    title: "",
    mainPicture: null as File | null,
    pictures: [] as File[],
    text: "",
  });

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <form
      onSubmit={handleSubmit}
      class="form-control w-full max-w-lg mx-auto p-4"
    >
      <div class="mb-4">
        <label for="title" class="label">
          <span class="label-text">Title:</span>
        </label>
        <input
          type="text"
          id="title"
          value={formState.value.title}
          onInput={(e) =>
            (formState.value.title = (e.target as HTMLInputElement).value)
          }
          class="input input-bordered w-full"
        />
      </div>
      <div class="mb-4">
        <label for="mainPicture" class="label">
          <span class="label-text">Main Picture:</span>
        </label>
        <input
          type="file"
          id="mainPicture"
          onChange={(e) =>
            (formState.value.mainPicture =
              (e.target as HTMLInputElement).files?.[0] || null)
          }
          class="file-input w-full"
        />
      </div>
      <div class="mb-4">
        <label for="pictures" class="label">
          <span class="label-text">Pictures:</span>
        </label>
        <input
          type="file"
          id="pictures"
          multiple
          onChange={(e) =>
            (formState.value.pictures = Array.from(
              (e.target as HTMLInputElement).files || []
            ))
          }
          class="file-input w-full"
        />
      </div>
      <div class="mb-4">
        <label for="text" class="label">
          <span class="label-text">Text:</span>
        </label>
        <textarea
          id="text"
          value={formState.value.text}
          onInput={(e) =>
            (formState.value.text = (e.target as HTMLTextAreaElement).value)
          }
          class="textarea textarea-bordered w-full"
        ></textarea>
      </div>
      <button type="submit" class="btn btn-primary w-full">
        Submit
      </button>
      <button
        type="button"
        class="btn btn-secondary w-full"
        onClick={() => {
          console.log(formState.value);
        }}
      >
        console.log
      </button>
    </form>
  );
};

export default PostForm;
