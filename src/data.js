const fs = require('fs')
const path = require('path')

// step 3 - reading and parsing from Accounts file
const accountData = fs.readFileSync('src/json/accounts.json', { encoding: 'utf-8' })
const accounts = JSON.parse(accountData)

// step 4 - reading and parsing from Users file
const userData = fs.readFileSync('src/json/users.json', { encoding: 'utf-8' })
const users = JSON.parse(userData)




const writeJSON = (data, fname) => {
  /**
   * data :  or accountData or userData
   * fname : filename (accounts.json or users.json)
   */
  const dataJSON = JSON.stringify(data)
  const p = path.join(__dirname, 'json', fname)
  // console.log(p)
  fs.writeFileSync(p, dataJSON, 'utf-8' )

}

module.exports = { accounts, users, writeJSON }