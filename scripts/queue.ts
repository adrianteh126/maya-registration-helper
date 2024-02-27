import { type Page } from 'playwright'

export default async function (page: Page) {
  try {
    // Page timeout setting
    page.setDefaultTimeout(1000 * 60 * 15) // 15 minutes

    // TOOD: Multiple attempts when failed to queue until module registration
    // TODO: adding trycatch or some verification code to confirm successful landing on module registration page

    // Nav to enrol tab from home page
    await page.getByRole('link', { name: 'Enrolment' }).click()
    await page
      .getByRole('heading', { name: 'Enrolment', exact: true })
      .waitFor({ state: 'visible' })

    // Nav to module registration dashboard
    await page.getByRole('link', { name: 'Enrol', exact: true }).click()
    await page
      .getByRole('heading', { name: 'Module Registration Dashboard' })
      .waitFor({ state: 'visible' })

    // Nav to module selection page
    await page.getByRole('link', { name: 'Register Module' }).click()
    await page
      .getByRole('heading', { name: 'Module Search' })
      .waitFor({ state: 'visible' })

    console.log(`✨ Enter module selection page successfully`)
  } catch (error) {
    throw Error(`Error@queue: \n${error}`)
  }
}
