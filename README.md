# IE307-FRONT-END | Công nghệ lập trình đa nền tảng cho ứng dụng di động

## About The Project

This is APP build by REACT-NATIVE for project of IE307.

### Built With

- [Bun][bun-url]
- [React Native][rn-url]
- [Expo][expo-url]
- [Tailwind][tailwind-url] (style)
- [Recoil][recoil-url] (State management)

## Prerequires

- Bun version >= v1.0.x

```bash
curl -fsSL https://bun.sh/install | bash
```

## Getting Started

### Installation

1. Clone the repo

```bash
git clone git@github.com:QuangPhamvt/ie307-front-end.git
```

2. Install yarn packages

- We use Bun for Javascript runtime

```bash
$ cd ./ie104-front-end
$ bun install
```

3. Config environment

- Setup Client
  > file .env in folder client

```
DATABASE_URL="..." #connect to database
```

- Husky setup

```bash
bun prepare
```

### Usage

- Run Client

```bash
$ cd ./ie307-front-end
$ bun start
```

## Information

### Client

- Feature
- Package using

```
  "dependencies": {
    "@elysiajs/jwt": "^0.7.0",
    "@elysiajs/swagger": "^0.7.3",
    "@planetscale/database": "^1.11.0",
    "dotenv": "^16.3.1",
    "drizzle-orm": "^0.28.6",
    "elysia": "latest",
    "mysql2": "^3.6.2"
  },
  "devDependencies": {
    "@commitlint/cli": "^17.8.0",
    "@commitlint/config-conventional": "^17.8.0",
    "bun-types": "latest",
    "drizzle-kit": "^0.19.13",
    "husky": "^8.0.0",
    "lint-staged": "^15.0.1",
    "prettier": "3.0.3"
  },
```

### Technology

## Link Demo

link:

## How to push

- Role commit
  `{type}: {subject}`
  - type: build | chore | ci | docs | feat | fix | perf | refactor | revert | style | test
  - subject: 'Write a short, imperative tense description of the change'
- Automatic: check lint and format pre-commit

- Example:

```bash
git commit -m "{type}: {subject}"
```

Description
|**Types**| **Description** |
|:---| :--- |
|feat| A new feature|
|fix| A bug fix|
|docs| Documentation only changes|
|style| Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc) |
|refactor| A code change that neither fixes a bug nor adds a feature |
|perf| A code change that improves performance |
|test| Adding missing tests or correcting existing tests |
|build| Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm) |
|ci| 'Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs) |
|chore| Other changes that don't modify src or test files |
|revert| Reverts a previous commit |

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[bun-url]: https://bun.sh/
[rn-url]: https://reactnative.dev/
[expo-url]: https://docs.expo.dev/
[react-navigation-url]: https://reactnavigation.org/
[recoil-url]: https://recoiljs.org/
[tailwind-url]: https://tailwindcss.com/
