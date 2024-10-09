const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;
    authentication(username,password)

})

async function authentication(username, password){
  const response = await fetch('https://01.kood.tech/api/auth/signin',{
    method: 'POST',
    headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic '+btoa(username,password)
    },
});
const JWTToken = await response.json();
console.log(JWTToken)
}

let secondUrl = 'https://01.kood.tech/api/graphql-engine/v1/graphql'

let token

/*let headers = new Headers();

//headers.append('Content-Type', 'text/json');
headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
fetch(url, {method:'POST',
        headers: headers,
        //credentials: 'user:passwd'
       })
.then(response => response.json())
.then(json => console.log(json));
//.done();

fetch('https://01.kood.tech/api/graphql-engine/v1/graphql', {
        headers: {Authorization: 'Bearer {token}'}
      })
         .then(resp => resp.json())
         .then(json => console.log(JSON.stringify(json)))
      

         async function makeRequests() {
                let headers = new Headers();
                headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
              
                try {
                  // First fetch request
                  const response = await fetch(url, {
                    method: 'POST',
                    headers: headers,
                  });
              
                  if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                  }
              
                  const json = await response.json();  // Parse the response as JSON
                  console.log('First response JSON:', json);
              
                  // Use the JSON from the first request to make a second fetch request
                  const secondHeaders = new Headers();
                  secondHeaders.set('Authorization', 'Bearer {json.token}');  // Example: Using token from first response
              
                  const secondResponse = await fetch(secondUrl, {
                    method: 'POST',
                    headers: secondHeaders,
                  });
              
                  if (!secondResponse.ok) {
                    throw new Error(`HTTP error! Status: ${secondResponse.status}`);
                  }
              
                  const secondJson = await secondResponse.json();
                  console.log('Second response JSON:', secondJson);
              
                } catch (error) {
                  console.error('Fetch error:', error);  // Handle any errors
                }
              }
              
              // Call the async function
              makeRequests();
             */ 

let data 
async function login(){
        const response = await fetch('https://01.kood.tech/api/auth/signin',{
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Basic ' +btoa('rjuhkam:JYe2!YK4TytHpb')
                },
        });
        const JWTToken = await response.json();
        return JWTToken;
}
const query = "query {transaction{id}}"
async function getData(){
  const authToken = await login()
        const response = await fetch('https://01.kood.tech/api/graphql-engine/v1/graphql',{
                method: 'POST',
                headers: {
                        'Content-type': 'applcation/json',
                        'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify({query}),
                });
        const queryData = await response.json()
        return queryData
}


async function test() {
  data = await getData()
  console.log(data)

 // console.log(data.data.user[0])
  //const user = data.data.user[0]
  //console.log(user.id)
  for (var i = 0; i < data.length; i++) {
    console.log(data[i])
    } 
}
