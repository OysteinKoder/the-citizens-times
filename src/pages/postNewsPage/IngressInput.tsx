import { postFormSignal, saveState } from "../../state/globalState";

const IngressInput = () => {
  return (
    <>
      <label for="ingress" class="label">
        <span class="label-text">Ingress</span>
      </label>
      <input
        required
        type="text"
        id="ingress"
        value={postFormSignal.value.ingress}
        onInput={(e) => {
          postFormSignal.value.ingress = (e.target as HTMLInputElement).value;
          saveState("formState", postFormSignal.value);
        }}
        class="input input-bordered w-full text-center mb-4"
      />
    </>
  );
};

export default IngressInput;
