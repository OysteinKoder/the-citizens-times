import { Signal } from "@preact/signals";
import { useEffect, useState } from "preact/hooks";
import { saveSignal } from "../state/globalState";

// We load the library only when needed
let cscPromise: Promise<any> | null = null;
const loadCSC = () => {
  if (!cscPromise) cscPromise = import("country-state-city");
  return cscPromise;
};

type CSCProps = {
  signal: Signal<Record<string, string>>;
  saveKey: string;
  countryKey?: string;
  stateKey?: string;
  cityKey?: string;
};

export default function CountryStateCityFields({
  signal: form,
  saveKey,
  countryKey = "country",
  stateKey = "state",
  cityKey = "city",
}: CSCProps) {
  const [csc, setCSC] = useState<any>(null);
  const [countries, setCountries] = useState<any[]>([]);

  // Load on hover/focus
  const preload = () =>
    loadCSC().then((mod) => {
      setCSC(mod);
      setCountries(mod.Country.getAllCountries());
    });

  // Auto-load if someone opens devtools and inspects → instant feedback
  useEffect(() => {
    const timer = setTimeout(preload, 1000); // tiny delay so it doesn't block render
    return () => clearTimeout(timer);
  }, []);

  const countryName = form.value[countryKey] || "";
  const stateName = form.value[stateKey] || "";
  const cityName = form.value[cityKey] || "";

  const country = countries.find((c) => c.name === countryName);
  const countryCode = country?.isoCode;

  const states = countryCode
    ? csc?.State.getStatesOfCountry(countryCode) ?? []
    : [];
  const state = states.find((s: any) => s.name === stateName);
  const stateCode = state?.isoCode;

  const cities =
    countryCode && stateCode
      ? csc?.City.getCitiesOfState(countryCode, stateCode) ?? []
      : [];

  const set = (updates: Record<string, string>) => {
    form.value = { ...form.value, ...updates };
    saveSignal(saveKey, form.value);
  };

  if (!csc) {
    return (
      <div
        onMouseEnter={preload}
        onFocus={preload}
        tabIndex={0}
        class="space-y-4 outline-none"
      >
        <label class="label">
          <span class="label-text">Country</span>
        </label>
        <select class="select select-bordered w-full" disabled>
          <option>Loading countries...</option>
        </select>
      </div>
    );
  }

  return (
    <div class="space-y-4" onMouseEnter={preload} onFocus={preload}>
      {/* Country */}
      <div>
        <label class="label">
          <span class="label-text">Country</span>
        </label>
        <select
          class="select select-bordered w-full"
          value={countryName}
          onChange={(e) =>
            set({
              [countryKey]: e.currentTarget.value,
              [stateKey]: "",
              [cityKey]: "",
            })
          }
        >
          <option value="">Select a country</option>
          {countries.map((c) => (
            <option key={c.isoCode} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* State */}
      {states.length > 0 && (
        <div>
          <label class="label">
            <span class="label-text">State / Province</span>
          </label>
          <select
            class="select select-bordered w-full"
            value={stateName}
            onChange={(e) =>
              set({ [stateKey]: e.currentTarget.value, [cityKey]: "" })
            }
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

      {/* City */}
      {cities.length > 0 && (
        <div>
          <label class="label">
            <span class="label-text">City</span>
          </label>
          <select
            class="select select-bordered w-full"
            value={cityName}
            onChange={(e) => set({ [cityKey]: e.currentTarget.value })}
          >
            <option value="">Select a city</option>
            {cities.map((c: any) => (
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
