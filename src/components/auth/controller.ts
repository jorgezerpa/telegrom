import axios from "axios"
import { store } from '../users/store'

export const registerUser =  async(data:any) => {
    //save on auth0
    const { data:{ _id } } = await fethAuth0(data)
    data.authId = _id
    delete data.password
    //save on my db
    const result = await store.addUser(data)
    return 'user created'
}

const fethAuth0 = async(data:any) => {
    const result = await axios.post(
        'https://dev-x7zwzkjp2jhejnw5.us.auth0.com/dbconnections/signup',
        {
            "client_id": "yhGeDVRxsWZmzfBhpr79XpXsnwZxUInv",
            "email": data.email,
            "password": data.password,
            "connection": "Username-Password-Authentication",
            "name": data.firstName + ' ' + data.lastName,
            // "picture": "http://example.org/jdoe.png",
            // "user_metadata": { plan: 'silver', team_id: 'a111' }
        },
        {
            headers: {"Content-Type": "application/json"}
        }
    )
    return result
}