import { computed } from "@preact/signals";
import { postFormSignal, saveState } from "../../state/globalState";

const MAX_TITLE = 60;
const SHOW_COUNTER_AT = 44;

export default function TitleInput() {
  const charLength = computed(() => postFormSignal.value.title.length);
  const showCounter = computed(() => charLength.value >= SHOW_COUNTER_AT);
  const isNearLimit = computed(() => charLength.value > MAX_TITLE * 0.9);

  return (
    <>
      <label htmlFor="title" class="label">
        <span class="label-text">Title</span>
      </label>
      <input
        required
        type="text"
        id="title"
        value={postFormSignal.value.title}
        onInput={(e) => {
          const value = (e.target as HTMLInputElement).value;

          if (value.length <= MAX_TITLE) {
            postFormSignal.value = {
              ...postFormSignal.value,
              title: value,
            };
            saveState("formState", postFormSignal.value);
          }
        }}
        class="input input-bordered w-full text-center mb-2"
        maxLength={MAX_TITLE}
      />

      {/* Only shows when user types 44+ chars */}
      {showCounter.value && (
        <div class="text-sm flex justify-end animate-in slide-in-from-bottom duration-200">
          <span
            class={
              isNearLimit.value ? "text-warning font-medium" : "text-success"
            }
          >
            {charLength.value} / {MAX_TITLE}
          </span>
        </div>
      )}
    </>
  );
}
