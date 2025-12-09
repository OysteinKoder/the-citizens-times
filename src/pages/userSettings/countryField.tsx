// src/components/CountryField.tsx (or wherever you keep it)

import { lazy, Suspense } from "preact/compat";
import { signal, computed, effect } from "@preact/signals";
import { userFormSettings, saveSignal } from "../../state/globalState";

// Optional: preload on hover/focus for instant feel
const preloadCSC = () => import("country-state-city");

const LazyCSC = lazy(() => import("country-state-city"));

function CountryFieldInner() {
  // Local signals that stay in sync with global state
  const selectedCountry = signal(userFormSettings.value.country || "");
  const selectedState = signal(userFormSettings.value.state || "");
  const selectedCity = signal(userFormSettings.value.city || "");

  // Keep global state in sync whenever local signals change
  effect(() => {
    userFormSettings.value = {
      ...userFormSettings.value,
      country: selectedCountry.value,
      state: selectedState.value,
      city: selectedCity.value,
    };
    saveSignal("userFormSettings", userFormSettings.value);
  });

  return (
    <LazyCSC>
      {(csc) => {
        const { Country, State, City } = csc;

        const countries = Country.getAllCountries();

        const selectedCountryObj = countries.find(
          (c: any) => c.name === selectedCountry.value
        );

        const states = selectedCountryObj
          ? State.getStatesOfCountry(selectedCountryObj.isoCode)
          : [];

        const selectedStateObj = states.find(
          (s: any) => s.name === selectedState.value
        );

        const cities =
          selectedCountryObj && selectedStateObj
            ? City.getCitiesOfState(
                selectedCountryObj.isoCode,
                selectedStateObj.isoCode
              )
            : [];

        const handleCountryChange = (e: Event) => {
          const value = (e.target as HTMLSelectElement).value;
          selectedCountry.value = value;
          selectedState.value = "";
          selectedCity.value = "";
        };

        const handleStateChange = (e: Event) => {
          const value = (e.target as HTMLSelectElement).value;
          selectedState.value = value;
          selectedCity.value = "";
        };

        const handleCityChange = (e: Event) => {
          selectedCity.value = (e.target as HTMLSelectElement).value;
        };

        return (
          <div class="space-y-6">
            {/* COUNTRY */}
            <div>
              <label class="label">
                <span class="label-text font-medium">Country</span>
              </label>
              <select
                class="select select-bordered w-full"
                value={selectedCountry.value}
                onChange={handleCountryChange}
              >
                <option value="">Select a country</option>
                {countries.map((c: any) => (
                  <option key={c.isoCode} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* STATE / REGION */}
            {states.length > 0 && (
              <div>
                <label class="label">
                  <span class="label-text font-medium">State / Region</span>
                </label>
                <select
                  class="select select-bordered w-full"
                  value={selectedState.value}
                  onChange={handleStateChange}
                >
                  <option value="">Select a state</option>
                  {states.map((s: any) => (
                    <option key={s.isoCode} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* CITY */}
            {cities.length > 0 && (
              <div>
                <label class="label">
                  <span class="label-text font-medium">City</span>
                </label>
                <select
                  class="select select-bordered w-full"
                  value={selectedCity.value}
                  onChange={handleCityChange}
                >
                  <option value="">Select a city</option>
                  {cities.map((city: any) => (
                    <option key={city.name} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        );
      }}
    </LazyCSC>
  );
}

export default function CountryField() {
  return (
    <Suspense
      fallback={<div class="text-center py-8">Loading locations...</div>}
    >
      <CountryFieldInner />
    </Suspense>
  );
}

// Optional: feels instant when user hovers the form
export const CountryFieldWithPreload = () => (
  <div onMouseEnter={preloadCSC} onFocusIn={preloadCSC}>
    <CountryField />
  </div>
);
