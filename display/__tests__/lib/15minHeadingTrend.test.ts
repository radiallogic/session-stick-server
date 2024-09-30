import '@testing-library/jest-dom'
import { headingTrend }  from "../../app/lib/15minHeadingTrend";
import { DataMessage } from '@/app/types/data.types';

const da: DataMessage[] = 
[
  { heading: 200, time: new Date( Date.now() - 1 * 60000) },
  { heading: 198, time: new Date( Date.now() - 3 * 60000) },
  { heading: 210, time: new Date( Date.now() - 8 * 60000) },
  { heading: 199, time: new Date( Date.now() - 9 * 60000) }
] 
 
describe('15 min speed trend ', () => {
  it('accepts correct data', () => {
    headingTrend(da)
  })

  it(' returns correct trend', () => {
    const avg = headingTrend(da)
    
    // -2 +12 -1 = 9
    expect(avg).toBe(9)
  })

  it('ignores data outside of the last 15 mins', () => {
    const newData = [...da, { heading: 1, time: new Date( Date.now() - 20 * 60000) }]
    const avg = headingTrend(newData)
    expect(avg).toBe(9)
  })


  it('doesnt error if there is no valid data', () => {
    const newData = [{ heading: 1, time: new Date( Date.now() - 20 * 60000) }]
    const avg = headingTrend(newData)

    expect(avg).toBe(0)
  })
})