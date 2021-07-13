const fs = require('fs')
const path = require('path')
const express = require('express')

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded( { extended : true }) )

// step 4-8 : require data library
const { accounts, users, writeJSON } = require('./data')

// step 6-11 : require account routes
const accountRoutes = require('./routes/accounts')
// step 6-12 : require services routes
const servicesRoutes = require('./routes/services')

// 6-13 and 6-14   Use routes
app.use('/account', accountRoutes)
app.use('/services', servicesRoutes)

app.get('/', (req, res) => {
  return res.render('index', { title: 'Account Summary', accounts })
})

app.get('/profile', (req, res) => {
  return res.render('profile', { user: users[0] })
})


app.listen(3000, () => {
  console.log('PS Project Running on port 3000!')
})