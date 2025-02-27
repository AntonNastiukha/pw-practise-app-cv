import {expect, test} from '@playwright/test';

test.beforeEach(async({page}) => {
   await page.goto('/')
   await page.getByText('Forms').click()
   await page.getByText('Form Layouts').click()
})

test('Locator syntax rules', async ({page}) => {
await page.locator("input[placeholder='Jane Doe']").first().click()
})

test('User facing locator', async ({page}) => {
   await page.getByRole('textbox', {name:'Email'}).first().click()

   await page.getByTestId('My signin Button locator').click()
})

test('Locating child element', async({page}) => {
   await page.locator('nb-card nb-radio :text-is("Option 1")').click()
   await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()
   await page.locator('nb-card').getByRole('textbox', {name:'Email'}).first().click()
   await page.locator('nb-card').getByRole('button', {name:'Sign in'}).first().click()
   await page.locator('nb-card').nth(1).getByRole('button').nth(0).click()
   // await page.locator('nb-card').nth(1).getByRole('radio').last().setChecked(true)
})

test('Locating parrent element', async ({page}) => {
   await page.locator("nb-card", {hasText: 'Using the Grid'}).getByRole('textbox', {name:'Email'}).click()
   var locator = page.locator(':text("Basic form")')
   //await page.locator("nb-card", {has:locator}).getByRole('textbox', {name:'Email'}).click()
   await page.locator("nb-card").filter({has: locator}).getByRole('textbox', {name:'Email'}).click()
})

test('fill in all fields', async({page})=> {
   const secondBoxLocator = page.locator('nb-card').nth(1)
   const secondBoxEmailField = secondBoxLocator.getByRole('textbox',{name: 'Email'})
   const secondBoxPasswordField = secondBoxLocator.getByRole('textbox', {name: 'Password'})
   const secondBoxOptionOne = secondBoxLocator.locator(':text-is("Option 1")')
   const secondBoxOptionTwo = secondBoxLocator.locator(':text-is("Option 2")')
   const secondBoxSignInButton = secondBoxLocator.getByRole('button')

   await secondBoxEmailField.fill("test@gmail.com")
   await secondBoxPasswordField.fill("12345")
   await secondBoxOptionOne.setChecked(true)
   await secondBoxOptionTwo.setChecked(true)
   await secondBoxSignInButton.click()

   await expect(secondBoxEmailField).toHaveValue('test@gmail.com')   
})

test('get values', async({page})=> {
   const secondBoxLocator = page.locator('nb-card').nth(1)
   const secondBoxEmailField = secondBoxLocator.getByRole('textbox',{name: 'Email'})
   const secondBoxPasswordField = secondBoxLocator.getByRole('textbox', {name: 'Password'})
   const secondBoxOptionOne = secondBoxLocator.locator(':text-is("Option 1")')
   const secondBoxOptionTwo = secondBoxLocator.locator(':text-is("Option 2")')
   const secondBoxSignInButton = secondBoxLocator.getByRole('button')

   const buttonText = await secondBoxSignInButton.textContent()
   expect(buttonText).toEqual("Sign in")

   const allRadioLables = await secondBoxLocator.locator('nb-radio').allTextContents()
   expect(allRadioLables).toContain('Option 1')

   await secondBoxEmailField.fill("test@gmail.com")
   const emailValue = await secondBoxEmailField.inputValue()
   expect(emailValue).toEqual('test@gmail.com')
   
   const placeholderValue = await secondBoxEmailField.getAttribute('placeholder')
   expect.soft(placeholderValue).toEqual('Email')
})