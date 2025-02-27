import { Locator, Page } from '@playwright/test'
import { HelperBase } from './helperBase'

export class FormLayoutPage extends HelperBase {

    private readonly usingTheGridBox: Locator
    private readonly usingTheGridBoxEmailField: Locator
    private readonly usingTheGridBoxPasswordField: Locator
    private readonly usingTheGridBoxSignInButton: Locator


    constructor(page: Page) {
        super(page)
        this.usingTheGridBox = this.page.locator('nb-card', { hasText: 'Using The Grid' })
        this.usingTheGridBoxEmailField = this.usingTheGridBox.getByRole('textbox', { name: 'Email' })
        this.usingTheGridBoxPasswordField = this.usingTheGridBox.getByRole('textbox', { name: 'Password' })
        this.usingTheGridBoxSignInButton = this.usingTheGridBox.getByRole('button')
    }

    async fillInAndSignInToUsingTheGrid(email: string, password: string, optionText: string) {
        await this.usingTheGridBoxEmailField.fill(email)
        await this.page.waitForTimeout(500)
        await this.page.screenshot({ path: 'screenshots/firstOne.png' })
        await this.page.waitForTimeout(500)
        await this.usingTheGridBoxPasswordField.fill(password)
        await this.page.screenshot({ path: 'screenshots/secondOne.png' })
        await this.usingTheGridBoxPasswordField.screenshot({ path: 'screenshots/locatorScreenshot.png' })
        await this.usingTheGridBox.getByRole('radio', { name: optionText }).check({ force: true })
        await this.usingTheGridBoxSignInButton.click()
    }
}