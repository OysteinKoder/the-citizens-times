import FirstNameField from "./userSettings/FirstNameField";
import LastNameField from "./userSettings/LastNameField";
import BirthDateField from "./userSettings/BirthDateField";
import InterestsField from "./userSettings/InterestField";
import CountryStateCityField from "../components/CountryField";
import { userFormSettings } from "../state/globalState";
import { supabase } from "../supa-base-client";

interface userSettings {
  first_name: string;
  last_name: string;
  gender: string;
  birth_date: string;
  country: string;
  state: string;
  city: string;
  interests: string[];
}

const updateSettings = async (settings: userSettings) => {
  const { data, error } = await supabase
    .from("userSettings")
    .insert([settings]);
  if (error) throw new Error(error.message);
  return data;
};
const UserSettings = () => {
  return (
    <>
      <h1 class="sr-only">Settings</h1>
      <form class="form-control w-full max-w-lg mx-auto p-4">
        <FirstNameField />
        <LastNameField />
        <BirthDateField />
        <CountryStateCityField
          signal={userFormSettings}
          saveKey="userFormSettings"
        />
        <InterestsField />
      </form>
    </>
  );
};

export default UserSettings;
