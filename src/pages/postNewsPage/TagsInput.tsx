import { postFormSignal, saveState } from "../../state/globalState";
import { signal } from "@preact/signals";

const TagsInput = () => {
  const refresh = signal(0);

  // Initialize tags as empty array if undefined
  if (!postFormSignal.value.tags) {
    postFormSignal.value.tags = [];
  }

  const handleTagInput = (e: Event) => {
    if (e instanceof KeyboardEvent && e.key === "Enter") {
      e.preventDefault();
      const input = e.target as HTMLInputElement;
      if (input.value.trim()) {
        postFormSignal.value.tags = [
          ...(Array.isArray(postFormSignal.value.tags)
            ? postFormSignal.value.tags
            : []),
          input.value.trim(),
        ];
        saveState("formState", postFormSignal.value);
        input.value = "";
        refresh.value++;
      }
    }
  };

  const removeTag = (idx: number) => {
    postFormSignal.value.tags = (postFormSignal.value.tags || []).filter(
      (_: any, i: number) => i !== idx
    );
    saveState("formState", postFormSignal.value);
    refresh.value++;
  };

  return (
    <>
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
        <span class="invisible">{refresh.value}</span>
        {Array.isArray(postFormSignal.value.tags) &&
          postFormSignal.value.tags.map((tag: string, idx: number) => (
            <span class="badge badge-primary mr-2 mb-2" key={idx}>
              {tag}
              <button type="button" class="ml-1" onClick={() => removeTag(idx)}>
                &times;
              </button>
            </span>
          ))}
      </div>
    </>
  );
};

export default TagsInput;
