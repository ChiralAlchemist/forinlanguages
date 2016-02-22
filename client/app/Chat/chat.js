angular.module('forinlanguages.chat', [])

.controller('ChatController', function ($scope, ChatFactory, PeerFactory){
    //$scope.test = "hello";
    $scope.messages = [];
    $scope.sendData = function(message,username){
        ChatFactory.sendMessage(message,username);
        $scope.messages = ChatFactory.messages;
    }
    Object.observe(ChatFactory.peers, function(changes){
       if(changes[0].type === 'add'){
        console.log('changes');
        console.log(ChatFactory.peers[changes[0].name]);
        $scope.handleConnection(ChatFactory.peers[changes[0].name])
       } 
    })

    $scope.handleConnection = function(c) {
        PeerFactory.handleConnection(c,
            function(data) {
            console.log(data);
            $scope.messages.push(data);
            ChatFactory.messages.push(data);
            $scope.$digest();
        },
        function(conn) {
            if(ChatFactory.peers[conn.peer] !== undefined) {
                if(!ChatFactory.peers[conn.peer].open) {
                delete ChatFactory.peers[conn.peer];
                $scope.messages.push({rawdat: "User with ID " + conn.peer + " left the chat."});
                $scope.$digest();
                }
            } else {
            ChatFactory.peers[conn.peer] = conn;
            ChatFactory.peers[conn.peer] = conn;
            $scope.$digest();
            }
        })
    }
})