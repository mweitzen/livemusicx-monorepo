import "@repo/ui/styles.css";
import "@repo/ui/ui.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import App from "./App.tsx";
import App from "./setlist-manager.tsx";

import { TRPCReactProvider } from "@repo/trpc/react";
import { Toaster } from "@repo/ui/components/toaster";
import RepertoireManagement from "./repertoire-manager.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TRPCReactProvider>
      <App
        initialSetlist={{
          id: "set-1",
          name: "setlits1",
          sections: [
            {
              id: "sec-1",
              name: "section",
              songs: [
                {
                  id: "song-1",
                  title: "New Song",
                  artist: "rtist",
                  duration: "3:45",
                },
              ],
            },
          ],
        }}
        allSongs={[
          {
            id: "song-1",
            title: "New Song",
            artist: "rtist",
            duration: "3:45",
          },
        ]}
      />
      {/* <RepertoireManagement onAddToSetlist={() => {}} /> */}
      <Toaster />
    </TRPCReactProvider>
  </StrictMode>
);
