const express = require('express')
const router = express.Router()

const { accounts, writeJSON } = require('../data')

router.get('/transfer', (req, res) => {
  return res.render('transfer')
})
router.post('/transfer', (req, res) => {

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
  writeJSON()

  return res.render('transfer', { message : 'Transfer Completed' })
})

router.get('/payment', (req, res) => {
  return res.render('payment', { account : accounts.credit })
})


router.post('/payment', (req, res) => {
  const { amount } = req.body
  const { balance, available } = accounts.credit

  const newBalance = parseInt(balance) - parseInt(amount)
  const newAvailable = parseInt(available) + parseInt(amount)

  accounts.credit.balance = newBalance
  accounts.credit.available = newAvailable

  // step 4-10 : Function Call Payments
  writeJSON()

  // const accountsJSON = JSON.stringify(accounts)

  // fs.writeFileSync(path.join(__dirname, 'json', 'accounts.json'), accountsJSON,  'utf-8' )
  return res.render('payment', { message : 'Payment Successful' , account : accounts.credit })


})

module.exports = router;