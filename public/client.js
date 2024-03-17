const socket =io('http://localhost:3000');
let name ;
const textarea=document.querySelector('#textarea');
let msgarea=document.querySelector('.msg_area');
do{
   name= prompt("Please enter your Name");
}while(!name);

textarea.addEventListener('keydown',(e)=>{
    if(e.key==="Enter")
    {
        e.preventDefault(); // Prevents the default behavior (newline) of the Enter key

        sendmsg(e.target.value);
        e.target.value='';

    }
});
function sendmsg(message) {
    if (message) { // Check if the message is not empty
        let msg = {
            user: name,
            message: message.trim()
        };
        appendmsg(msg, 'out_msg');
        scrollToBottom()
        // send to server
        socket.emit('message', msg)
    }
}
// textarea.value=""
function appendmsg(msg , type ) 
{
    let  maindiv= document.createElement('div');
    maindiv.classList.add(type , "msg" );
    let content = `
    <h4> ${msg.user}</h4>
    <p>${msg.message} </p>
    `;
    maindiv.innerHTML=content
    msgarea.appendChild(maindiv)
}
  
//receive
socket.on( 'message' , (msg)=>{
    appendmsg(msg, 'incm_msg');
    scrollToBottom();
})

function scrollToBottom() {
    msgarea.scrollTop = msgarea.scrollHeight
}