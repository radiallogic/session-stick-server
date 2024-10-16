import '@testing-library/jest-dom'
import { gustSpeed }  from "../../app/lib/15minGustSpeed";
import { DataMessage } from '@/app/types/data.types';

const da: DataMessage[] = 
[
  { gust_speed: 2, time: new Date( Date.now() - 1 * 60000) },
  { gust_speed: 2, time: new Date( Date.now() - 3 * 60000) },
  { gust_speed: 1, time: new Date( Date.now() - 8 * 60000) },
  { gust_speed: 3, time: new Date( Date.now() - 9 * 60000) }
] 
 
describe('15 min average speed', () => {
  it('accepts correct data', () => {
    gustSpeed(da)
  })

  it('accepts correct data and returns an average', () => {
    const avg = gustSpeed(da)
 
    expect(avg).toBe(2)
  })

  it('ignores data outside of the last 15 mins', () => {
    const newData = [...da, { gust_speed: 1, time: new Date( Date.now() - 20 * 60000) }]
    const avg = gustSpeed(newData)
    expect(avg).toBe(2)
  })


  it('doesnt error if there is no valid data', () => {
    const newData = [{ gust_speed: 1, time: new Date( Date.now() - 20 * 60000) }]
    const avg = gustSpeed(newData)

    expect(avg).toBe(0)
  })
})