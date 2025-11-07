import { signal } from "@preact/signals";
import { userInfoSignal } from "../../state/globalState";

const refresh = signal(0);
const saveState = (key: string, value: any) =>
  localStorage.setItem(key, JSON.stringify(value));

export default function InterestsField() {
  const removeTag = (idx: number) => {
    userInfoSignal.value.interests = (
      userInfoSignal.value.interests || []
    ).filter((_: any, i: any) => i !== idx);
    saveState("userInfoSignal", userInfoSignal.value);
    refresh.value++;
  };

  const handleInterestInput = (e: Event) => {
    if (e instanceof KeyboardEvent && e.key === "Enter") {
      e.preventDefault();
      const input = e.target as HTMLInputElement;
      if (input.value.trim()) {
        userInfoSignal.value.interests = [
          ...(userInfoSignal.value.interests || []),
          input.value.trim(),
        ];
        saveState("userInfoSignal", userInfoSignal.value);
        input.value = "";
        refresh.value++;
      }
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
        class="input input-bordered w-full text-center"
        placeholder="Press Enter to add tags"
      />
      <div class="mt-2 mb-4">
        <span class="invisible">{refresh.value}</span>
        {(userInfoSignal.value.interests || []).map(
          (interest: string, idx: number) => (
            <span class="badge badge-primary mr-2 mb-2" key={idx}>
              {interest}
              <button type="button" class="ml-1" onClick={() => removeTag(idx)}>
                &times;
              </button>
            </span>
          )
        )}
      </div>
    </>
  );
}
