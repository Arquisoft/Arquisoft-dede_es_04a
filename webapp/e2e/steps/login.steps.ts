import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./features/login.feature');

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

  test('Un usuario registrado intenta logearse', ({given,when,then}) => {
    
    let username: string;
    let password: string;
  

    given('An unlogged user', () => {
      username= "pruebaprueba"
      password= "PruebaPrueba1+"
    });

    when('I login', async () => {
        await page.setDefaultNavigationTimeout(0);
        await page.setViewport({ width: 1200, height: 1300 });
        await expect(page).toMatch('PRODUCTS')
        await page.goto("http://localhost:3000/login")
        await expect(page).toFill('input[name="username"]', username)
        await expect(page).toFill('input[name="password"]', password)
        await expect(page).toClick('button[aria-label="submit"]')

    //   await expect(page).toClick("button[text ='Login']")
    //    await page.waitForNavigation();
      
    });

    then('I am at the main view and a welcome message is shown', async () => {
      await expect(page).toMatch('PRODUCTS')
      await expect(page).toMatch('Logout')
      await expect(page).toMatch('Welcome back')
    });
  })


  

  afterAll(async ()=>{
    browser.close()
  })

});

