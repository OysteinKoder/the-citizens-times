import FirstNameField from "./userSettings/FirstNameField";
import LastNameField from "./userSettings/LastNameField";
import BirthDateField from "./userSettings/BirthDateField";
import InterestsField from "./userSettings/InterestField";
import CountryStateCityField from "../components/CountryField";
import { userFormSettings } from "../state/globalState";
import { supabase } from "../supa-base-client";
import { useState } from "preact/hooks";
import { signal } from "@preact/signals";
import { useMutation } from "@tanstack/react-query";

interface UserSettings {
  first_name: string;
  last_name: string;
  gender: string;
  birth_date: string;
  country: string;
  state: string;
  city: string;
  interests: string[];
}

const updateSettings = async (settings: UserSettings) => {
  // Verify user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    throw new Error("User not authenticated");
  }

  const payload = {
    first_name: settings.first_name,
    last_name: settings.last_name,
    gender: settings.gender,
    birth_date: settings.birth_date,
    country: settings.country,
    state: settings.state,
    city: settings.city,
    interests: settings.interests,
    metadata: {},
  };

  const { data, error } = await supabase.rpc("upsert_user_profile_json", {
    p_payload: payload,
  });
  if (error) throw new Error(error.message);
  return data;
};
const UserSettings = () => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const refreshSignal = signal(0);

  const { mutate } = useMutation({
    mutationFn: updateSettings,
    onError: (error: any) => {
      setErrorMsg(error.message);
    },
    onSuccess: () => {
      setErrorMsg(null);
    },
  });

  const handleSubmit = (e: Event) => {
    if (userFormSettings.value.interests) {
      e.preventDefault();
    }
    const settings: UserSettings = {
      first_name: userFormSettings.value.first_name || "",
      last_name: userFormSettings.value.last_name || "",
      gender: userFormSettings.value.gender || "",
      birth_date: userFormSettings.value.birth_date || "",
      country: userFormSettings.value.country || "", //
      state: userFormSettings.value.state || "", //
      city: userFormSettings.value.city || "", //
      interests: userFormSettings.value.interests || [],
    };
    mutate(settings);
    refreshSignal.value++;
  };

  return (
    <>
      <h1 class="sr-only">Settings</h1>
      <form
        class="form-control w-full max-w-lg mx-auto p-4"
        onSubmit={handleSubmit}
      >
        <FirstNameField />
        <LastNameField />
        <BirthDateField />
        <CountryStateCityField
          signal={userFormSettings}
          saveKey="userFormSettings"
        />
        <InterestsField />
        {errorMsg && <div class="alert alert-error mb-4">{errorMsg}</div>}
        <button type="submit" class="btn btn-primary w-full mt-4">
          Submit
        </button>
      </form>
    </>
  );
};

export default UserSettings;
