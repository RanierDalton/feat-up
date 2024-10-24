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
    
    const conteudo = JSON.parse({
        name: nome,
        email: email,
        subject: assunto,
        message: mensagem 
    });

    fetch('http://localhost:3333/contato', {
        method: 'POST', // GET, POST, PUT, DELETE, etc.
        mode: 'no-cors', // no-cors, cors, same-origin
        cache: 'no-cache', // default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, same-origin, omit
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow', // manual, follow, error
        referrer: 'no-referrer', // no-referrer, client
        body: conteudo
    })
    .then(response => response.json())

}