import { postFormSignal, saveState } from "../../state/globalState";

const TextInput = () => {
  return (
    <>
      <label for="text" class="label">
        <span class="label-text">Text</span>
      </label>
      <textarea
        required
        id="text"
        value={postFormSignal.value.text}
        onInput={(e) => {
          postFormSignal.value.text = (e.target as HTMLTextAreaElement).value;
          saveState("formState", postFormSignal.value);
        }}
        class="textarea textarea-bordered w-full lg:h-52 text-center mb-4"
      ></textarea>
    </>
  );
};

export default TextInput;
