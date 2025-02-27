import { expect, test } from "@playwright/test";
import { PageManager } from "../page-objects/pageManager";
import { faker } from "@faker-js/faker"


test.beforeEach(async ({ page }) => {
    await page.goto('/')
})

test('open layout page', async ({ page }) => {
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await pm.navigateTo().datePickerPage()
    await pm.navigateTo().smartTeblePage()
    await pm.navigateTo().toastrPage()
    await pm.navigateTo().tooltipsPage()
})

test('Fill in all fields and click signIn button', async ({ page }) => {
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    const fullName = faker.person.fullName({sex: "female"})
    const email = `${fullName.replace(' ', '')}${faker.number.int({min: 100, max: 200})}@gmail.com`
    const password = faker.internet.password({length: 8, pattern: /[A-Z0-9!@#$%^&*()]/})
    await pm.onFormLayoutPage().fillInAndSignInToUsingTheGrid(email, password, 'Option 1')
})

test('Select date In Common Datepicker', async ({ page }) => {
    const pm = new PageManager(page)
    await pm.navigateTo().datePickerPage()
    const expectedText = await pm.onDatePickerPage().selectDateInCommonDatepicker(-50)

    await expect(pm.onDatePickerPage().commonPickerField).toHaveValue(expectedText)
})

test('Select date In Range Picker', async ({ page }) => {
    const pm = new PageManager(page)
    await pm.navigateTo().datePickerPage()
    const expectedText = await pm.onDatePickerPage().selectDateInRangePicker(-50, 100)

    await expect(pm.onDatePickerPage().rangePickerField).toHaveValue(expectedText)
})

