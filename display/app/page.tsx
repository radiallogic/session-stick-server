// "use client" 



import { DeviceData } from "./components/DeviceData"
import {useDetail} from "./hooks/useDetail"

export default async function Home() {
  // get devices
  // get detail for device

  const records = await useDetail(); 


    console.log("page records", records)
  return (
    <DeviceData records={records}/>
  );
}
