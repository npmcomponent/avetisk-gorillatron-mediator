# Mediator

Loosely coupled pub sub accross modules

## Installation

```
$ component install component/Mediator
```

## Usage

```js
var mediator = new Mediator()

mediator.subscribe( "chat", logChatEvent )
mediator.subscribe( "chat::message", displayMessage )

mediator.publush( "chat::message", "shaggy87", "lol dope" )

"chat" && "char::message", "will fire because of namespacing"

```

## License 

MIT licensed