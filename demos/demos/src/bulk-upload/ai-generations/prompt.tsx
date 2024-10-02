import { useState } from "react";

interface Event {
  name: string;
  date: string;
  venue: string;
  // Add more fields as needed
}

function BulkEventUploader() {
  const [inputText, setInputText] = useState("");
  const [events, setEvents] = useState<Event[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  const handleParseAndAdjust = () => {
    // Parse the input text into events (you can use split, regex, or other methods)
    const parsedEvents = inputText.split("\n").map((eventStr) => {
      // Adjust event details as needed
      return {
        name: eventStr.trim(),
        date: "", // Initialize with default values
        venue: "",
        // Add more fields as needed
      };
    });

    setEvents(parsedEvents);
  };

  const handleEventAdjustment = (index: number, field: keyof Event, value: string) => {
    // Update the adjusted event
    const updatedEvents = [...events];
    updatedEvents[index][field] = value;
    setEvents(updatedEvents);
  };

  const handleConfirmation = () => {
    // Handle the confirmed events (e.g., send to the server for bulk upload)
    console.log("Confirmed Events:", events);
  };

  return (
    <div>
      <textarea
        placeholder="Paste events here..."
        value={inputText}
        onChange={handleInputChange}
        rows={10}
        cols={40}
      />
      <button onClick={handleParseAndAdjust}>Parse and Adjust</button>
      {events.map((event, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Event Name"
            value={event.name}
            onChange={(e) => handleEventAdjustment(index, "name", e.target.value)}
          />
          <input
            type="text"
            placeholder="Event Date"
            value={event.date}
            onChange={(e) => handleEventAdjustment(index, "date", e.target.value)}
          />
          <input
            type="text"
            placeholder="Venue"
            value={event.venue}
            onChange={(e) => handleEventAdjustment(index, "venue", e.target.value)}
          />
          {/* Add more input fields for other event details */}
        </div>
      ))}
      <button onClick={handleConfirmation}>Confirm</button>
    </div>
  );
}

export default BulkEventUploader;
