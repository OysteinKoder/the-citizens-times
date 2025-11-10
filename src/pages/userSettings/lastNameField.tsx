import { computed } from "@preact/signals";
import { userInfoSignal, saveSignal } from "../../state/globalState";

const MAX_NAME = 30;
const SHOW_COUNTER_AT = 20;

export default function LastNameField() {
  const charLength = computed(
    () => userInfoSignal.value.last_name?.length || 0
  );
  const showCounter = computed(() => charLength.value >= SHOW_COUNTER_AT);
  const isNearLimit = computed(() => charLength.value > MAX_NAME * 0.9);

  return (
    <>
      <label class="label" for="last_name">
        <span class="label-text">Last name</span>
      </label>
      <input
        required
        id="last_name"
        type="text"
        class="input input-bordered w-full text-center mb-2"
        value={userInfoSignal.value.last_name}
        onInput={(e) => {
          const value = (e.target as HTMLInputElement).value;

          if (value.length <= MAX_NAME) {
            userInfoSignal.value = {
              ...userInfoSignal.value,
              last_name: value,
            };
            saveSignal("userInfoSignal", userInfoSignal.value);
          }
        }}
        maxLength={MAX_NAME}
      />

      {showCounter.value && (
        <div class="text-sm flex justify-end animate-in slide-in-from-bottom duration-200 mb-4">
          <span
            class={
              isNearLimit.value ? "text-warning font-medium" : "text-success"
            }
          >
            {charLength.value} / {MAX_NAME}
          </span>
        </div>
      )}
    </>
  );
}
