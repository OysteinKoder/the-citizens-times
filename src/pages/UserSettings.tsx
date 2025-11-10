import FirstNameField from "./userSettings/firstNameField";
import LastNameField from "./userSettings/lastNameField";
import BirthDateField from "./userSettings/birthDateField";
import CountryField from "./userSettings/countryField";
import InterestsField from "./userSettings/interestField";

const UserSettings = () => {
  return (
    <>
      <h1 class="sr-only">Settings</h1>
      <form class="form-control w-full max-w-lg mx-auto p-4">
        <FirstNameField />
        <LastNameField />
        <BirthDateField />
        <CountryField />
        <InterestsField />
      </form>
    </>
  );
};

export default UserSettings;
