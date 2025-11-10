import { computed } from "@preact/signals";
import { userInfoSignal } from "../../state/globalState";

const MAX_INTERESTS = 15;
const SHOW_COUNTER_AT = 10;

export default function InterestsField() {
  if (!Array.isArray(userInfoSignal.value.interests)) {
    userInfoSignal.value.interests = [];
  }

  const interests = computed(() => userInfoSignal.value.interests || []);
  const interestCount = computed(() => interests.value.length);
  const showCounter = computed(() => interestCount.value >= SHOW_COUNTER_AT);
  const isNearLimit = computed(() => interestCount.value >= MAX_INTERESTS - 1);
  const isAtLimit = computed(() => interestCount.value >= MAX_INTERESTS);

  const saveSignal = (key: string, value: any) =>
    localStorage.setItem(key, JSON.stringify(value));

  const removeTag = (idx: number) => {
    userInfoSignal.value = {
      ...userInfoSignal.value,
      interests: interests.value.filter((_: string, i: number) => i !== idx),
    };
    saveSignal("userInfoSignal", userInfoSignal.value);
  };

  const handleInterestInput = (e: Event) => {
    if (e instanceof KeyboardEvent && e.key === "Enter") {
      e.preventDefault();
      const input = e.target as HTMLInputElement;
      const value = input.value.trim();

      if (!value || isAtLimit.value) {
        input.value = "";
        return;
      }

      userInfoSignal.value = {
        ...userInfoSignal.value,
        interests: [...interests.value, value],
      };
      saveSignal("userInfoSignal", userInfoSignal.value);
      input.value = "";
    }
  };

  return (
    <>
      <label for="interests" class="label">
        <span class="label-text">Interests</span>
      </label>
      <input
        type="text"
        id="interests"
        onKeyDown={handleInterestInput}
        class="input input-bordered w-full text-center mb-2"
        placeholder="Effects what news we serve you"
        disabled={isAtLimit.value}
      />

      <div class="flex flex-wrap justify-center gap-2 mt-2 mb-1">
        {interests.value.map((interest: string, idx: number) => (
          <span
            key={idx}
            class="badge badge-primary flex items-center gap-1 px-2 py-1 text-xs"
          >
            {interest}
            <button
              type="button"
              onClick={() => removeTag(idx)}
              class="ml-1 text-xs font-bold hover:text-error"
              aria-label="Remove interest"
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
            {interestCount.value} / {MAX_INTERESTS}
          </span>
        </div>
      )}
    </>
  );
}
