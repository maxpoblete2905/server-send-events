// import { useEffect, useState } from "react";
// import { TransferData } from "../interfaces/TransferData";

// export function useTransferData(): TransferData[] {
//   const [data, setData] = useState<TransferData[]>([]);

//   useEffect(() => {
//     const eventSource = new EventSource(
//       `${import.meta.env.VITE_BACKEND_URL}/api/listen`
//     );

//     eventSource.onmessage = (event) => {
//       const newData: TransferData = JSON.parse(event.data);
//       setData(prevData => [...prevData, newData]);
//     };

//     eventSource.onerror = (error) => {
//       console.error("Error en la conexión del EventSource:", error);
//     };

//     return () => {
//       eventSource.close();
//     };
//   }, []);

//   return data;
// }
