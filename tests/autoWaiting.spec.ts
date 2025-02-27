import {expect, test} from '@playwright/test'

test.beforeEach(async({page}) => {
    await page.goto(process.env.WAIT_URL)
    await page.getByText('Button Triggering AJAX Request').click()
})

test('auto wait', async ({page}) => {
    const message = page.locator('.bg-success')

    //await message.waitFor({state: 'attached'})
    //const text = await message.allTextContents()
    //expect(text).toContain('Data loaded with AJAX get request.')

    await expect(message).toHaveText('Data loaded with AJAX get request.', {timeout: 20000})
})