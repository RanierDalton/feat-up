let ipt_nome = document.getElementById('iptNome');
let ipt_email = document.getElementById('iptEmail');
let ipt_assunto = document.getElementById('iptAssunto');
let ipt_mensagem = document.getElementById('iptMensagem');
let ipt_confirmar = document.getElementById('iptConfirmar');

let modal = document.getElementById('popUp');
let msgModal = document.getElementById('msgPopUp');

function enviarMensagem(){
    let nome = ipt_nome.value;
    let email = ipt_email.value;
    let assunto = ipt_assunto.value;
    let mensagem = ipt_mensagem.value;
    let isConfirmado = ipt_confirmar.checked;

    if(nome == '' || email == '' || assunto == '' || mensagem.value == ''){
        modal.showModal();
        return msgModal.innerText = "Preencha TODOS os campos corretamente!";
    }

    if(!isConfirmado){
        modal.showModal();
        return msgModal.innerText = "Você precisa concordar com o envio da mensagem para enviar!";
    }

    fetch('http://localhost:3333/contato', {
        method: 'POST', // GET, POST, PUT, DELETE, etc. 
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        mode: 'no-cors',
        body: JSON.stringify({
            name: nome,
            email: email,
            subject: assunto,
            message: mensagem 
        })
    })
    .then((response) => response.json())
    .then((dados) => console.log(dados));

}

function censor(censor) {
    var i = 0;
    
    return function(key, value) {
      if(i !== 0 && typeof(censor) === 'object' && typeof(value) == 'object' && censor == value) 
        return '[Circular]'; 
      
      if(i >= 29) // seems to be a harded maximum of 30 serialized objects?
        return '[Unknown]';
      
      ++i; // so we know we aren't using the original object anymore
      
      return value;  
    }
  }