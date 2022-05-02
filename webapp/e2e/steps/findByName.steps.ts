import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./features/findByName.feature');

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

  test('El usuario no esta registrado busca un producto en especifico', ({given,when,then}) => {
    
    let name:string;

    given('An unregistered user', () => {
      name = "IPhone"
    });

    when('I fill a name in the search bar', async () => {
      await expect(page).toMatch('PRODUCTS')
      await expect(page).toFill('input[aria-label="searchProd"]', name)
    });

    then('Only the product with the name will be shown', async () => {
      await expect(page).toMatch('IPhone 13')
    });
  })


  test('El usuario no esta registrado busca un producto en general', ({given,when,then}) => {
    
    let name:string;
  

    given('An unregistered user', () => {
      name = "IPhone"
    });

    when('I fill a name in the search bar', async () => {
      await expect(page).toMatch('PRODUCTS')
      await expect(page).toFill('input[aria-label="searchProd"]', name)
    });

    then('The products containing the name will be shown', async () => {
      await expect(page).toMatch('IPhone 13')
    });
  })

  afterAll(async ()=>{
    browser.close()
  })

});

