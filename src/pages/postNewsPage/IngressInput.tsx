import { signal, effect } from "@preact/signals";
import { postFormSignal, saveState } from "../../state/globalState";

const MAX_INGRESS = 150;

export default function IngressInput() {
  const charLength = signal(postFormSignal.value.ingress.length);
  effect(() => {
    charLength.value = postFormSignal.value.ingress.length;
  });

  const isNearLimit = signal(charLength.value > MAX_INGRESS * 0.9);
  effect(() => {
    isNearLimit.value = charLength.value > MAX_INGRESS * 0.9;
  });

  return (
    <>
      <label htmlFor="ingress" className="label">
        <span className="label-text">Ingress</span>
      </label>

      <input
        required
        type="text"
        id="ingress"
        value={postFormSignal.value.ingress}
        onInput={(e) => {
          const value = (e.target as HTMLInputElement).value;

          // Enforce the limit in the state (maxlength already does it in the UI)
          if (value.length <= MAX_INGRESS) {
            postFormSignal.value = {
              ...postFormSignal.value,
              ingress: value,
            };
            saveState("formState", postFormSignal.value);
          }
        }}
        className="input input-bordered w-full text-center mb-2"
        maxLength={MAX_INGRESS}
      />
      <div className="text-sm flex justify-end">
        <span
          className={
            charLength.value > MAX_INGRESS
              ? "text-error"
              : isNearLimit.value
              ? "text-warning"
              : "text-success"
          }
        >
          {charLength.value} / {MAX_INGRESS}
        </span>
        {charLength.value > MAX_INGRESS && (
          <span className="text-error animate-pulse">Too long!</span>
        )}
      </div>
    </>
  );
}
