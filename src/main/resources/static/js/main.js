'use strict';

var usernamePage = document.querySelector('#username_page')
var chatPage = document.querySelector('#chat_page')
var usernameForm = document.querySelector('#username_form')
var messageForm = document.querySelector('#message_form')
var messageInput = document.querySelector('#message')
var messageArea = document.querySelector('#messageArea')
var connectElement = document.querySelector('.connecting')

var stompClient = null
var username = null

var colors = [
'#2196F3', '#32c787', '#00BCD4', '#ff5652',
'#ffc107', '#ff85af', '#FF9800', '#39bbb0'
]

function.connect(event){
    username = document.querySelector('#name').value.trim()
    if(username){
        usernamePage.classList.add('hidden')
        chatPage.classList.remove('hidden')

        var socket = new SocketJs('/mywebsockets')
        stompClient = stomp.over(socket)

        stompClient.connect({}, onConnected, onerror)
    }
    event.preventDefault();
}

function onConnected(){
    stompClient.subscribe('/topic/public', onMessageReceived)

    stompClient.send('/app/chat.addUser',
                {},
                JSON.stringfy({sender: username, type: 'JOIN'})
    )
    connectingElement.classList.add('hidden')
}

function onMessageReceived(){
    var message = JSON.parse()
}

function sendMessage(){
    var messageContent = messageInput.value.trim()
    if(messageContent && stompClient) {
        var chatMessage = {
            sender: username,
            content: messageContent,
            type: 'CHAT'
        }
        stompClient.send(
            '/app/chat.sendMessage',
            {},
            JSON.stringfy(chatMessage)
        )
        messageInput.content = ''
    }
    event.preventDefault()
}

function onerror(){
    connectingElement.textContext = 'Não pôde conectar ao servidor websocket! Por favor atualize a página e tente novamente!'
    connectingElement.style.color = 'red'
}

usernameForm.addEventListener('submit', connect, true)
messageForm.addEventListener('submit', sendMessage, true)

