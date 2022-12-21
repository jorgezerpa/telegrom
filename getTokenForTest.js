const axios = require('axios')

async function fetch () {
    const result  = await axios.post(
                        'https://dev-x7zwzkjp2jhejnw5.us.auth0.com/oauth/token',
                        {"client_id":"NHd8r8f2EvfVO016VITsvKwiAXn6voGo","client_secret":"HW4vnV86OpaKPSpV3I7w0kbzfXs_fJKeIpuV-xzw09AOAhM-ZNoL2jvhzslwNIpx","audience":"https://telegrom.com","grant_type":"client_credentials"},    
                        { headers: { 'content-type': 'application/json' }}
                    )
        .then(data => console.log(data))
        .catch(err=>console.log(err))
}

