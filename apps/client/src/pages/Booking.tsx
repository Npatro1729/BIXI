import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Router from "next/router";
import { useEffect, useState, FormEvent } from "react";
import axios from "axios";

const Main: NextPage = () => {
  const [userInput, setUserInput] = useState({ pickup: "", pickuptime: "", droptime: "", range: "" });
  const { status, data: session } = useSession();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'api/users/booking',
        {
          pickup: userInput.pickup,
          pickuptime: userInput.pickuptime,
          droptime: userInput.droptime,
          range: userInput.range,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      const data = response.data.data;
      console.log(data);
      Router.push({
         pathname : "/Available",
         query: { data: JSON.stringify(data)}
      });
    } catch (error) {
      console.error('Error during booking:', error);
    }
  };

  useEffect(() => {
    if (status === "unauthenticated") Router.replace("/Login");
  }, [status]);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.admin) {
      Router.push("/Admin");
    }
  }, [status, session]);

  if (status === "authenticated") {
    return (
      <div>
        <div style={{ background: "#1f998c" }} className="h-screen flex justify-center items-center">
          <div className="w-96 p-6 shadow-lg bg-white rounded-md">
            <div className="text-neutral-950">
              This page is work in progress!
            </div>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="pickup" className="text-neutral-950">Pickup point:</label>
                <select
                  className="text-neutral-950 border w-full border-neutral-700 rounded-md"
                  name="pickup points"
                  id="pickup"
                  required
                  value={userInput.pickup}
                  onChange={(e) => setUserInput({ ...userInput, pickup: e.target.value })}
                >
                  <option value="apj">APJ</option>
                  <option value="rhr">RHR</option>
                </select>
              </div>
              <div className="mt-5">
                <label className="text-neutral-950" htmlFor="pickup-time">Pickup time:</label>
                <input
                  className="text-neutral-950 border w-24 border-neutral-700 ml-2 rounded-md"
                  type="time"
                  name="pickup time"
                  id="pickup-time"
                  required
                  value={userInput.pickuptime}
                  onChange={(e) => setUserInput({ ...userInput, pickuptime: e.target.value })}
                />
              </div>
              <div className="mt-5">
                <label className="text-neutral-950" htmlFor="drop-time">Drop time:</label>
                <input
                  className="text-neutral-950 border w-24 border-neutral-700 ml-2 rounded-md"
                  type="time"
                  name="drop time"
                  id="drop-time"
                  required
                  value={userInput.droptime}
                  onChange={(e) => setUserInput({ ...userInput, droptime: e.target.value })}
                />
              </div>
              <div className="mt-5">
                <label className="text-neutral-950" htmlFor="range">Required Range:</label>
                <input
                  className="text-neutral-950 border w-24 border-neutral-700 ml-2 rounded-md"
                  type="number"
                  name="range"
                  id="range"
                  placeholder="Kms"
                  value={userInput.range}
                  onChange={(e) => setUserInput({ ...userInput, range: e.target.value })}
                />
              </div>
              <div className="mt-5">
                <button
                  type="submit"
                  className="border-2 border-green-700 bg-green-700 text-white py-1 w-full rounded-md hover:bg-transparent hover:text-stone-950 font-semibold"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return <div>Loading...</div>;
};

export default Main;
