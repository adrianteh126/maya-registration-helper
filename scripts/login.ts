import { type Page } from 'playwright'
// import path from 'path'

// Environment variables
const EMAIL: string = process.env.EMAIL!
const PASSWORD: string = process.env.PASSWORD!

export default async function (page: Page) {
  try {
    // Nav to Maya portal
    await page.goto('https://maya.um.edu.my/sitsvision/wrd/siw_lgn', {
      waitUntil: 'domcontentloaded'
    })

    // Login with provided credential
    await page.getByLabel('Username').click()
    await page.getByLabel('Username').fill(EMAIL)
    await page.getByLabel('Password').click()
    await page.getByLabel('Password').fill(PASSWORD)
    await page.getByRole('button', { name: 'Log In' }).click()

    // Nav to dashboard then save storage state
    await page
      .getByRole('heading', { name: 'My Dashboard' })
      .waitFor({ state: 'visible' })

    console.log(`🔐 Login with ID: ${EMAIL}`)
  } catch (error) {
    throw Error(`Error@auth: \n${error}`)
  }
}
