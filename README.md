# Elephicon

**Elephicon**, a GUI wrapper for [png2icons](https://github.com/idesis-gmbh/png2icons), **generates [Apple ICNS](https://en.wikipedia.org/wiki/Apple_Icon_Image_format) and [Microsoft ICO](<https://en.wikipedia.org/wiki/ICO_(file_format)>) files from PNG files.**

[![GitHub CI](https://github.com/sprout2000/elephicon/actions/workflows/build.yml/badge.svg)](https://github.com/sprout2000/elephicon/actions/workflows/build.yml)
[![GitHub license](https://img.shields.io/github/license/sprout2000/elephicon)](https://github.com/sprout2000/elephicon/blob/master/LICENSE.md)
![GitHub package.json dynamic](https://img.shields.io/github/package-json/keywords/sprout2000/elephicon)

## :green_book: Usage

The ideal input is a 24-bit PNG file with _1024x1024_ pixels and an alpha channel, but any other dimensions and most other PNG formats will do work.

If you only need to create ICO files, _256×256_ pixels will be enough.

It's also possible to create icon files from non-quadratic source PNGs.

![animation](https://user-images.githubusercontent.com/52094761/139361597-e047b841-53e7-4a60-804a-60ab61124c38.gif)

## :rainbow: Embedded Sizes

| Dimension  | ICO | ICNS |
| :--------- | :-: | :--: |
| 16x16      | ✅  |  ✅  |
| 16x16@2x   |     |  ✅  |
| 24x24      | ✅  |      |
| 32x32      | ✅  |  ✅  |
| 32x32@2x   |     |  ✅  |
| 48x48      | ✅  |      |
| 64x64      | ✅  |      |
| 72x72      | ✅  |      |
| 96x96      | ✅  |      |
| 128x128    | ✅  |  ✅  |
| 128x128@2x |     |  ✅  |
| 256x256    | ✅  |  ✅  |
| 256x256@2x |     |  ✅  |
| 512x512    |     |  ✅  |
| 512x512@2x |     |  ✅  |

## :books: Supported Languages (App Menu)

| Language                           |  Code   |
| :--------------------------------- | :-----: |
| English :us: :uk: :earth_americas: |  `en`   |
| 日本語 :jp:                        |  `ja`   |
| Deutsch :de:                       |  `de`   |
| Русский :ru:                       |  `ru`   |
| Português :portugal: :brazil:      |  `pt`   |
| Italiano :it:                      |  `it`   |
| 简体中文 :cn:                      | `zh_CN` |
| Türkçe :tr:                        |  `tr`   |
| Malayalam :india:                  |  `ml`   |

## :closed_lock_with_key: Security

| API                        | Value   |
| :------------------------- | :------ |
| default-src (CSP)          | `self`  |
| nodeIntegration            | `false` |
| enableRemoteModule         | `false` |
| worldSafeExecuteJavaScript | `true`  |
| contextIsolation           | `true`  |
| safeDialogs                | `true`  |
| sandbox                    | `true`  |

## :gift: Download

### :computer: macOS (x64, arm64)

You can download the latest version of _Elephicon_ from the releases page here:  
[https://github.com/sprout2000/elephicon/releases](https://github.com/sprout2000/elephicon/releases)

### :computer: Windows10

Download the latest version for Windows10 at [Microsoft Store](https://www.microsoft.com/store/apps/9P1489W92ZDQ).

## :beers: Contribution

I need more locale files.  
When you have translated the menu into your language, could you please send me the locale file as a [pull request](https://github.com/sprout2000/elephicon/pulls)?

1. Create `{your_LANG}.json` in `src/locales`.
2. Then import the locale file into `src/lib/setLocales.ts` as follows:

```diff
  import en from './locales/en.json';
  import ja from './locales/ja.json';
+ import de from './locales/de.json';

 export const setLocales = (locale: string): void => {
   i18next.init({
     lng: locale,
     fallbackLng: 'en',
     resources: {
       en: { translation: en },
       ja: { translation: ja },
+      de: { translation: de },
     },
   });
 };
```

## :tada: Contributors

**Special Thanks to:**

- [@aerocyber](https://github.com/aerocyber) [#163](https://github.com/sprout2000/elephicon/pull/163)
- [@umitseyhan75](https://github.com/umitseyhan75) [#159](https://github.com/sprout2000/elephicon/pull/159)
- [@ArcherGu](https://github.com/ArcherGu) [#151](https://github.com/sprout2000/elephicon/pull/151)
- [@LightwithoutLisonlyight](https://github.com/LightwithoutLisonlyight) [#140](https://github.com/sprout2000/elephicon/pull/140)
- [@godrix](https://github.com/godrix) [#136](https://github.com/sprout2000/elephicon/pull/136)
- [@kitt3911](https://github.com/kitt3911) [#135](https://github.com/sprout2000/elephicon/pull/135)
- [@DrDeee](https://github.com/DrDeee) [#108](https://github.com/sprout2000/elephicon/pull/108)

## :vertical_traffic_light: Privacy Policy

- Elephicon and the developer do NOT collect any personal information or privacy-related information about the user.
- Elephicon and the developer do NOT collect the information of files opened by Elephicon.

## :copyright: License

### [png2icons](https://github.com/idesis-gmbh/png2icons)

MIT © [idesis GmbH](https://www.idesis.de), Rellinghauser Straße 334F, D-45136 Essen

### Elephicon

Copyright(c) 2020 sprout2000 and other contributors  
[MIT](https://github.com/sprout2000/elephicon/blob/master/LICENSE.md) Licensed
