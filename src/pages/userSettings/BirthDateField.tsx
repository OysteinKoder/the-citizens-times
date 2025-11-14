import { userInfoSignal, saveSignal } from "../../state/globalState";

export default function BirthDateField() {
  return (
    <>
      <label for="birth_date" class="label">
        <span class="label-text">Birthday</span>
      </label>
      <input
        required
        id="birth_date"
        type="date"
        class="input input-bordered w-full text-center mb-4"
        value={userInfoSignal.value.birth_date ?? ""}
        onInput={(e) => {
          userInfoSignal.value.birth_date = (
            e.target as HTMLInputElement
          ).value;
          saveSignal("userInfoSignal", userInfoSignal.value);
        }}
      />
    </>
  );
}
