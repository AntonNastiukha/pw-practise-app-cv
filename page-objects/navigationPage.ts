import { Page } from '@playwright/test'
import { HelperBase } from './helperBase'

export class NavigationPage extends HelperBase {

    constructor(page: Page) {
        super(page)
    }

    async formLayoutsPage() {
        await this.expandNavigatioMenuItemByName('Forms')
        await this.page.getByText('Form Layouts').click()
    }

    async datePickerPage() {
        await this.expandNavigatioMenuItemByName('Forms')
        await this.page.getByText('Datepicker').click()
    }

    async smartTeblePage() {
        await this.expandNavigatioMenuItemByName('Tables & Data')
        await this.page.getByText('Smart Table').click()
    }

    async tooltipsPage() {
        await this.expandNavigatioMenuItemByName('Modal & Overlays')
        await this.page.getByText('Tooltip').click()
    }

    async toastrPage() {
        await this.expandNavigatioMenuItemByName('Modal & Overlays')
        await this.page.getByText('Toastr').click()
    }

    private async expandNavigatioMenuItemByName(itemName: string) {
        const item = this.page.getByTitle(itemName)
        const isItemExpanded = await item.getAttribute('aria-expanded')
        if (isItemExpanded == 'false') {
            await item.click()
        }
    }
}