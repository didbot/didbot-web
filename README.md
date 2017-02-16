# Didbot Web
A set of vue.js components for interacting with [didbot.com](https://didbot.com) or a self hosted [didbot](https://github.com/didbot/didbot) application.

## Module Installation

Install didbot-web using the node package manager

`npm install didbot-web --save`

Import the vue component and add an event bus
```js
const didbotBus = new Vue()
Vue.prototype.$didbotBus = didbotBus

Vue.component('didbot-web',require('didbot-web'));
```

Generate an access token at either [didbot.com](https://didbot.com) or within your self hosted [didbot](https://github.com/didbot/didbot) application and add it to the javascript variable apiToken within the didbot namespace.
 
`didbot.apiToken=Bearer 123ABC...`

By default this package attempts to connect to the didbot.com API located at `https://didbot.com/api/1.0/`. If you wish to point the package to a self hosted didbot application set path in the javascript variable baseUrl within the didbot namespace.

`didbot.baseUrl=http://www.example.com/api/`

Add the component markup to the desired location inside your vue.js app.

```html
<didbot-web></didbot-web>
```

## Development Notes

### Setup
Install dependencies

`npm install`

Create the config/didbot.js file

`cp config/didbot.example.js config/didbot.js`

Set the apiToken and baseUrl properties

```js
//config.didbot.js
window.didbot = {
    apiToken: 'YOUR_API_TOKEN',
    baseUrl: 'https://didbot.com/api/1.0/'
}
```

### Available Commands
```bash
# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
