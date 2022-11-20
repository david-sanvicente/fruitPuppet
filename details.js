const puppeteer = require('puppeteer')
const fs = require('fs')
const baskets = require('./data/inSeason')

void (async () => {
  const browser = await puppeteer.launch({ headless: true })
  const descriptions = []

  let count = 0

  for (basket of baskets) {
    count++
    console.log(`Basket number: ${count} of ${baskets.length}`)
    const page = await browser.newPage()
    await page.goto(basket.details)

    const result = await page.evaluate(() => {
      const paragraphs = document
        .querySelectorAll('div[class="product-description rte"]')[0]
        .querySelectorAll('p')

      const pArr = []
      for (p of paragraphs) {
        pArr.push(p.innerText)
      }
      let description = pArr.join('\n')

      if (description.length === 0)
        description = 'Details for this item are unavailable.'

      return description
    })

    descriptions.push(result)
  }
  await browser.close()

  fs.writeFile(
    './data/inSeason_details.js',
    JSON.stringify(descriptions, null, 2),
    (err) => {
      err
        ? console.error('Data not written', err)
        : console.log('Data written successfully!')
    }
  )
})()
