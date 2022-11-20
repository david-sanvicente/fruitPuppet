function merge(type) {
  const data = require(`./data/${type}`)
  const details = require(`./data/${type}_details`)
  const fs = require('fs')

  for (i in data) {
    data[i].description = details[i]
  }

  fs.writeFile(
    `./data/${type}_details_description.js`,
    JSON.stringify(data, null, 2),
    (err) => {
      err
        ? console.error('Data not written', err)
        : console.log('Data written successfully!')
    }
  )
}

merge('inSeason')
