class ChatEngine{
    constructor(chatBoxId,userName){
        this.chatBox = $(`#${chatBoxId}`);
        this.userName = userName;
        this.socket = io.connect('http://127.0.0.1:5000');

        if(this.userName){
            this.connectionHandler();
        }
    }

    appendFunction = (message,data) => {
        let position ;
        position = (data.user_name === this.userName) ? 'right':'left';
        let messageContainer = $('<div class="message">');
        messageContainer.addClass(position);
        messageContainer.text(message);
        this.chatBox.append(messageContainer);
        let audioElement = new Audio('../audio/ting.mp3');
        if(position === 'left'){
            audioElement.play();
        }
      }

    connectionHandler(){
        let self = this;
        this.socket.on('connect',function(){
            console.log('connection established using socket.io');
        });

        self.socket.emit('new-user-joined',{
            user_name:self.userName,
            chatRoom:'chatBox'
        });

        self.socket.on('user_joined', function (data) {
            self.appendFunction(`${data.user_name} joined the chat`,data);
        });

        $('#send-container').submit(function(event){
            event.preventDefault();
            let msg = $('#messageInp').val();
            if(msg!=''){
                self.socket.emit('send_message',{
                    message:msg,
                    user_name:self.userName,
                    chatRoom:'chatBox'
                });
            }
            $('#messageInp').val('');            
        });

        self.socket.on('recieve_message',function(data){
            self.appendFunction(data.message,data);
        });

        self.socket.on('leave',function(data){
            console.log('left chat');
            self.appendFunction(`${data.user_name} left the chat`,data);
        })
          
    }
}