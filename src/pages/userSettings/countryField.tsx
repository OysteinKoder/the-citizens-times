import { userInfoSignal, saveSignal } from "../../state/globalState";
import { signal, computed } from "@preact/signals";
import { lazy, Suspense } from "preact/compat";

// === Preload helper (optional but recommended) ===
const preloadCSC = () => import("country-state-city");

// === Lazy-loaded inner component ===
const LazyCountryField = lazy(() =>
  import("country-state-city").then((mod) => {
    const allCountries = mod.Country.getAllCountries?.() || [];
    return {
      default: () => (
        <CountryFieldInner module={mod} initialCountries={allCountries} />
      ),
    };
  })
);

// === Inner component (only renders after CSC is loaded) ===
function CountryFieldInner({
  module,
  initialCountries,
}: {
  module: any;
  initialCountries: any[];
}) {
  // Signals
  const selectedCountry = signal(userInfoSignal.value.country || "");
  const selectedState = signal(userInfoSignal.value.state || "");
  const selectedCity = signal(userInfoSignal.value.city || "");

  // Computed states/cities
  const availableStates = computed(() => {
    if (!selectedCountry.value) return [];
    return module.State.getStatesOfCountry(selectedCountry.value) || [];
  });

  const availableCities = computed(() => {
    if (!selectedCountry.value || !selectedState.value) return [];
    return (
      module.City.getCitiesOfState(
        selectedCountry.value,
        selectedState.value
      ) || []
    );
  });

  const showStateSelector = computed(() => availableStates.value.length > 0);
  const showCitySelector = computed(() => availableCities.value.length > 0);

  // Handlers
  const handleCountryChange = (e: Event) => {
    const value = (e.target as HTMLSelectElement).value;
    selectedCountry.value = value;
    selectedState.value = "";
    selectedCity.value = "";
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
    const stateObj = availableStates.value.find(
      (s: any) => s.isoCode === value
    );
    if (!stateObj) return;

    selectedState.value = value;
    selectedCity.value = "";
    userInfoSignal.value = {
      ...userInfoSignal.value,
      state: value,
      stateName: stateObj.name,
      city: "",
    };
    saveSignal("userInfoSignal", userInfoSignal.value);
  };

  const handleCityChange = (e: Event) => {
    const value = (e.target as HTMLSelectElement).value;
    selectedCity.value = value;
    userInfoSignal.value = { ...userInfoSignal.value, city: value };
    saveSignal("userInfoSignal", userInfoSignal.value);
  };

  return (
    <div class="space-y-4">
      {/* Country */}
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
          {initialCountries.map((country) => (
            <option key={country.isoCode} value={country.isoCode}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      {/* State */}
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
            {availableStates.value.map((state: any) => (
              <option key={state.isoCode} value={state.isoCode}>
                {state.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* City */}
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
            {availableCities.value.map((city: any) => (
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

// === Main Exported Component ===
export default function CountryField() {
  return (
    <Suspense
      fallback={
        <div class="space-y-4">
          <div>
            <label class="label" for="country">
              <span class="label-text">Country</span>
            </label>
            <select id="country" class="select select-bordered w-full" disabled>
              <option>Loading countries...</option>
            </select>
          </div>
        </div>
      }
    >
      <LazyCountryField />
    </Suspense>
  );
}

// === Optional: Preload on hover/focus (feels instant) ===
export const CountryFieldWithPreload = () => (
  <div onMouseEnter={preloadCSC} onFocus={preloadCSC}>
    <CountryField />
  </div>
);
