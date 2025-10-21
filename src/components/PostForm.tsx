import { formState } from "../state/globalState";
import { signal } from "@preact/signals";
formState;

const PostForm = () => {
  // Local signal to force re-render
  const refresh = signal(0);

  const saveState = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  const handleSubmit = (e: Event) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formState.value);
  };

  const handleTagInput = (e: Event) => {
    if (e instanceof KeyboardEvent && e.key === "Enter") {
      e.preventDefault();
      const input = e.target as HTMLInputElement;
      if (input.value.trim()) {
        formState.value.tags = [...formState.value.tags, input.value.trim()];
        saveState("formState", formState.value);
        input.value = "";
        refresh.value++; // trigger re-render
      }
    }
  };

  const removeTag = (idx: number) => {
    formState.value.tags = formState.value.tags.filter(
      (_: any, i: any) => i !== idx
    );
    saveState("formState", formState.value);
    refresh.value++; // trigger re-render
  };

  formState.subscribe(() => {
    saveState("formState", formState.value);
  });

  return (
    <form
      onSubmit={handleSubmit}
      class="form-control w-full max-w-lg mx-auto p-4"
    >
      <div class="mb-4">
        <label for="Title" class="label">
          <span class="label-text">Title:</span>
        </label>
        <input
          type="text"
          id="title"
          value={formState.value.title}
          onInput={(e) => {
            formState.value.title = (e.target as HTMLInputElement).value;
            saveState("formState", formState.value);
          }}
          class="input input-bordered w-full"
        />
      </div>
      <div class="mb-4">
        <label for="Ingress" class="label">
          <span class="label-text">Ingress</span>
        </label>
        <input
          type="text"
          id="Ingress"
          value={formState.value.ingress}
          onInput={(e) => {
            formState.value.ingress = (e.target as HTMLInputElement).value;
            saveState("formState", formState.value);
          }}
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
          onChange={(e) => {
            formState.value.mainPicture =
              (e.target as HTMLInputElement).files?.[0] || null;
            saveState("formState", formState.value);
          }}
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
          onInput={(e) => {
            formState.value.text = (e.target as HTMLTextAreaElement).value;
            saveState("formState", formState.value);
          }}
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
          {/* Use refresh.value to trigger re-render */}
          <span class="invisible">{refresh.value}</span>
          {formState.value.tags.map((tag: string, idx: any) => (
            <span class="badge badge-primary mr-2 mb-2" key={idx}>
              {tag}
              <button type="button" class="ml-1" onClick={() => removeTag(idx)}>
                &times;
              </button>
            </span>
          ))}
        </div>
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
