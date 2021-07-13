const fs = require('fs')
const path = require('path')
const express = require('express')

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded( { extended : true }) )

// const accountData = fs.readFileSync('src/json/accounts.json', { encoding: 'utf-8' })
// const accounts = JSON.parse(accountData)

// const userData = fs.readFileSync('src/json/users.json', { encoding: 'utf-8' })
// const users = JSON.parse(userData)

// step 4-8 : require data library
const { accounts, users, writeJSON } = require('./data')




app.get('/', (req, res) => {
  return res.render('index', { title: 'Account Summary', accounts })
})
app.get('/savings', (req, res) => {
  return res.render('account', { account: accounts.savings })
})
app.get('/checking', (req, res) => {
  return res.render('account', { account: accounts.checking })
})
app.get('/credit', (req, res) => {
  return res.render('account', { account: accounts.credit })
})
app.get('/profile', (req, res) => {
  return res.render('profile', { user: users[0] })
})
app.get('/transfer', (req, res) => {
  return res.render('transfer')
})
app.post('/transfer', (req, res) => {

  const { from, to, amount } = req.body
  const oldFrom = parseInt(accounts[from].balance)
  const oldTo = parseInt(accounts[to].balance)
  console.log(`Transferring ${amount} from ${from} to ${to}`)
  console.log(`Original balances\n${from}: ${oldFrom}\n${to}: ${oldTo}`)

  const newFrom = parseInt(accounts[from].balance) - parseInt(amount)
  const newTo = parseInt(accounts[to].balance)+ parseInt(amount)

  console.log(`New balances\n${from}: ${newFrom}\n${to}: ${newTo}`)
  
  accounts[from].balance = newFrom
  accounts[to].balance = newTo

  // step 4-9 : Function Call Transfer - replace with call to writeJSON
  writeJSON(accounts, "accounts.json")

  return res.render('transfer', { message : 'Transfer Completed' })
})

app.get('/payment', (req, res) => {
  return res.render('payment', { account : accounts.credit })
})


app.post('/payment', (req, res) => {
  const { amount } = req.body
  const { balance, available } = accounts.credit

  const newBalance = parseInt(balance) - parseInt(amount)
  const newAvailable = parseInt(available) + parseInt(amount)

  accounts.credit.balance = newBalance
  accounts.credit.available = newAvailable

  // step 4-10 : Function Call Payments
  writeJSON(accounts, "accounts.json")

  // const accountsJSON = JSON.stringify(accounts)

  // fs.writeFileSync(path.join(__dirname, 'json', 'accounts.json'), accountsJSON,  'utf-8' )
  return res.render('payment', { message : 'Payment Successful' , account : accounts.credit })


})

app.listen(3000, () => {
  console.log('PS Project Running on port 3000!')
})