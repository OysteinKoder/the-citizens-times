import { supabase } from "../supa-base-client";
import { useEffect } from "preact/hooks";
import { algorithmSignal } from "../state/globalState";

type Interest = {
  name: string;
  weight: number;
};

const AlgorithmPage = () => {
  async function fetchInterests() {
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData?.user?.id) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from("user_settings")
        .select("id, interests")
        .eq("id", userData.user.id)
        .single();

      if (error) throw error;

      const interestsObj = data.interests || {};
      const interestsArray = Object.entries(interestsObj)
        .map(([name, weight]) => ({
          name,
          weight: Number(weight),
        }))
        .sort((a, b) => b.weight - a.weight);
      console.log(interestsArray);
      algorithmSignal.value = interestsArray;
      console.log("Fetched interests:", algorithmSignal.value);
    } catch (err) {
      console.error("Error fetching interests:", err);
    }
  }

  const removeInterest = (interestName: string) => {
    algorithmSignal.value = algorithmSignal.value.filter(
      (interest: any) => interest.name !== interestName
    );
  };

  useEffect(() => {
    if (algorithmSignal.value.length < 2) {
      fetchInterests();
    }
  }, []);

  let content;
  if (
    algorithmSignal.value &&
    Array.isArray(algorithmSignal.value) &&
    algorithmSignal.value.length > 0
  ) {
    content = (
      <>
        <form class="">
          {algorithmSignal.value.map((interest: Interest) => (
            <div class="mt-2 flex items-center gap-2" key={interest.name}>
              <input
                class="input flex-1"
                placeholder={interest.name + ": " + interest.weight.toString()}
              />
              <button
                type="button"
                class="btn btn-secondary"
                onClick={() => removeInterest(interest.name)}
                aria-label={`Remove ${interest.name}`}
              >
                -
              </button>
            </div>
          ))}
        </form>
        <button
          class="btn"
          onClick={() => {
            console.log(algorithmSignal.value);
          }}
        >
          console.log
        </button>
      </>
    );
  } else {
    content = <div>Loading...</div>;
  }

  return (
    <>
      <h1 class="sr-only">Affect Algorithm</h1>
      {content}
    </>
  );
};

export default AlgorithmPage;
