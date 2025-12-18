import { signal } from "@preact/signals";
import { supabase } from "../supa-base-client";
import { useEffect, useState } from "preact/hooks";

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
      const interestsArray = Object.entries(interestsObj).map(
        ([name, weight]) => ({
          name,
          weight: Number(weight),
        })
      );
      setInterests(() => interestsArray);
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
        <button
          class="btn"
          onClick={() => {
            console.log(useInterests);
          }}
        >
          console.log
        </button>
        <div>
          {useInterests.map((interest, idx) => (
            <div key={idx}>
              <span>
                {interest.name}: {interest.weight}
              </span>
            </div>
          ))}
        </div>
      </>
    );
  } else {
    <div>Loading...</div>;
  }
};

export default AlgorithmPage;
