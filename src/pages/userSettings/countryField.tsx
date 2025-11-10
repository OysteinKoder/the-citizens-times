import { userInfoSignal, saveSignal } from "../../state/globalState";

export default function CountryField() {
  return (
    <>
      <label class="label" for="country">
        <span class="label-text">Main news country source</span>
      </label>
      <input
        required
        id="country"
        type="text"
        class="input input-bordered w-full text-center mb-4"
        value={userInfoSignal.value.country ?? ""}
        onInput={(e) => {
          userInfoSignal.value.country = (e.target as HTMLInputElement).value;
          saveSignal("userInfoSignal", userInfoSignal.value);
        }}
      />
    </>
  );
}
