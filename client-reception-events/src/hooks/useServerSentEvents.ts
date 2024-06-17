// import { useEffect, useState } from 'react';

// function useServerSentEvents(eventType: string) {
//   const [eventList, setEventList] = useState<string[]>([]);

//   useEffect(() => {
//     const eventSource = new EventSource(`${import.meta.env.VITE_BACKEND_URL}/api/${eventType}`);

//     eventSource.onmessage = (event) => {
//       const eventData = event.data;
//       setEventList(prevEventList => [...prevEventList, eventData]);
//     };

//     return () => {
//       eventSource.close();
//     };
//   }, [eventType]);

//   return eventList;
// }

// export default useServerSentEvents;
