import { postFormSignal, saveState } from "../../state/globalState";

const TitleInput = () => {
  return (
    <>
      <label for="title" class="label">
        <span class="label-text">Title</span>
      </label>
      <input
        required
        type="text"
        id="title"
        value={postFormSignal.value.title}
        class="input input-bordered w-full text-center mb-4"
        onInput={(e) => {
          postFormSignal.value.title = (e.target as HTMLInputElement).value;
          saveState("formState", postFormSignal.value);
        }}
      />
    </>
  );
};

export default TitleInput;
