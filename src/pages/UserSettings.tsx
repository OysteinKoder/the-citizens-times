const UserSettings = () => {
  interface UserSettings {
    first_name: string;
    last_name: string;
    birth_date: string | null;
    country: string;
    gender: "male" | "female" | "other";
  }
  return (
    <>
      <h1 class="sr-only">Settings</h1>
      <form class="form-control w-full max-w-lg mx-auto p-4">
        <label class="label" for="first_name mb-4">
          <span class="label-text">First name</span>
        </label>
        <input
          required
          id="first_name"
          type="text"
          class="input input-bordered w-full text-center"
        ></input>
        <label class="label" for="first_name mb-4">
          <span class="label-text">Last name</span>
        </label>
        <input
          required
          id="last_name"
          type="text"
          class="input input-bordered w-full text-center"
        ></input>
        <label class="label" for="first_name mb-4">
          <span class="label-text">Birthday</span>
        </label>
        <input
          required
          id="birthday"
          type="text"
          class="input input-bordered w-full text-center"
        ></input>
      </form>
    </>
  );
};

export default UserSettings;
