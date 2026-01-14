import { supabase } from "../supa-base-client";
import { useEffect, useState } from "preact/hooks";
import { algorithmSignal } from "../state/globalState";
import { useMutation } from "@tanstack/react-query";

type Interest = {
  name: string;
  weight: number;
};

const updateInterests = async (interests: Interest[]) => {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      throw new Error("User not authenticated");
    }

    // Convert array to object: {name: weight, name2: weight2}
    const interestsObj = interests.reduce((acc, interest) => {
      acc[interest.name] = interest.weight;
      return acc;
    }, {} as Record<string, number>);

    const payload = {
      interests: interestsObj, // interests as object
    };

    console.log("Payload being sent:", JSON.stringify(payload));

    const { data, error } = await supabase.rpc("upsert_user_profile_json", {
      p_payload: payload,
    });

    if (error) {
      console.error("RPC Error:", error.code, error.message, error.details);
      throw new Error(`RPC failed: ${error.message}`);
    }

    console.log("Success:", data);
    return data;
  } catch (err: any) {
    console.error("Full error:", err);
    throw err;
  }
};

const AlgorithmPage = () => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [hasFetched, setHasFetched] = useState(false);

  const { mutate } = useMutation({
    mutationFn: updateInterests,
    onError: (error: any) => {
      setErrorMsg(error.message);
      console.error("Error updating interests:", error);
    },
    onSuccess: () => {
      setErrorMsg(null);
    },
  });

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
      setHasFetched(true);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to fetch interests");
      console.error("Error fetching interests:", err);
    }
  }

  const removeInterest = (interestName: string) => {
    const updatedInterests = algorithmSignal.value.filter(
      (interest: any) => interest.name !== interestName
    );
    algorithmSignal.value = updatedInterests;
    mutate(updatedInterests);
  };

  useEffect(() => {
    if (!hasFetched) {
      fetchInterests();
    }
  }, [hasFetched]);

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
      {errorMsg && (
        <div class="alert alert-error mb-4">
          <span>{errorMsg}</span>
          <button class="btn btn-sm" onClick={() => setErrorMsg(null)}>
            Dismiss
          </button>
        </div>
      )}
      {content}
    </>
  );
};

export default AlgorithmPage;
