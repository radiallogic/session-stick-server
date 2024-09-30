import '@testing-library/jest-dom'
import { speedTrend }  from "../../app/lib/15minSpeedTrend";
import { DataMessage } from '@/app/types/data.types';

const da: DataMessage[] = 
[
  { average_speed: 10, time: new Date( Date.now() - 1 * 60000) },
  { average_speed: 8, time: new Date( Date.now() - 3 * 60000) },
  { average_speed: 6, time: new Date( Date.now() - 8 * 60000) },
  { average_speed: 12, time: new Date( Date.now() - 9 * 60000) }
] 
 
describe('15 min speed trend ', () => {
  it('accepts correct data', () => {
    speedTrend(da)
  })

  it(' returns correct trend', () => {
    const avg = speedTrend(da)
    
    // -2 -2 + 6
    expect(avg).toBe(2)
  })

  it('ignores data outside of the last 15 mins', () => {
    const newData = [...da, { speed: 1, time: new Date( Date.now() - 20 * 60000) }]
    const avg = speedTrend(newData)
    expect(avg).toBe(2)
  })


  it('doesnt error if there is no valid data', () => {
    const newData = [{ speed: 1, time: new Date( Date.now() - 20 * 60000) }]
    const avg = speedTrend(newData)

    expect(avg).toBe(0)
  })
})