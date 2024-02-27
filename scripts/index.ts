import login from './login'
import queue from './queue'
import selectModule from './selectModule'

import { chromium, type LaunchOptions } from 'playwright'

// TODO: Perform checking on configuration(.env & registration.json)
// .env -> check availability of value
// registration.json -> check not empty && dictionary?

// Configurations
const launchOptions: LaunchOptions = {
  headless: false
}

;(async () => {
  // Initialize fixtures
  const browser = await chromium.launch(launchOptions)
  const context = await browser.newContext()
  const page = await context.newPage()
  // Page settings
  page.setDefaultTimeout(1000 * 60 * 5) // 5 minutess timeout

  // Script start
  try {
    await login(page)
    await queue(page)
    await selectModule(page)
  } catch (error) {
    console.error(error)
  }

  // Close up
  // await page.close()
  // await context.close()
  // await browser.close()
})()
