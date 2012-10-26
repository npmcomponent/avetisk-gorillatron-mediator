

function Mediator( config ) {
  this.channels = {}
  this.configuration = Mediator.configuration
}

Mediator.configuration = {
  namespaceDelimiter: "::"
}

Mediator.prototype.subscribe = function( channel, callback, context ) {
  if( typeof channel !== 'string' ) 
    throw new TypeError( 'channel must be string' ) 
  if( typeof callback !== 'function' )
    throw new TypeError( 'callback must be function' ) 

  if( !this.channels[channel] )
    this.channels[ channel ] = [ ]

  this.channels[ channel ].push({
    callback: callback,
    context: context
  })
}

Mediator.prototype.unsubscribe = function( channel, callback ) {
  var subscribingChannel, subscriptions, i, subscription

  for( subscribingChannel in this.channels ) {
    if( !this.namespaceMatch(subscribingChannel, channel) )
      continue

    if( !callback ) {
      delete this.channels[ subscribingChannel ]
      continue
    }

    subscriptions = this.channels[ subscribingChannel ]

    for( i = 0; i < subscriptions.length; i++ ) {
      subscription = subscriptions[ i ]
      if( subscription.callback === callback ) {
        subscriptions.splice( i, 1 )
        i--
      }
    }

  }
}

Mediator.prototype.publish = function( channel, callback ) {
  var subscriptions, args, subscribingChannel, i, subscription

  subscriptions = []

  for( subscribingChannel in this.channels ) {
    if( this.namespaceMatch(channel, subscribingChannel) ) {
      if( this.channels[channel] ) {
        subscriptions = subscriptions.concat( this.channels[subscribingChannel] )
      }
    }
  }

  if( !subscriptions.length ) 
    return false

  args = [].slice.call(arguments, 1)
  for( i = 0; i < subscriptions.length; i = i+1 ) {
    subscription = subscriptions[i]
    subscription.callback.apply( subscription.context, args )
  }

  return true
}

Mediator.prototype.namespaceMatch = function( requested, nameSpace ) {
  var publishNamespace, subscriptionNamespace, i

  publishNamespace = requested.split( this.configuration.namespaceDelimiter )
  subscriptionNamespace = nameSpace.split( this.configuration.namespaceDelimiter )

  for( i = 0; i < subscriptionNamespace.length; i++ ) {
    if( publishNamespace[i] !== subscriptionNamespace[i] ) {
      return false
    }
  }

  return true
}

module.exports = Mediator