import { userInfoSignal, saveState } from "../../state/globalState";

export default function LastNameField() {
  return (
    <>
      <label class="label" for="last_name">
        <span class="label-text">Last name</span>
      </label>
      <input
        required
        id="last_name"
        type="text"
        class="input input-bordered w-full text-center mb-4"
        value={userInfoSignal.value.last_name}
        onInput={(e) => {
          userInfoSignal.value.last_name = (e.target as HTMLInputElement).value;
          saveState("userInfoSignal", userInfoSignal.value);
        }}
      />
    </>
  );
}
