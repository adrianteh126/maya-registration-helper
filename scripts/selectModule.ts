import type { Page, Response, ElementHandle } from 'playwright'
import courses from '../registration.json'
import { RunProcessResponse } from './typing'

export default async function (page: Page) {
  try {
    // TODO: perform checking on successfully enter module registration page before adding

    const addedOcc = []

    // Start adding courses from occ list
    for (const [key, value] of Object.entries(courses)) {
      console.log(`\n💡 Attempt to add ${key} with occurences ${value.occ} ...`)

      // View current module
      const viewModule = await handleViewModule(page, key)
      if (!viewModule) continue

      // Add occ current module
      const addModule = await handleAddModule(page, key, value.occ)
      if (!addModule) continue

      addedOcc.push(`${key}[${value.occ}]`)
    }

    // Summarize for registered courses
    console.log(`\n🎊 Registered courses: `)
    addedOcc.forEach((occ) => {
      console.log(`\t🌟 ${occ}`)
    })
  } catch (error) {
    throw Error(`Error@selectModule: \n${error}`)
  }
}

async function handleViewModule(page: Page, moduleCode: string) {
  await page.waitForLoadState('networkidle', { timeout: 1000 * 60 * 15 }) // 15 mins

  // Enter module code and search
  await page.getByLabel('Module', { exact: true }).fill(moduleCode)
  await page.getByRole('button', { name: 'Search Module' }).click()
  await page.getByRole('button', { name: 'View', exact: true }).nth(0).click()

  await page.waitForSelector(
    'body > div.ui-dialog.ui-corner-all.ui-widget.ui-widget-content.ui-front.ui-dialog-buttons.ui-draggable > div.ui-dialog-titlebar.ui-corner-all.ui-widget-header.ui-helper-clearfix.ui-draggable-handle > span'
  )

  const available = await page
    .$(
      'body > div.ui-dialog.ui-corner-all.ui-widget.ui-widget-content.ui-front.ui-dialog-buttons.ui-draggable > div.ui-dialog-titlebar.ui-corner-all.ui-widget-header.ui-helper-clearfix.ui-draggable-handle > span'
    )
    .then((e) => e?.innerHTML())
    .then((title) => title === 'Module Available')

  await page.getByRole('button', { name: 'OK', exact: true }).click()

  console.log(
    available
      ? `✅ ${moduleCode} is available in the moment`
      : `❎ ${moduleCode} is not available in the moment`
  )

  return available
}

async function handleAddModule(
  page: Page,
  moduleCode: string,
  occList: string[]
) {
  // Iterate through desire occ in list
  for (let i = 0; i < occList.length; i++) {
    // find match occ using selector
    const row = await page.waitForSelector(
      `tbody > tr:has(td:nth-child(1):text-is("${moduleCode}")):has(td:nth-child(4):text-is("${occList[i]}"))`,
      { timeout: 1000 * 60 * 0.5 }
    )
    await page.$(
      `tbody > tr:has(td:nth-child(1):text-is("${moduleCode}")):has(td:nth-child(4):text-is("${occList[i]}"))`
    )

    const addModulePromise = page.waitForResponse(
      (response) =>
        response.url() ===
          'https://maya.um.edu.my/sitsvision/wrd/SIW_SME_B.run_process' &&
        response.ok(),
      { timeout: 1000 * 60 * 15 } // 15 minutes
    )

    const button = await row?.$('button')
    if (button) await button.click()

    const responseData: RunProcessResponse = await addModulePromise.then(
      async (res) => {
        return jsonParser(res)
      }
    )

    const available = responseData.processResults.selectIsValid === 'Y'

    if (available) {
      console.log(
        `🎉 Added ${moduleCode}[${occList[i]}] to the selected modules`
      )
      return true // exit loop after successfully added
    }
    console.log(
      `🛑 Failed to add ${moduleCode}[${occList[i]}] to the selected modules`
    )
  }

  return false
}

// Process 'text/html;charset=UTF-8' type body to json
async function jsonParser(response: Response) {
  const rawResponse = await response.text()
  const jsonResStartIndex = rawResponse.indexOf('{')
  const jsonData = JSON.parse(
    rawResponse.substring(jsonResStartIndex).replace(/"":"",/g, '')
  )
  return jsonData
}
