const fs = require('fs')

const baskets = require('./baskets')
const froots = require('./froots')
const inSeason = require('./inSeason')
const veggies = require('./veggies')

baskets.forEach((basket) => (basket.itemType = 'Basket'))
froots.forEach((fruit) => (fruit.itemType = 'Fruit'))
inSeason.forEach((item) => (item.itemType = 'InSeason'))
veggies.forEach((veggie) => (veggie.itemType = 'Veggie'))

const result = [...baskets, ...froots, ...inSeason, ...veggies]

console.log(result)

function writeFile(type) {
  return fs.writeFile(
    `./${type}_details_description.js`,
    JSON.stringify(type, null, 2),
    (err) => {
      err
        ? console.error('Data not written', err)
        : console.log('Data written successfully!')
    }
  )
}

fs.writeFile(`./results.js`, JSON.stringify(result, null, 2), (err) => {
  err
    ? console.error('Data not written', err)
    : console.log('Data written successfully!')
})

// fs.writeFile(
//   `./veggies_details_description.js`,
//   JSON.stringify(veggies, null, 2),
//   (err) => {
//     err
//       ? console.error('Data not written', err)
//       : console.log('Data written successfully!')
//   }
// )

// fs.writeFile(
//   `./baskets_details_description.js`,
//   JSON.stringify(baskets, null, 2),
//   (err) => {
//     err
//       ? console.error('Data not written', err)
//       : console.log('Data written successfully!')
//   }
// )

// fs.writeFile(
//   `./froots_details_description.js`,
//   JSON.stringify(froots, null, 2),
//   (err) => {
//     err
//       ? console.error('Data not written', err)
//       : console.log('Data written successfully!')
//   }
// )
