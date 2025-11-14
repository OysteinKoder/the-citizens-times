import { Signal, signal, computed } from "@preact/signals";
import { lazy, Suspense } from "preact/compat";
import { saveSignal } from "../state/globalState";

// === Preload ===
const preloadCSC = () => import("country-state-city");

// === Lazy Inner Component ===
const LazyCSCInner = lazy(() =>
  preloadCSC().then((mod) => {
    const allCountries = mod.Country.getAllCountries?.() || [];
    return {
      default: (props: CSCProps) => (
        <CSCInner module={mod} initialCountries={allCountries} {...props} />
      ),
    };
  })
);

// === Props ===
type CSCProps = {
  signal: Signal<any>;
  saveKey: string;
  countryKey?: string;
  stateKey?: string;
  cityKey?: string;
  stateNameKey?: string;
};

// === Inner Component (renders after CSC loads) ===
function CSCInner({
  module,
  initialCountries,
  signal: formSignal,
  saveKey,
  countryKey = "country",
  stateKey = "state",
  cityKey = "city",
  stateNameKey = "stateName",
}: CSCProps & { module: any; initialCountries: any[] }) {
  const selectedCountry = signal(formSignal.value[countryKey] || "");
  const selectedState = signal(formSignal.value[stateKey] || "");
  const selectedCity = signal(formSignal.value[cityKey] || "");

  const availableStates = computed(() =>
    selectedCountry.value
      ? module.State.getStatesOfCountry(selectedCountry.value) || []
      : []
  );

  const availableCities = computed(() =>
    selectedCountry.value && selectedState.value
      ? module.City.getCitiesOfState(
          selectedCountry.value,
          selectedState.value
        ) || []
      : []
  );

  const showState = computed(() => availableStates.value.length > 0);
  const showCity = computed(() => availableCities.value.length > 0);

  const save = () => saveSignal(saveKey, formSignal.value);

  const handleCountry = (e: Event) => {
    const value = (e.target as HTMLSelectElement).value;
    selectedCountry.value = value;
    selectedState.value = "";
    selectedCity.value = "";
    formSignal.value = {
      ...formSignal.value,
      [countryKey]: value,
      [stateKey]: "",
      [cityKey]: "",
      [stateNameKey]: "",
    };
    save();
  };

  const handleState = (e: Event) => {
    const value = (e.target as HTMLSelectElement).value;
    const stateObj = availableStates.value.find(
      (s: any) => s.isoCode === value
    );
    if (!stateObj) return;
    selectedState.value = value;
    selectedCity.value = "";
    formSignal.value = {
      ...formSignal.value,
      [stateKey]: value,
      [stateNameKey]: stateObj.name,
      [cityKey]: "",
    };
    save();
  };

  const handleCity = (e: Event) => {
    const value = (e.target as HTMLSelectElement).value;
    selectedCity.value = value;
    formSignal.value = { ...formSignal.value, [cityKey]: value };
    save();
  };

  return (
    <div class="space-y-4">
      {/* Country */}
      <div>
        <label class="label" for="csc-country">
          <span class="label-text">Country</span>
        </label>
        <select
          id="csc-country"
          class="select select-bordered w-full"
          value={selectedCountry.value}
          onChange={handleCountry}
        >
          <option value="">Select a country</option>
          {initialCountries.map((c) => (
            <option key={c.isoCode} value={c.isoCode}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* State */}
      {selectedCountry.value && showState.value && (
        <div>
          <label class="label" for="csc-state">
            <span class="label-text">State/Province</span>
          </label>
          <select
            id="csc-state"
            class="select select-bordered w-full"
            value={selectedState.value}
            onChange={handleState}
          >
            <option value="">Select a state</option>
            {availableStates.value.map((s: any) => (
              <option key={s.isoCode} value={s.isoCode}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* City */}
      {selectedState.value && showCity.value && (
        <div>
          <label class="label" for="csc-city">
            <span class="label-text">City</span>
          </label>
          <select
            id="csc-city"
            class="select select-bordered w-full"
            value={selectedCity.value}
            onChange={handleCity}
          >
            <option value="">Select a city</option>
            {availableCities.value.map((c: any) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

// === SINGLE EXPORT: Self-Preloading, Reusable, Clean ===
export default function CountryStateCityField(props: CSCProps) {
  return (
    <div
      onMouseEnter={preloadCSC}
      onFocus={preloadCSC}
      tabIndex={0}
      class="outline-none"
    >
      <Suspense
        fallback={
          <div class="space-y-4">
            <div>
              <label class="label">
                <span class="label-text">Country</span>
              </label>
              <select class="select select-bordered w-full" disabled>
                <option>Loading countries...</option>
              </select>
            </div>
          </div>
        }
      >
        <LazyCSCInner {...props} />
      </Suspense>
    </div>
  );
}
