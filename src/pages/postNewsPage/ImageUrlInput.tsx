import { postFormSignal, saveState } from "../../state/globalState";

const ImageUrlInput = () => {
  return (
    <>
      <label for="mainPicture" class="label">
        <span class="label-text">Img url</span>
      </label>
      <input
        type="text"
        id="mainPicture"
        onInput={(e) => {
          postFormSignal.value.mainPicture = (
            e.target as HTMLInputElement
          ).value;
          saveState("formState", postFormSignal.value);
        }}
        class="file-input w-full text-center"
        placeholder="Paste image url"
        pattern="^(https:\/\/images\.unsplash\.com\/.+|https:\/\/www\.pexels\.com\/photo\/.+|https:\/\/cdn\.pixabay\.com\/.+)$"
        title="Only image URLs from Unsplash, Pexels, or Pixabay are allowed. Remember to right click and open image in new tab to get the accepted source"
        required
      />
      <div class="text-center text-xs text-gray-400 mt-2 mb-4">
        <span>Only image URLs from </span>
        <div class="flex justify-center gap-2 mt-1 mb-1 text-xs">
          <a
            href="https://unsplash.com/"
            target="_blank"
            rel="noopener noreferrer"
            class="link link-hover text-gray-500"
          >
            Unsplash
          </a>
          <span>|</span>
          <a
            href="https://www.pexels.com/"
            target="_blank"
            rel="noopener noreferrer"
            class="link link-hover text-gray-500"
          >
            Pexels
          </a>
          <span>|</span>
          <a
            href="https://pixabay.com/"
            target="_blank"
            rel="noopener noreferrer"
            class="link link-hover text-gray-500"
          >
            Pixabay
          </a>
        </div>
        <span> are allowed at the moment.</span>
      </div>
    </>
  );
};

export default ImageUrlInput;
