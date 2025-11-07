import { userInfoSignal, saveState } from "../../state/globalState";

export default function FirstNameField() {
  return (
    <>
      <label class="label" for="first_name">
        <span class="label-text">First name</span>
      </label>
      <input
        required
        id="first_name"
        type="text"
        class="input input-bordered w-full text-center mb-4"
        value={userInfoSignal.value.first_name}
        onInput={(e) => {
          userInfoSignal.value.first_name = (
            e.target as HTMLInputElement
          ).value;
          saveState("userInfoSignal", userInfoSignal.value);
        }}
      />
    </>
  );
}
