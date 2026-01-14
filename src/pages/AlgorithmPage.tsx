import { supabase } from "../supa-base-client";
import { useEffect, useState } from "preact/hooks";
import { algorithmSignal } from "../state/globalState";

type Interest = {
  name: string;
  weight: number;
};

const AlgorithmPage = () => {
  const [useInterests, setInterests] = useState<Interest[]>([]);

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
      setInterests(interestsArray);
      console.log("Fetched interests:", useInterests);
    } catch (err) {
      console.error("Error fetching interests:", err);
    }
  }

  useEffect(() => {
    fetchInterests();
  }, []);

  if (useInterests) {
    return (
      <>
        <form class="">
          {useInterests.map((interest, idx) => (
            <div key={interest}>
              <label key={interest.name} class="mr-4 size-1/2">
                {interest.name}
              </label>
              <input
                key={interest.weight + idx}
                class="input"
                placeholder={"Points: " + interest.weight.toString()}
              ></input>
            </div>
          ))}
        </form>
        <button
          class="btn"
          onClick={() => {
            console.log(useInterests);
          }}
        >
          console.log
        </button>
      </>
    );
  } else {
    <div>Loading...</div>;
  }
};

export default AlgorithmPage;
