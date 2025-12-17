import { signal } from "@preact/signals";
import { supabase } from "../supa-base-client";
import { useEffect } from "preact/hooks";

type Interest = {
  name: string;
  weight: number;
};

const AlgorithmPage = () => {
  const interestSignal = signal<Interest[]>([]); // Initialize with empty array and type

  // assumes `supabase` is initialized client-side
  async function fetchInterests() {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData?.user?.id) throw new Error("User not authenticated");

    const { data, error } = await supabase
      .from("user_settings")
      .select("id, interests")
      .eq("id", userData.user.id)
      .single();

    if (error) throw error;

    // interests is a JSON object, convert to array for UI
    const interestsObj = data.interests || {};
    const interestsArray = Object.entries(interestsObj).map(
      ([name, weight]) => ({
        name,
        weight: Number(weight), // Ensure weight is a number
      })
    );
    interestSignal.value = interestsArray; // Use .value to set
    console.log(interestSignal);
    return { id: data.id, interestsArray }; // use id for updates
  }

  useEffect(() => {
    fetchInterests();
  }, []);

  if (interestSignal.value) {
    return (
      <>
        <h1 class="sr-only">Affect Algorithm</h1>
        <button
          class="btn"
          onClick={() => {
            console.log(interestSignal.value);
          }}
        >
          console.log
        </button>
        <div>
          {interestSignal.value.map((interest, idx) => {
            <div key={idx}>
              <span>{interest.name}</span>
              <span>{interest.weight}</span>
            </div>;
          })}
        </div>
      </>
    );
  } else {
    return <div>Loading</div>;
  }
};

export default AlgorithmPage;
