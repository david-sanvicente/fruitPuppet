const puppeteer = require('puppeteer')
const fs = require('fs')

void (async () => {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()

  await page.goto('https://www.melissas.com/collections/whats-in-season')

  const fruits = await page.evaluate(() => {
    const result = []

    const fruits = Array.from(
      document.querySelectorAll('div[class="productitem"]')
    )

    for (const fruit of fruits) {
      const myFruit = {}
      myFruit.name = fruit.querySelector('.productitem--title').innerText
      myFruit.image = fruit.querySelector('.productitem--image-primary').src
      myFruit.details = fruit.querySelector('.productitem--link').href
      myFruit.price = Number(fruit.querySelector('.money').innerText.slice(1))

      if (myFruit.price > 0) {
        myFruit.countInStock = Math.floor(Math.random() * 10)
      } else {
        myFruit.countInStock = 0
      }

      myFruit.rating =
        Math.floor(Math.random() * (5 * 100 - 2 * 100) + 1 * 100) / (1 * 100)
      result.push(myFruit)
    }

    return result
  })

  fs.writeFile('./inSeason.js', JSON.stringify(fruits, null, 2), (err) => {
    err
      ? console.error('Data not written', err)
      : console.log('Data written successfully!')
  })
  await browser.close()
})()
