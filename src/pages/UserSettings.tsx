import { Country, State, City } from "country-state-city";

const UserSettings = () => {
  interface UserSettings {
    first_name: string;
    last_name: string;
    birth_date: string | null;
    country: string;
    gender: "male" | "female" | "other";
    interests: string;
  }

  return (
    <>
      <h1 class="sr-only">Settings</h1>
      <form class="form-control w-full max-w-lg mx-auto p-4">
        {/* FIRST NAME */}
        <label class="label" for="first_name mb-4">
          <span class="label-text">First name</span>
        </label>
        <input
          required
          id="first_name"
          type="text"
          class="input input-bordered w-full text-center mb-4"
        ></input>
        {/* LAST NAME */}
        <label class="label" for="first_name mb-4">
          <span class="label-text">Last name</span>
        </label>
        <input
          required
          id="last_name"
          type="text"
          class="input input-bordered w-full text-center mb-4"
        ></input>
        {/* BIRTHDAY */}
        <label class="label" for="first_name mb-4">
          <span class="label-text">Birthday</span>
        </label>
        <input
          required
          id="birthday"
          type="date"
          class="input input-bordered w-full text-center mb-4"
        ></input>
        {/* COUNTRY */}
        <label class="label" for="first_name mb-4">
          <span class="label-text">Main news country source</span>
        </label>
        <input
          required
          id="country"
          type="text"
          class="input input-bordered w-full text-center mb-4"
        ></input>
      </form>
    </>
  );
};

export default UserSettings;
