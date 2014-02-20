*This repository is a mirror of the [component](http://component.io) module [avetisk/gorillatron-mediator](http://github.com/avetisk/gorillatron-mediator). It has been modified to work with NPM+Browserify. You can install it using the command `npm install npmcomponent/avetisk-gorillatron-mediator`. Please do not open issues or send pull requests against this repo. If you have issues with this repo, report it to [npmcomponent](https://github.com/airportyh/npmcomponent).*
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

// 'chat' and 'chat::message' will fire because of namespacing
mediator.publish( "chat::message", "shaggy87", "lol dope" )

```

### Api

#### Mediator.prototype.subscribe( channel, callback, context )

Subscribe to the given channel/namespace. Call the given callback with the given context as 'this'
when that channels is published to.

#### Mediator.prototype.unsubscribe( channel, callback )

Unsubscribe from channel. If only channel is given all callbacks that match the channels namspace will be 
removed. If callback is given it will only remove subscriptions that has that specific callback

#### Mediator.prototype.publish( channel, args.. )

Publishes to the channel, calling all subscribing callbacks with the rest of the arguments as arguments
to the calback function[s].


## License 

MIT licensed