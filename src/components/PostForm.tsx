import { formState } from "../state/globalState";
formState;

const PostForm = () => {
  const handleSubmit = (e: Event) => {
    e.preventDefault();
    // Handle form submission
  };

  const handleTagInput = (e: Event) => {
    if (e instanceof KeyboardEvent && e.key === "Enter") {
      e.preventDefault();
      const input = e.target as HTMLInputElement;
      if (input.value.trim()) {
        formState.value.tags = [...formState.value.tags, input.value.trim()];
        input.value = "";
      }
    }
  };

  const removeTag = (index: number) => {
    formState.value.tags = formState.value.tags.filter((_, i) => i !== index);
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
      <div class="mb-4">
        <label for="tags" class="label">
          <span class="label-text">Tags:</span>
        </label>
        <input
          type="text"
          id="tags"
          onKeyDown={handleTagInput}
          class="input input-bordered w-full"
          placeholder="Press Enter to add tags"
        />
        <div class="mt-2">
          {formState.value.tags.map((tag, index) => (
            <span class="badge badge-primary mr-2 mb-2" key={index}>
              {tag}
              <button
                type="button"
                class="ml-1"
                onClick={() => removeTag(index)}
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      </div>
      <p>Tags Added:</p>
      <div className="flex row">
        {formState.value.tags.map((tag, idx) => {
          <p key={idx}>{tag}</p>;
        })}
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
