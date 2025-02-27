import { Page } from "@playwright/test";
import { DatePickerPage } from "./datePickerPage";
import { FormLayoutPage } from "./formLayoutPage";
import { NavigationPage } from "./navigationPage";

export class PageManager {
    private readonly page: Page
    private readonly datePickerPage: DatePickerPage
    private readonly formLayOutPage: FormLayoutPage
    private readonly navigationPage: NavigationPage

    constructor(page: Page) {
        this.page = page
        this.datePickerPage = new DatePickerPage(page)
        this.formLayOutPage = new FormLayoutPage(page)
        this.navigationPage = new NavigationPage(page)
    }

    navigateTo() {
        return this.navigationPage
    }

    onFormLayoutPage() {
        return this.formLayOutPage
    }

    onDatePickerPage() {
        return this.datePickerPage
    }
}