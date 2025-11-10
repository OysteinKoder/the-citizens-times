import { computed } from "@preact/signals";
import { postFormSignal, saveSignal } from "../../state/globalState";

const MAX_TEXT = 50_000;
const SHOW_COUNTER_AT = 44_990;

export default function TextInput() {
  const charLength = computed(() => postFormSignal.value.text.length);
  const showCounter = computed(() => charLength.value >= SHOW_COUNTER_AT);

  return (
    <>
      <label htmlFor="text" class="label">
        <span class="label-text">Text</span>
      </label>

      <textarea
        required
        id="text"
        value={postFormSignal.value.text}
        onInput={(e) => {
          const value = (e.target as HTMLTextAreaElement).value;

          if (value.length <= MAX_TEXT) {
            postFormSignal.value = {
              ...postFormSignal.value,
              text: value,
            };
            saveSignal("formSignal", postFormSignal.value);
          }
        }}
        class="textarea textarea-bordered w-full lg:h-52 text-left mb-2 resize-y"
        maxLength={MAX_TEXT}
        placeholder="Skriv artikkelen din her..."
      />

      {/* Only show when user is close */}
      {showCounter.value && (
        <div class="text-sm flex justify-end animate-in slide-in-from-bottom duration-200">
          <span
            class={
              charLength.value > MAX_TEXT * 0.9
                ? "text-warning font-medium"
                : "text-success"
            }
          >
            {charLength.value} / {MAX_TEXT}
          </span>
        </div>
      )}
    </>
  );
}
