import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./features/addToCart.feature');

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

  test('Un usuario logeado añade un producto', ({given,when,then}) => {
    
    let s1: string;
    let s2: string;
  
    given('An logged user', () => {
        s1= "pruebaprueba"
        s2= "PruebaPrueba1+"
    });

    when('I add a product to cart', async () => {
        await page.setDefaultNavigationTimeout(0);
        await page.setViewport({ width: 1200, height: 1300 });
        await expect(page).toMatch('PRODUCTS')
        await page.goto("http://localhost:3000/login")
        await expect(page).toFill('input[name="username"]', s1)
        await expect(page).toFill('input[name="password"]', s2)
        await expect(page).toClick('button[aria-label="submit"]')

        await expect(page).toFill('input[aria-label="searchProd"]', "IPhoneX")
        await expect(page).toClick('button[aria-label="btnAñadir"]')

        await page.goto("http://localhost:3000/cart")

    //   await expect(page).toClick("button[text ='Login']")
    //    await page.waitForNavigation();
      
    });

    then('I see the product on the cart', async () => {
      await expect(page).toMatch('My cart')
    });
  })


  

  afterAll(async ()=>{
    browser.close()
  })

});