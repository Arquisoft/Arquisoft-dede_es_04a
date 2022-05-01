import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./features/findByPrice.feature');

let page: puppeteer.Page;
let browser: puppeteer.Browser;

defineFeature(feature, test => {
  jest.setTimeout(9999999)
  beforeAll(async () => {
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: true, slowMo:100 });
    page = await browser.newPage();

    await page
      .goto("http://localhost:3000", {
        waitUntil: "networkidle0",
      })
      .catch(() => {});
  });

  test('El usuario no esta registrado busca un producto por precio minimo', ({given,when,then}) => {
    
    let price:string;

    given('An unregistered user', () => {
      price = "200"
    });

    when('I fill price in the minimun bar', async () => {
      await expect(page).toMatch('PRODUCTS')
      await expect(page).toFill('input[aria-label="minPrice"]', price)
    });

    then('The products with a price above that one are shown', async () => {
      await expect(page).not.toMatch('Samsung Galaxy-A03s')
    });
  })


  test('El usuario no esta registrado busca un producto por precio maximo', ({given,when,then}) => {
    
    let price:string;
  

    given('An unregistered user', () => {
      price = "1000"
    });

    when('I fill price in the maximum bar', async () => {
      await expect(page).toMatch('PRODUCTS')
      await expect(page).toFill('input[aria-label="searchProd"]', price)
    });

    then('The products with a price under that one are shown', async () => {
      await expect(page).not.toMatch('IPhoneX')
    });
  })

  afterAll(async ()=>{
    browser.close()
  })

});