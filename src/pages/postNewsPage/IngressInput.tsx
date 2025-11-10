import { computed } from "@preact/signals";
import { postFormSignal, saveSignal } from "../../state/globalState";

const MAX_CHAR = 250;
const SHOW_COUNTER_AT = 215;

export default function IngressInput() {
  const charLength = computed(() => postFormSignal.value.ingress.length);
  const showCounter = computed(() => charLength.value >= SHOW_COUNTER_AT);

  return (
    <>
      <label htmlFor="ingress" class="label">
        <span class="label-text">Ingress</span>
      </label>

      <input
        required
        type="text"
        id="ingress"
        value={postFormSignal.value.ingress}
        onInput={(e) => {
          const value = (e.target as HTMLInputElement).value;

          if (value.length <= MAX_CHAR) {
            postFormSignal.value = {
              ...postFormSignal.value,
              ingress: value,
            };
            saveSignal("formSignal", postFormSignal.value);
          }
        }}
        class="input input-bordered w-full text-center mb-2"
        maxLength={MAX_CHAR}
      />

      {/* Only shows when user types 215+ chars */}
      {showCounter.value && (
        <div class="text-sm flex justify-end animate-in slide-in-from-bottom duration-200">
          <span
            class={
              charLength.value > MAX_CHAR * 0.9
                ? "text-warning font-medium"
                : "text-success"
            }
          >
            {charLength.value} / {MAX_CHAR}
          </span>
        </div>
      )}
    </>
  );
}
