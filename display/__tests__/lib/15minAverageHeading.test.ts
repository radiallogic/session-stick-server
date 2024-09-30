import '@testing-library/jest-dom'
import { averageHeading } from "../../app/lib/15minAverageHeading";
import { DataMessage } from '@/app/types/data.types';

const da: DataMessage[] = 
[
  { heading: 224, time: new Date( Date.now() - 1 * 60000) },
  { heading: 236, time: new Date( Date.now() - 3 * 60000) },
  { heading: 234, time: new Date( Date.now() - 8 * 60000) },
  { heading: 236, time: new Date( Date.now() - 9 * 60000) }
] 
 
describe('15 min average direction', () => {
  it('accepts correct data', () => {
    averageHeading(da)
  })

  it('accepts correct data and returns a range array', () => {
    const avg = averageHeading(da)
 
    expect(avg).toStrictEqual([236, 224] )
  })

  it('ignores data outside of the last 15 mins', () => {

    const newData = [...da, { heading: 1, time: new Date( Date.now() - 20 * 60000) }]

    const avg = averageHeading(newData)
    expect(avg).toStrictEqual([236, 224])
  })


  it('doesnt error if there is no valid data', () => {
    const newData = [{ heading: 1, time: new Date( Date.now() - 20 * 60000) }]
    const avg = averageHeading(newData)
 
    expect(avg).toStrictEqual([0,0])
  })
})