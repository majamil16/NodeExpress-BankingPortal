const fs = require('fs')
const path = require('path')

// step 3 - reading and parsing from Accounts file
const accountData = fs.readFileSync('src/json/accounts.json', 'utf8' )
const accounts = JSON.parse(accountData)

// step 4 - reading and parsing from Users file
const userData = fs.readFileSync('src/json/users.json', 'utf8' )
const users = JSON.parse(userData)




const writeJSON = () => {
  let accountsJSON = JSON.stringify(accounts, null, 4)
  fs.writeFileSync(path.join(__dirname, 'json','accounts.json'), accountsJSON, 'utf8');
}

module.exports = { accounts, users, writeJSON }