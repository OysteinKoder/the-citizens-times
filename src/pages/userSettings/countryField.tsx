import { userInfoSignal, saveSignal } from "../../state/globalState";
import { Country, State, City } from "country-state-city";
import { computed, signal } from "@preact/signals";

export default function CountryField() {
  const countries = Country.getAllCountries();

  // Initialize signals with existing values
  const selectedCountry = signal(userInfoSignal.value.country || "");
  const selectedState = signal(userInfoSignal.value.state || "");
  const selectedCity = signal(userInfoSignal.value.city || "");

  // Compute available states based on selected country
  const availableStates = computed(() => {
    if (!selectedCountry.value) return [];
    const states = State.getStatesOfCountry(selectedCountry.value) || [];
    return states.length > 0 ? states : [];
  });

  // Compute available cities based on selected country and state
  const availableCities = computed(() => {
    if (!selectedCountry.value || !selectedState.value) return [];
    const cities =
      City.getCitiesOfState(selectedCountry.value, selectedState.value) || [];
    return cities.length > 0 ? cities : [];
  });

  // Computed signals for visibility
  const showStateSelector = computed(() => availableStates.value.length > 0);
  const showCitySelector = computed(() => availableCities.value.length > 0);

  const handleCountryChange = (e: Event) => {
    const value = (e.target as HTMLSelectElement).value;
    selectedCountry.value = value;
    selectedState.value = ""; // Reset state
    selectedCity.value = ""; // Reset city

    userInfoSignal.value = {
      ...userInfoSignal.value,
      country: value,
      state: "",
      city: "",
    };
    saveSignal("userInfoSignal", userInfoSignal.value);
  };

  const handleStateChange = (e: Event) => {
    const value = (e.target as HTMLSelectElement).value;
    const selectedStateObj = availableStates.value.find(
      (state) => state.isoCode === value
    );

    if (selectedStateObj) {
      selectedState.value = value;
      selectedCity.value = ""; // Reset city

      userInfoSignal.value = {
        ...userInfoSignal.value,
        state: value,
        stateName: selectedStateObj.name,
        city: "",
      };
      saveSignal("userInfoSignal", userInfoSignal.value);
    }
  };

  const handleCityChange = (e: Event) => {
    const value = (e.target as HTMLSelectElement).value;
    selectedCity.value = value;

    userInfoSignal.value = {
      ...userInfoSignal.value,
      city: value,
    };
    saveSignal("userInfoSignal", userInfoSignal.value);
  };

  return (
    <div class="space-y-4">
      {/* Country Selector */}
      <div>
        <label class="label" for="country">
          <span class="label-text">Country</span>
        </label>
        <select
          id="country"
          class="select select-bordered w-full"
          value={selectedCountry.value}
          onChange={handleCountryChange}
        >
          <option value="">Select a country</option>
          {countries.map((country) => (
            <option key={country.isoCode} value={country.isoCode}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      {/* State Selector - Only show if states are available */}
      {selectedCountry.value && showStateSelector.value && (
        <div>
          <label class="label" for="state">
            <span class="label-text">State/Province</span>
          </label>
          <select
            id="state"
            class="select select-bordered w-full"
            value={selectedState.value}
            onChange={handleStateChange}
          >
            <option value="">Select a state</option>
            {availableStates.value.map((state) => (
              <option key={state.isoCode} value={state.isoCode}>
                {state.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* City Selector - Only show if cities are available */}
      {selectedState.value && showCitySelector.value && (
        <div>
          <label class="label" for="city">
            <span class="label-text">City</span>
          </label>
          <select
            id="city"
            class="select select-bordered w-full"
            value={selectedCity.value}
            onChange={handleCityChange}
          >
            <option value="">Select a city</option>
            {availableCities.value.map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
