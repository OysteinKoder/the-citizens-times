import FirstNameField from "./userSettings/FirstNameField";
import LastNameField from "./userSettings/LastNameField";
import BirthDateField from "./userSettings/BirthDateField";
import InterestsField from "./userSettings/InterestField";
import CountryStateCityField from "../components/CountryField";
import { userInfoSignal } from "../state/globalState";

const UserSettings = () => {
  return (
    <>
      <h1 class="sr-only">Settings</h1>
      <form class="form-control w-full max-w-lg mx-auto p-4">
        <FirstNameField />
        <LastNameField />
        <BirthDateField />
        <CountryStateCityField
          signal={userInfoSignal}
          saveKey="userInfoSignal"
        />
        <InterestsField />
      </form>
    </>
  );
};

export default UserSettings;
