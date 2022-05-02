import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./features/badAdd.feature');

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

  test('Un usuario no logeado añade un producto', ({given,when,then}) => {
    
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

        await expect(page).toClick('button[aria-label="btnAñadir"]')

    //   await expect(page).toClick("button[text ='Login']")
    //   await page.waitForNavigation(); 
      
    });

    then('I am redirected to login view', async () => {
      await expect(page).toMatch('Login')
    });
  })


  

  afterAll(async ()=>{
    browser.close()
  })

});