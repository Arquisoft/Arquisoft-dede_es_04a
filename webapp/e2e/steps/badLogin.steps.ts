import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./features/badLogin.feature');

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

  test('Un usuario no registrado intenta logearse', ({given,when,then}) => {
    
    let s1: string;
    let s2: string;
  

    given('An unregistered user', () => {
      s1= "pru"
      s2= "Prueba"
    });

    when('I login', async () => {
        await page.setDefaultNavigationTimeout(0);
        await page.setViewport({ width: 1200, height: 1300 });
        await expect(page).toMatch('PRODUCTS')
        await page.goto("http://localhost:3000/login")
        await expect(page).toFill('input[name="username"]', s1)
        await expect(page).toFill('input[name="password"]', s2)
        await expect(page).toClick('button[aria-label="submit"]')

    //   await expect(page).toClick("button[text ='Login']")
    //    await page.waitForNavigation();
      
    });

    then('I am at the login view and an error message is shown', async () => {
      await expect(page).toMatch('Login')
      await expect(page).toMatch('The username or password are incorrect')
    });
  })

  test('Un usuario no registrado intenta logearse y no rellena campos', ({given,when,then}) => {
    
    let username: string;
    let password: string;
  

    given('An unregistered user', () => {
      username= ""
      password= ""
    });

    when('I login with blank params', async () => {
        await page.setDefaultNavigationTimeout(0);
        await page.setViewport({ width: 1200, height: 1300 });
        await page.goto("http://localhost:3000/login")
        await expect(page).toFill('input[name="username"]', username)
        await expect(page).toFill('input[name="password"]', password)
        await expect(page).toClick('button[aria-label="submit"]')

    //   await expect(page).toClick("button[text ='Login']")
    //    await page.waitForNavigation();
      
    });

    then('I am at the login view and an error message is shown', async () => {
      await expect(page).toMatch('Login')
      await expect(page).toMatch('There is any field empty')
    });
  })

  

  afterAll(async ()=>{
    browser.close()
  })

});