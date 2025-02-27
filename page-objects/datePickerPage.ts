import { Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class DatePickerPage extends HelperBase {

    readonly commonPickerField: Locator
    readonly rangePickerField: Locator

    constructor(page: Page) {
        super(page)
        this.commonPickerField = this.page.getByPlaceholder('Form Picker')
        this.rangePickerField = this.page.getByPlaceholder('Range Picker')
    }

    async selectDateInCommonDatepicker(dateDifferen: number) {
        await this.commonPickerField.click()
        return this.selectDateInPicker(dateDifferen)
    }

    async selectDateInRangePicker(dateDifferenStart: number, dateDifferenFinish: number) {
        await this.rangePickerField.click()
        const startDateText = await this.selectDateInPicker(dateDifferenStart)
        const finishDateText = await this.selectDateInPicker(dateDifferenFinish)
        return `${startDateText} - ${finishDateText}`
    }

    private async selectDateInPicker(dateDifferen: number) {
        let todayDate = new Date()
        let date = new Date()
        date.setDate(date.getDate() + dateDifferen)
        const isDateAfterToday = todayDate < date
        const expectedDate = date.getDate().toString()
        const expectedMonthLong = date.toLocaleDateString('En-US', { month: 'long' })
        const expectedMonthShort = date.toLocaleDateString('En-US', { month: 'short' })
        const expectedFullYear = date.getFullYear()
        const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedFullYear}`
        const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedFullYear}`

        let calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()

        while (!calendarMonthAndYear.includes(expectedMonthAndYear)) {
            if (isDateAfterToday) {
                await this.page.locator('nb-calendar-pageable-navigation .next-month').click()
            }
            else {
                await this.page.locator('nb-calendar-pageable-navigation .prev-month').click()
            }

            calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()

        }

        await this.page.locator('.day-cell:not(.bounding-month)')
            .getByText(expectedDate, { exact: true }).click()

        return dateToAssert
    }
}