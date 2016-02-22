angular.module('forinlanguages.services', [])

.factory('PeerFactory', function($localForage) {
  var makePeer = function(cb) {
    var newurl;
    var newPeer = new Peer({
      key: '6ph8w4mjh1cq5mi',
      debug: 0,
      logFunction: function() {
        var copy = Array.prototype.slice.call(arguments).join(' ');
        console.log(copy);
      }
    });
    newPeer.on('open', function(id) {
      console.log("Opened with ID:", id);
      cb(newPeer, id);
    });
  };

  var handleConnection = function(c, msgCb, peerCb, dataCb) {
    // console.log("connection:", c);
    c.on('data', function(data) {
      // console.log("Got data", data);
      if(data.type === "message") {
        msgCb(data);
      } else if(data.type === "file") {
        dataCb(data);
      } else if(data.type === "file-chunk" || data.type === "file-chunk-last") {
        dataCb(data);
      } else {
        console.log("invalid data type", data);
      }
    });
    c.on('close', function() {
      peerCb(c);
    });
    peerCb(c);
  };

  var connectTo = function(person, me) {
    var c = me.connect(person);
    return c;
  };

  var sendData = function(data, peers) {
    console.log("Sending:", data);
    for(var x in peers) {
      peers[x].send(data);
    }
  };

  var chunker = function(data, cb) {
    var chunkSize = 16 * 1024 * 1024;
    var meta = {
      totalChunks: Math.ceil(data.size/chunkSize),
      name: data.name,
      size: data.size,
    }

    var storeItem = function(prev, last) {
      $localForage.setItem(Math.floor((prev + chunkSize)/chunkSize) + "SENT" + meta.name, data.slice(prev, prev + chunkSize))
      .then(function() {
        if((meta.size - (prev + chunkSize)) < chunkSize) {
          // If we're on the last chunk, save it
          $localForage.setItem(Math.ceil(meta.size/chunkSize) + '-LAST' + "SENT" + meta.name, data.slice(prev + chunkSize, meta.size))
          .then(function() {
            // Trigger the callback because we're finished
            return cb(meta);
          });
        } else {
          // Recurse and save next chunk
          storeItem(prev + chunkSize, false);
        }
      });
    };
    // Initial call of storeItem
    storeItem(0, false);
  };

  return {
    makePeer: makePeer,
    handleConnection: handleConnection,
    connectTo: connectTo,
    sendData: sendData,
    chunker: chunker
  }
})
.factory("ChatFactory", function(){
  var messages = [];
  var peers = {};

  var sendData = function(data, peers) {
    console.log("Sending:", data);
    for(var x in peers) {
      peers[x].send(data);
    }
  };
  
  var sendMessage = function(message, username) {
    if(Object.keys( peers).length === 0) {
      return alert("Can't send data to no users!");
    }
    if(message) {
      if(message === "") {
        return alert("can't use no text");
      }
      var dataToSend = {
        rawdat: message,
        time: moment().format('h:mm:ss a'),
        name: username || "anonymous",
        type: "message"
      };
      sendData(dataToSend, peers);
      messages.push(dataToSend);
    } else {
      alert("you screwed up");
    }
  };

 return {messages: messages, peers:peers, sendMessage: sendMessage}
})