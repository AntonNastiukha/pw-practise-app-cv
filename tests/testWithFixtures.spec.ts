import { faker } from "@faker-js/faker";
import { test } from "../test-options";

test('Fill in all fields and click signIn button', async ({pageManager}) => {
    const fullName = faker.person.fullName({ sex: "female" })
    const email = `${fullName.replace(' ', '')}${faker.number.int({ min: 100, max: 200 })}@gmail.com`
    const password = faker.internet.password({ length: 8, pattern: /[A-Z0-9!@#$%^&*()]/ })

    await pageManager.onFormLayoutPage().fillInAndSignInToUsingTheGrid(email, password, 'Option 1')
})
