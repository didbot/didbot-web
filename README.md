# Didbot Web
A set of vue.js components for interacting with [didbot.com](https://didbot.com) or a self hosted [didbot](https://github.com/didbot/didbot) application.

## Installation

Install didbot-web using the node package manager

`npm install didbot-web --save`

Import the vue component and add our event bus
```
Vue.component(
    'didbot-web',
    require('didbot-web')
);

const didbotBus = new Vue()
Vue.prototype.$didbotBus = didbotBus
```

Generate an access token at either [didbot.com](https://didbot.com) or within your self hosted [didbot](https://github.com/didbot/didbot) application and add it to the javascript variable apiToken within the didbot namespace.
 
`didbot.apiToken=Bearer 123ABC...`
 
Import the stylesheet

`@import "./../../../node_modules/didbot-web/src/sass/did.scss";`

Add the component markup to your vue.js.

`<didbot-web></didbot-web>`

By default this package attempts to connect to the didbot.com API located at `https://didbot.com/api/1.0/`. If you wish to point the package to a self hosted didbot application set path in the javascript variable baseUrl within the didbot namespace.

`didbot.baseUrl=http://www.example.com/api/`