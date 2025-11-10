import { computed } from "@preact/signals";
import { userInfoSignal, saveState } from "../../state/globalState";

const MAX_NAME = 30;
const SHOW_COUNTER_AT = 20;

export default function FirstNameField() {
  const charLength = computed(
    () => userInfoSignal.value.first_name?.length || 0
  );
  const showCounter = computed(() => charLength.value >= SHOW_COUNTER_AT);
  const isNearLimit = computed(() => charLength.value > MAX_NAME * 0.9);

  return (
    <>
      <label class="label" for="first_name">
        <span class="label-text">First name</span>
      </label>
      <input
        required
        id="first_name"
        type="text"
        class="input input-bordered w-full text-center mb-2"
        value={userInfoSignal.value.first_name}
        onInput={(e) => {
          const value = (e.target as HTMLInputElement).value;

          if (value.length <= MAX_NAME) {
            userInfoSignal.value = {
              ...userInfoSignal.value,
              first_name: value,
            };
            saveState("userInfoSignal", userInfoSignal.value);
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
