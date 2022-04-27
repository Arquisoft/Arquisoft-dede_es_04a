import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./features/register-form.feature');

let page: puppeteer.Page;
let browser: puppeteer.Browser;

defineFeature(feature, test => {
  
  beforeAll(async () => {
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: true });
    page = await browser.newPage();

    await page
      .goto("http://localhost:3000/register", {
        waitUntil: "networkidle0",
      })
      .catch(() => {});
  });

  test('The user is not registered in the site', ({given,when,then}) => {
    
    let email:string;
    let username:string;
    let password:string;
    let confirmPassword:string;
    let dni:string;

    given('An unregistered user', () => {
      email = "newuser@test.com"
      username = "newuser"
      password = "pass"
      confirmPassword = "pass"
      dni = "0000"
    });

    when('I fill the data in the form and press submit', async () => {
      await expect(page).toMatch('Register')
      await expect(page).toFillForm('form[name="register"]', {
        username: username,
        email: email,
        dni: dni,
        password: password,
        confirmPassword: confirmPassword
      })
      await expect(page).toClick('button', { text: 'Accept' })
    });

    then('A confirmation message should be shown in the screen', async () => {
      await expect(page).toMatch('You have been registered in the system!')
    });
  })

  afterAll(async ()=>{
    browser.close()
  })

});

