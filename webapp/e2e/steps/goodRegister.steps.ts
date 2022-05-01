import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./features/goodRegister.feature');

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

  test('Un usuario no registrado intenta registrarse con email existente', ({given,when,then}) => {
    
    let s1: string;
    let s2: string;
    let s3: string;
    let s4: string;
    let s5: string;

  
    given('An unregistered user', () => {
        s1= "pruebapa2"
        s2= "Prueba1234@gmail.com"
        s3 ="PruebaPrueba1+"
        s4 = "PruebaPrueba1+"
        s5 = "68561654"
    });

    when('I try to register with repeated email', async () => {
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
        // await expect(page).toClick('button[aria-label="submit"]')

    //   await expect(page).toClick("button[text ='Login']")
    //    await page.waitForNavigation();
      
    });

    then('An error message is shown', async () => {
      await expect(page).toMatch('Login')
      await expect(page).toMatch('Username or email are already used')
  })

});
  

  afterAll(async ()=>{
    browser.close()
  })

});

