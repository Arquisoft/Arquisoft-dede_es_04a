import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./features/register.feature');

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

  test('Un usuario no registrado intenta registrarse', ({given,when,then}) => {
    
    let s1: string;
    let s2: string;
    let s3: string;
    let s4: string;
    let s5: string;

  
    given('An unregistered user', () => {
        s1= "pruebapa"
        s2= ""
        s3 ="asdf"
        s4 = "adsf"
        s5 = "68561"
    });

    when('I try to register with a bad credential', async () => {
        await page.setDefaultNavigationTimeout(0);
        await expect(page).toMatch('PRODUCTS')
        await page.goto("http://localhost:3000/register")
        await expect(page).toMatch('Register')
        await expect(page).toFill('input[name="username"]', s1)
        await expect(page).toFill('input[name="email"]', s2)
        await expect(page).toFill('input[name="password"]', s3)
        await expect(page).toFill('input[name="confirmPassword"]', s4)
        await expect(page).toFill('input[name="dni"]', s5)
        await expect(page).toClick('button[aria-label="submitBtn"]')

      
    });

    then('An error message is shown', async () => {
      await expect(page).toMatch('Register')
      await expect(page).toMatch('There is any field empty')
    });
  })


  

  afterAll(async ()=>{
    browser.close()
  })

});

