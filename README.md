# Angular build fails if external library imports assets in CSS files

If user imports a CSS file that includes an asset `url()`, such asset is resolved correctly.

But, if such CSS file is imported by an external library, the asset is resolved automatically only in serve mode.

During build, the asset is not resolved:

```sh
Application bundle generation failed. [2.091 seconds]

✘ [ERROR] No loader is configured for ".woff2" files: ../node_modules/external-library/NotoSans.woff2

    ../node_modules/external-library/styles.css:3:11:
      3 │   src: url("./NotoSans.woff2") format("woff2");
```

For build, the user needs to manually configure the ESBuild loader for each asset type:

```sh
  "loader": {
    ".woff2": "file"
  },
```

## Reproduction

1. Clone this repo

   ```sh
   git clone https://github.com/maxpatiiuk/angular-no-external-asset-loader
   cd angular-no-external-asset-loader
   ```

2. Install dependencies

   ```sh
   # To keep reproduction size minimal, I hardcoded a minimal root-level node_modules
   # So, install Angular dependencies only in the app folder:
   cd app
   npm install
   ```

3. Build the app

   ```sh
   npx ng build
   ```

4. Start the development server in the app folder

   ```sh
   npx ng serve
   ```

   See that the font is loaded correctly without errors.

See node_modules/external-library/ for the dummy external library with a CSS
file.

## Extra details

From my understanding, this is the ESBuild plugin Angular provides for resolving assets in CSS files:

https://github.com/angular/angular-cli/blob/cc05242aa8354f3280b5a70eb1f9c0e9d85f1408/packages/angular/build/src/tools/esbuild/stylesheets/css-resource-plugin.ts#L22-L30

I am not sure why it is not applied to CSS files imported from external libraries.
