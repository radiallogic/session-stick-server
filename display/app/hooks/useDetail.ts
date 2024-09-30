
import {useState} from 'react'

export async function useDetail() {
    //let data = await fetch('http://localhost:3000/api/detail')
    let data = await fetch('http://localhost:3000/api/test', {cache: 'no-store'})
    let json = await data.json()


    console.log(json.success)
    return json
}
