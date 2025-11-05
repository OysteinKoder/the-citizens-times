import { Country, State, City } from "country-state-city";
import { userInfoSignal } from "../state/globalState";
import { signal } from "@preact/signals";
userInfoSignal;

const UserSettings = () => {
  const refresh = signal(0);
  const removeTag = (idx: number) => {
    userInfoSignal.value.interests = userInfoSignal.value.interests.filter(
      (_: any, i: any) => i !== idx
    );
    saveState("userInfoSignal", userInfoSignal.value);
    refresh.value++; // trigger re-render
  };
  interface UserSettings {
    first_name: string;
    last_name: string;
    birth_date: string | null;
    country: string;
    gender: "male" | "female" | "other";
    interests: string;
  }

  const saveState = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const handleInterestInput = (e: Event) => {
    if (e instanceof KeyboardEvent && e.key === "Enter") {
      e.preventDefault();
      const input = e.target as HTMLInputElement;
      if (input.value.trim()) {
        userInfoSignal.value.interests = [
          ...userInfoSignal.value.interests,
          input.value.trim(),
        ];
        saveState("userInfoSignal", userInfoSignal.value);
        input.value = "";
        refresh.value++; // trigger userInfoSignal
      }
    }
  };
  return (
    <>
      <h1 class="sr-only">Settings</h1>
      <form class="form-control w-full max-w-lg mx-auto p-4">
        {/***************** FIRST NAME ****************************************/}
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
        ></input>
        {/******************* LAST NAME *********************************/}
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
            userInfoSignal.value.last_name = (
              e.target as HTMLInputElement
            ).value;
            saveState("userInfoSignal", userInfoSignal.value);
          }}
        ></input>
        {/******************* BIRTH DAY *********************************/}
        <label for="birth_date" class="label">
          <span class="label-text">Birthday</span>
        </label>
        <input
          required
          id="birth_date"
          type="date"
          class="input input-bordered w-full text-center mb-4"
          value={userInfoSignal.value.birth_date}
          onInput={(e) => {
            userInfoSignal.value.birth_date = (
              e.target as HTMLInputElement
            ).value;
            saveState("userInfoSignal", userInfoSignal.value);
            console.log(typeof userInfoSignal.value.birth_date);
          }}
        ></input>
        {/******************* COUNTRY *********************************/}
        <label class="label" for="first_name mb-4">
          <span class="label-text">Main news country source</span>
        </label>
        <input
          required
          id="country"
          type="text"
          class="input input-bordered w-full text-center mb-4"
        ></input>
        {/******************* INTERESTS *********************************/}
        <label for="interests" class="label">
          <span class="label-text">Interests</span>
        </label>
        <input
          type="text"
          id="interests"
          onKeyDown={handleInterestInput}
          class="input input-bordered w-full text-center"
          placeholder="Press Enter to add tags"
        />
        <div class="mt-2 mb-4">
          {/***  Use refresh.value to trigger re-render so that tag becomes visible ***/}
          <span class="invisible">{refresh.value}</span>
          {userInfoSignal.value.interests
            ? userInfoSignal.value.interests.map(
                (interest: string, idx: number) => (
                  <span class="badge badge-primary mr-2 mb-2" key={idx}>
                    {interest}
                    <button
                      type="button"
                      class="ml-1"
                      onClick={() => removeTag(idx)}
                    >
                      &times;
                    </button>
                  </span>
                )
              )
            : null}
        </div>
      </form>
    </>
  );
};

export default UserSettings;
