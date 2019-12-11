const fs = require('fs')
const puppeteer = require('puppeteer');

module.exports = async () => {
  try {
    let dir = './docs'
    let content = []
    let config = {}
    let configPath = './pressboard.conf.json'
    config = await new Promise((resolve) => {
      fs.readFile(configPath, 'utf8', (err, data) => {
        if (err) throw err
        resolve(JSON.parse(data))
      });
    })

    if (!config.routes) {
      throw new Error(`👎 Must have routes in config.`)
    }
    if (!config.url) {
      throw new Error(`👎 Must have routes in config.`)
    }
    await Promise.all(config.routes.map(async (route, index) => {
      let args = []
      if(!!route.igconito) { args.push('--incognito') }
      let browser = await puppeteer.launch({headless: true, args, defaultViewport: {width: 1920, height: 1080} });
      let page = await browser.newPage();
      let baseUrl = route.url || config.url
      if (route.params && typeof route.params === 'object') {
        Object.keys(route.params).forEach((key) => route.path = route.path.replace(`:${key}`, route.params[key]))
      }
      let name = route.name || route.path.replace(/[\W_]+/g, "-")
      try {
        await page.goto(`${baseUrl}${route.path}`);
        if(!!route.selector) await page.waitForSelector(route.selector)
        if (!fs.existsSync(dir)){ fs.mkdirSync(dir); }
        if (!fs.existsSync(dir + '/imgs')){ fs.mkdirSync(dir + '/imgs'); }
        await page.screenshot({path: `./docs/imgs/${name}.png`});
        let title = await page.title()
        await browser.close();
        content.push({
          index,
          title,
          path: `./imgs/${name}.png`
        })
      } catch (e) {
        console.log(`👎 Failed to load "${baseUrl}${route.path}"`)
      }
    }))
    if (!fs.existsSync(dir)){ fs.mkdirSync(dir); }
    fs.writeFileSync(
      dir + "/README.md",
      content.sort((a,b) => a.index - b.index)
             .map((c) => `# ${c.title} \n ![${c.title}](${c.path})`).join('\n\n')
    )
    console.log('🎉 Successfully added documentation')
    process.exit()
  } catch (e) {
    console.trace(e)
    console.error(e)
    process.exit(1)
  }
}