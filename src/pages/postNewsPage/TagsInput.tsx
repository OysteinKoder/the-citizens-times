import { computed } from "@preact/signals";
import { postFormSignal, saveSignal } from "../../state/globalState";

const MAX_TAGS = 8;
const SHOW_COUNTER_AT = MAX_TAGS - 2; // 6

export default function TagsInput() {
  // Ensure tags is always an array
  if (!Array.isArray(postFormSignal.value.tags)) {
    postFormSignal.value.tags = [];
  }

  const tags = computed(() => postFormSignal.value.tags || []);
  const tagCount = computed(() => tags.value.length);
  const showCounter = computed(() => tagCount.value >= SHOW_COUNTER_AT);
  const isNearLimit = computed(() => tagCount.value >= MAX_TAGS - 1);
  const isAtLimit = computed(() => tagCount.value >= MAX_TAGS);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key !== "Enter") return;
    e.preventDefault();

    const input = e.target as HTMLInputElement;
    const value = input.value.trim();

    if (!value || isAtLimit.value) {
      input.value = "";
      return;
    }

    postFormSignal.value = {
      ...postFormSignal.value,
      tags: [...tags.value, value],
    };
    saveSignal("formSignal", postFormSignal.value);
    input.value = "";
  };

  const removeTag = (index: number) => {
    interface PostFormData {
      tags: string[];
    }

    // The selection code with types:
    postFormSignal.value = {
      ...postFormSignal.value,
      tags: tags.value.filter((tag: string, i: number): boolean => i !== index),
    } as PostFormData;
    saveSignal("formSignal", postFormSignal.value);
  };

  return (
    <>
      <label htmlFor="tags" class="label">
        <span class="label-text">Tags</span>
      </label>

      <input
        type="text"
        id="tags"
        onKeyDown={handleKeyDown}
        class="input input-bordered w-full text-center mb-2"
        disabled={isAtLimit.value}
      />

      <div class="flex flex-wrap justify-center gap-2 mt-2 mb-1">
        {tags.value.map((tag: string, index: number) => (
          <span
            key={index}
            class="badge badge-primary flex items-center gap-1 px-2 py-1 text-xs"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(index)}
              class="ml-1 text-xs font-bold hover:text-error"
              aria-label="Remove tag"
            >
              &times;
            </button>
          </span>
        ))}
      </div>

      {showCounter.value && (
        <div class="text-sm flex justify-end animate-in slide-in-from-bottom duration-200">
          <span
            class={
              isNearLimit.value ? "text-warning font-medium" : "text-success"
            }
          >
            {tagCount.value} / {MAX_TAGS}
          </span>
        </div>
      )}
    </>
  );
}
