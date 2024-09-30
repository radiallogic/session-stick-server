import '@testing-library/jest-dom'
import { averageSpeed }  from "../../app/lib/15minAverageSpeed";
import { DataMessage } from '@/app/types/data.types';

const da: DataMessage[] = 
[
  { average_speed: 2, time: new Date( Date.now() - 1 * 60000) },
  { average_speed: 2, time: new Date( Date.now() - 3 * 60000) },
  { average_speed: 1, time: new Date( Date.now() - 8 * 60000) },
  { average_speed: 3, time: new Date( Date.now() - 9 * 60000) }
] 
 
describe('15 min average speed', () => {
  it('accepts correct data', () => {
    averageSpeed(da)
  })

  it('accepts correct data and returns an average', () => {
    const avg = averageSpeed(da)
 
    expect(avg).toBe(2)
  })

  it('ignores data outside of the last 15 mins', () => {
    const newData = [...da, { average_speed: 1, time: new Date( Date.now() - 20 * 60000) }]
    const avg = averageSpeed(newData)
    expect(avg).toBe(2)
  })


  it('doesnt error if there is no valid data', () => {
    const newData = [{ average_speed: 1, time: new Date( Date.now() - 20 * 60000) }]
    const avg = averageSpeed(newData)

    expect(avg).toBe(0)
  })
})