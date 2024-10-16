const express = require('express');
const session = require('express-session')
const app = express();
const path = require('path');

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.set('view engine', 'ejs')
app.use(express.json());
app.use(express.static('js'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

async function authentication(username, password){
 
  const combination = username + ":" + password 
  try {
  const response = await fetch('https://01.kood.tech/api/auth/signin',{
    method: 'POST',
    headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic '+btoa(combination)
    },
});
if (!response.ok){
  throw new Error()
}

const JWTToken = await response.json();
return JWTToken
} catch (error) {
  return null
  }
}

async function getQuery(username,password){
  const JWTToken = await authentication(username,password)
  try {
  const response = await fetch('https://01.kood.tech/api/graphql-engine/v1/graphql',{
    method: 'POST',
    headers: {
            'Content-type': 'applcation/json',
            'Authorization': `Bearer ${JWTToken}`
    },
    body: JSON.stringify({query}),
    });
    if (!response.ok){
      throw new Error()
    }
    const queryData = await response.json()
    return queryData
  } 
    catch (error) {
      return null
    }
  }

  const query = `
  query {
    transaction {
      id
      type
      amount
      userId
      createdAt
      path
      user {
        id
        login
      }
    }
  }
`;



app.get('/', function(request,response){
  response.sendFile(path.join(__dirname + '/index.html'))
})

app.post('/auth',async function(request,response){
  let username = request.body.username
  let password = request.body.password
  if (username && password){
    const queryData = await getQuery(username, password,query)
    if (queryData){
    request.session.loggedIn = true
    request.session.queryData = queryData
    console.log("Login succesful")
    response.redirect('/home')
    }else{
    response.send('Incorrect username and/or password')
  }
} else{
  response.send('Please provide username and password')
  }
  }
)

app.get('/home', (request, response) => {
  if (request.session.loggedIn){
    const transactions = request.session.queryData
    transactions.forEach(transaction => {
      console.log(`Transaction ID: ${transaction.id}`);
      console.log(`Type: ${transaction.type}`);
      console.log(`Amount: ${transaction.amount}`);
      console.log(`User ID: ${transaction.userId}`);
      console.log(`Created At: ${transaction.createdAt}`);
      console.log(`Path: ${transaction.path}`);
      console.log(`User ID: ${transaction.user.id}`);
      console.log(`User Login: ${transaction.user.login}`);
      console.log('------------------------------------');
    });
    //console.log(queryData)
    response.render('home', {queryData})
  } else{
    response.send('Please login to view this page')
  }
  response.end()
})


app.listen(8080)