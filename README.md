# Pressboard

A utility for taking screenshots of a web application using [Puppeteer](https://github.com/puppeteer/puppeteer)

## Installing `pressboard`

### As a local `npm run` script

Install and add to `devDependencies`:

```
npm i --save-dev pressboard
```

Add an [`npm run` script](https://docs.npmjs.com/cli/run-script) to your `package.json`:

```json
{
  "scripts": {
    "press": "pressboard"
  }
}
```

Now you can use `npm run press` in place of `npm version`.

This has the benefit of making your repo/package more portable, so that other developers can cut releases without having to globally install `pressboard` on their machine.

### As global `bin`

Install globally (add to your `PATH`):

```
npm i -g pressboard
```

Now you can use `pressboard` in place of `npm version`.

This has the benefit of allowing you to use `pressboard` on any repo/package without adding a dev dependency to each one.

### Using `npx`

As of `npm@5.2.0`, `npx` is installed alongside `npm`. Using `npx` you can use `pressboard` without having to keep a `package.json` file by running: `npx pressboard`.

This method is especially useful when using `pressboard` in non-JavaScript projects.

## CLI Usage

### Configuration

In your folder create a file named `pressboard.conf.json` in your workspace. This file will specify the configuration for getting the screenshots for the documentation.

The following properties, at the top level of the file, configure the workspace.

* `url`: The base URL for the routes that you want to hit
* `routes`: Configuration of each of the route that you want to capture
  * `name` (Optional): Name of the image that is created (defaults to path)
  * `path`: Path to be captured within the route
  * `url` (Optional): Overwrites the URL of the config
  * `params`: Params to be passed into the path
  * `selector`: Waits for the [selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) before taking screenshot
  * `igconito`: Launch the [browser](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#class-browser) directly into incognito mode by passing the [--incognito](https://peter.sh/experiments/chromium-command-line-switches/#incognito) flag to [puppeteer.launch()](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#puppeteerlaunchoptions)

```json
{
  "url": "https://www.google.ca",
  "routes": [
    {
      "name": "search",
      "path": "/search?q=:id",
      "params": {
        "id": "dogs"
      },
      "selector": "#search"
    }
  ]
}
```

### Generate Docs

To generate your screenshots for your application, simply do:

```sh
# npm run script
npm run press
# global bin
pressboard
# npx
npx pressboard
```

This will create a `docs/README.md` with screenshots of the routes specified in the `pressboard.conf.json`.