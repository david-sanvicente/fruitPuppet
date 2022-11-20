const puppeteer = require('puppeteer')
const fs = require('fs')
const baskets = require('./data/baskets')

void (async () => {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()

  await page.goto(
    'https://www.melissas.com/collections/gift-baskets/products/deluxe-exotic-and-tropical-fruit-basket'
  )

  const result = await page.evaluate(() => {
    const productItem = Array.from(
      document.querySelectorAll('div[class="product-description rte"]')
    )
    const paragraphs = Array.from(productItem[0].querySelectorAll('p'))

    const pArr = []
    for (p of paragraphs) {
      // console.log(p.innerText)
      pArr.push(p.innerText)
    }
    const description = pArr.join('\n')

    console.log(description)
  })
})()
