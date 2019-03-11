# IOTAcooler-Smidgen Deployment

## As Single Executable

The following steps describe how to compile smidgen into a single binary file for Windows, macOS and Linux

1. install **`nodejs`** and **`npm`**
2. install **`pkg`** with `npm install -g pkg`
3. **`cd`** into the `source` directory
4. install missing local npm dependencies with `npm install`
5. create executables with `pkg .` Example: `pkg . --targets latest-linux,latest-macos,latest-win-x86 -o iotacooler-smidgen` In case of errors stick to known working nodejs versions, for example `node10-linux`.
6. see [targets](https://www.npmjs.com/package/pkg#targets) for arch specific requirements

## Pre-compiled Binaries

Alternatively, precompiled-binaries are available at the [releases](https://github.com/joshirio/iota-cooler-smidgen/releases) page.
