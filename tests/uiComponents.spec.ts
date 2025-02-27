import test, { Page,expect } from "@playwright/test";

test.beforeEach(async ({page}) => {
    page.goto('/')
})

test.describe('Forms layouts page', () => {
    test.describe.configure({retries:0})
    test.beforeEach(async ({page}) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

    test('Input fields', async({page}, testInfo) => {
        if(testInfo.retry) {
            // do something
        }
        const usingTheGridEmailInput  = page.locator('nb-card', {hasText: 'Using The Grid'})
                                            .getByRole('textbox', {name: 'Email'})
        await usingTheGridEmailInput.fill('myEmail@gmail.com')
        await usingTheGridEmailInput.clear() 
        await usingTheGridEmailInput.pressSequentially('mySecondEmail@test.com', {delay: 300})

        const text = await usingTheGridEmailInput.inputValue()
        expect(text).toEqual('mySecondEmail@test.com')

        await expect(usingTheGridEmailInput).toHaveValue('mySecondEmail@test.com')
    }) 

    test.only('radio buttos', async({page}) => {
        const usingTheGridBox  = page.locator('nb-card', {hasText: 'Using The Grid'})

        const radioOne = usingTheGridBox.getByRole('radio', {name: 'Option 1'})
        await radioOne.check({force: true})
        expect(await radioOne.isChecked()).toBeTruthy()
        await expect(usingTheGridBox).toHaveScreenshot()


        const radioTwo = usingTheGridBox.getByLabel('Option 2')
        await radioTwo.check({force: true})
        expect(await radioTwo.isChecked()).toBeTruthy()
        expect(await radioOne.isChecked()).toBeFalsy()
        await expect(radioTwo).toBeChecked()
        await expect(radioOne).not.toBeChecked()
    })
})

test('ceckboxes', async({page}) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Toastr').click()

    const firstCheckbox =  page.getByRole('checkbox', {name: 'Hide on click'})
    const secondCheckbox =  page.getByRole('checkbox', {name: 'Prevent arising of duplicate toast'})
    await firstCheckbox.check({force: true})
    await secondCheckbox.uncheck({force: true})

    const allCheckboxes = page.getByRole('checkbox')

    for(const box of await allCheckboxes.all()){
        await box.check({force: true})
        expect(await box.isChecked()).toBeTruthy()
    }

    for(const box of await allCheckboxes.all()){
        await box.uncheck({force: true})
        expect(await box.isChecked()).toBeFalsy()
    }
})

test('Lists and dropdowns', async ({page}) => {
    const dropdown = page.locator('ngx-header nb-select') 
    await dropdown.click()

    const optionList = page.locator('nb-option-list nb-option')
    await expect(optionList).toHaveText(['Light', 'Dark', 'Cosmic', 'Corporate']) 
    await expect(optionList).toContainText(['Light', 'Cosmic', 'Corporate']) 

    await optionList.filter({hasText: 'Cosmic'}).click()

    const header = page.locator('nb-layout-header')
    await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')

    const colors = {
        "Light": "rgb(255, 255, 255)",
        "Dark": "rgb(34, 43, 69)",
        "Cosmic": "rgb(50, 50, 89)",
        "Corporate": "rgb(255, 255, 255)"
    }

    for(const color in colors){
        await dropdown.click()
        await optionList.filter({hasText: color}).click()
        await expect(header).toHaveCSS('background-color', colors[color])
    }
})

test('tooltip', async({page}) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Tooltip').click()

    const tooltipBox = page.locator('nb-card', {hasText: 'Tooltip Placements'})
    tooltipBox.getByRole('button', {name: 'Top'}).hover()

    const tooltipText = await page.locator('nb-tooltip').textContent()
    expect(tooltipText).toEqual('This is a tooltip')
})

test('dialog box', async({page}) => {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    page.on('dialog', dialog => {
        expect(dialog.message()).toEqual('Are you sure you want to delete?')
        dialog.accept()
    })

    await page.getByRole('table').locator('tr', {hasText: 'mdo@gmail.com'}).locator('.nb-trash').click()
    await expect(page.locator('table tr').first()).not.toHaveText('mdo@gmail.com')
    await page.getByRole('table').locator('tr', {hasText: 'fat@yandex.ru'}).locator('.nb-trash').click()
    await expect(page.locator('table tr').first()).not.toHaveText('fat@yandex.ru')
})

test('web tebles', async({page}) => {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    const tableRow = page.getByRole('row', {name: 'mdo@gmail.com'})
    await tableRow.locator('.nb-edit').click()
    await page.locator('input-editor').getByPlaceholder('Age').clear()
    await page.locator('input-editor').getByPlaceholder('Age').fill('35')
    await page.locator('.nb-checkmark').click()

    await page.locator('.ng2-smart-page-link').getByText('>').click()
    const targetRowById = page.getByRole('row').filter({has: page.locator('td').nth(1).getByText('11')})
    await targetRowById.locator('.nb-edit').click()
    await page.locator('input-editor').getByPlaceholder('Age').clear()
    await page.locator('input-editor').getByPlaceholder('Age').fill('35')
    await page.locator('.nb-checkmark').click()
    await expect(targetRowById.locator('td').nth(6)).toHaveText('35')


    const ages = ['20', '30', '40', '200']
    for(let age of ages) {
        await page.locator('input-filter').getByPlaceholder('Age').clear()
        await page.locator('input-filter').getByPlaceholder('Age').fill(age)
        await page.waitForTimeout(500)
        const ageRows = page.locator('tbody tr')

        for(let row of await ageRows.all()) {
            const cellValue = await row.locator('td').last().textContent()
            if(age == '200') {
                expect(await page.getByRole('table').textContent()).toContain('No data found')
            } else {
                expect(cellValue).toEqual(age)
            }
        }
    }
})

test('date picker', async ({page}) => {
    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()


    let todayDate = new Date()
    let date = new Date()
    date.setDate(date.getDate() + 100)
    const isDateAfterToday = todayDate < date
    console.log(date)

    const expectedDate = date.getDate().toString()
    const expectedMonthLong = date.toLocaleDateString('En-US', {month: 'long'})
    const expectedMonthShort = date.toLocaleDateString('En-US', {month: 'short'})
    const expectedFullYear = date.getFullYear()

    const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedFullYear}`
    const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedFullYear}`

    const datePickerField = page.getByPlaceholder('Form Picker')
    await datePickerField.click()

    let calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
    
    while(!calendarMonthAndYear.includes(expectedMonthAndYear)) {
        if(isDateAfterToday) {
            await page.locator('nb-calendar-pageable-navigation .next-month').click()
        }
        else {
            await page.locator('nb-calendar-pageable-navigation .prev-month').click()
        }
        
        calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
    }
    

    await page.locator('[class^="today"],[class="day-cell ng-star-inserted"]')
                .getByText(expectedDate, {exact: true}).click()

    await expect(datePickerField).toHaveValue(dateToAssert)

})

test('slider element', async({page}) => {
    const tempSlider = page.locator('[tabtitle="Temperature"] circle')
    await tempSlider.evaluate(node => {
        node.setAttribute('cx', '232.630')
        //node.setAttribute('cy', '232.630')
    })

    await tempSlider.click()


    const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
    await tempBox.scrollIntoViewIfNeeded()

    const box = await tempBox.boundingBox()
    const x = box.x + box.width/2
    const y = box.y + box.height/2

    await page.mouse.move(x, y)
    await page.mouse.down()
    await page.mouse.move(x + 100, y)
    await page.mouse.move(x + 100, y + 100)
    await page.mouse.up()

    await expect(tempBox).toContainText('30')

})


