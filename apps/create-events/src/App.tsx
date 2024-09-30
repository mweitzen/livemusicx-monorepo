import { api } from "@repo/trpc/react";
import { Button } from "@repo/ui/components/button";

function App() {
  const { mutate } = api.events.test.useMutation({
    onSuccess: () => {
      console.log("Success");
    },
  });

  return (
    <div className='container'>
      <h1 className='text-center py-4 text-3xl'>Create Events</h1>
      <div></div>
      <Button
        onClick={() => {
          mutate({
            id: "Testing",
          });
        }}
      >
        Mutate
      </Button>
    </div>
  );
}

export default App;
