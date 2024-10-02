import { useState } from "react";
import FanLiveInterface from "./fan";
import PerformerLiveInterface from "./performer";
import VenueLiveInterface from "./venue";
import { Button } from "@repo/ui/components/button";

function App() {
  const [currentDemo, setCurrentDemo] = useState<"venue" | "performer" | "fan">(
    "fan"
  );

  return (
    <div className='container'>
      <h1 className='text-center py-4 text-3xl'>Live Interaction</h1>
      <div className='flex justify-center gap-4 mb-6'>
        <Button
          variant='outline'
          onClick={() => setCurrentDemo("fan")}
        >
          Fan
        </Button>
        <Button
          variant='outline'
          onClick={() => setCurrentDemo("venue")}
        >
          Venue
        </Button>
        <Button
          variant='outline'
          onClick={() => setCurrentDemo("performer")}
        >
          Performer
        </Button>
      </div>
      {currentDemo === "fan" && <FanLiveInterface />}
      {currentDemo === "venue" && <VenueLiveInterface />}
      {currentDemo === "performer" && <PerformerLiveInterface />}
    </div>
  );
}

export default App;
