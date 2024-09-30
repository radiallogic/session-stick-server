import { DataMessage } from '@/app/types/data.types';


export const revalidate = 0;

export async function GET(request: Request){
    const da: DataMessage[] = 
[
  {  average_speed: 2, heading: 200, time: new Date( Date.now() - 1 * 60000) },
  {  average_speed: 2, heading: 198, time: new Date( Date.now() - 3 * 60000) },
  {  average_speed: 6, heading: 210, time: new Date( Date.now() - 8 * 60000) },
  {  average_speed: 7, heading: 199, time: new Date( Date.now() - 9 * 60000) }
] 


return Response.json(da);
}