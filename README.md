# homepage

a flexible dashboard enhanced by customizable keyboard shortcuts to quickly perform searches or open bookmarks

## key features

- widgets to display time and weather information in a customizable format
- bookmark widgets that respond to keyboard shortcuts
- fullscreen search with google, youtube, or duckduckgo

## installation

```shell
yarn install
```

## tools used

- [prettier](https://prettier.io/): an opinionated code formatter
- [eslint](https://eslint.org/): a pluggable linting utility for javascript
- [husky](https://github.com/typicode/husky): a git hooks manager for node.js
- [jest](https://jestjs.io/) + [testing-library](https://testing-library.com/): testing frameworks for javascript
- [storybook](https://storybook.js.org/): a development environment for UI components

## react scripts

### `yarn start`

runs the app in the development mode.\
open [http://localhost:3000](http://localhost:3000) to view it in your browser.

the page will reload when you make changes.\
you may also see any lint errors in the console.

### `yarn test`

launches the test runner in the interactive watch mode.\
see the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

builds the app for production to the `build` folder.\
it correctly bundles React in production mode and optimizes the build for the best performance.

the build is minified and the filenames include the hashes.\
your app is ready to be deployed!

see the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**note: this is a one-way operation. once you `eject`, you can't go back!**

if you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

instead, it will copy all the configuration files and the transitive dependencies (webpack, babel, eslint, etc) right into your project so you have full control over them. all of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. at this point you're on your own.

you don't have to ever use `eject`. the curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. however we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## npm scripts

- `start`: [see above](#react-scripts)
- `build`: [see above](#react-scripts)
- `test`: [see above](#react-scripts)
- `lint`: lints the code with eslint
- `format`: formats the code with prettier
- `deploy`: build and deploy to github pages
- `storybook`: run storybook instance

## husky hooks for git

- `pre-commit`: ensures [lint](#npm-scripts) and [unit tests](#yarn-test) run successfully before committing to git

## github actions

- `lint-and-test`: installs dependencies, runs eslint, and runs jest
