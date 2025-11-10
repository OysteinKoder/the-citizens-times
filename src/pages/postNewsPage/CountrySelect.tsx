import { postFormSignal, saveSignal } from "../../state/globalState";
import { signal } from "@preact/signals";

const CountrySelect = () => {
  const refresh = signal(0);

  return (
    <>
      <label for="country" class="label">
        <span class="label-text">Country</span>
      </label>
      <select
        id="country"
        value={postFormSignal.value.country}
        onChange={(e) => {
          postFormSignal.value.country = (e.target as HTMLSelectElement).value;
          saveSignal("formSignal", postFormSignal.value);
          refresh.value++;
        }}
        class="select select-bordered w-full text-center mb-4"
      >
        <option value="USA">USA</option>
        <option value="Australia">Australia</option>
        <option value="Canada">Canada</option>
        <option value="England">England</option>
        <option value="Scotland">Scotland</option>
        <option value="Ireland">Ireland</option>
        <option value="Norway">Norway</option>
        <option value="Germany">Germany</option>
        <option value="Other">Other</option>
      </select>
    </>
  );
};

export default CountrySelect;
