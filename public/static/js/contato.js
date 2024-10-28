let ipt_nome = document.getElementById('iptNome');
let ipt_email = document.getElementById('iptEmail');
let ipt_assunto = document.getElementById('iptAssunto');
let ipt_mensagem = document.getElementById('iptMensagem');
let ipt_confirmar = document.getElementById('iptConfirmar');

let modal = document.getElementById('popUp');
let msgModal = document.getElementById('msgPopUp');

function sendEmail() {
    var checkResposta = ipt_mensagem1.checked;

    if(!checkResposta){
        modal.showModal()
        return msgModal.innerText = "Você precisa concordar com o envio da mensagem para enviar!";
    }
    // https://app.elasticemail.com/login?_gl=1*6r0n63*_gcl_au*MTMzOTQzNzY2NC4xNzI4MzM3NDkw*FPAU*MTMzOTQzNzY2NC4xNzI4MzM3NDkw*_ga*MTg3Nzk0OTg0MS4xNzI4MzM3NDUz*_ga_9GFVDHZ5M5*MTcyODMzNzQ1My4xLjEuMTcyODMzNzkzOS41Mi4wLjA.*_ga_MZLQS12D2G*MTcyODMzNzQ1Mi4xLjEuMTcyODMzNzkzOS4wLjAuMTE5MzI1NDQxNg..
    // O link acima da acesso ao site onde tem tudo sobre as credenciais e senhas, porém já configurei tudo
    // deixei as credenciais no .env

    var emailContactado = ipt_email.value;
    var nome = ipt_nome.value;
    var assunto = ipt_assunto.value;

    if(nome == '' || emailContactado == '' || assunto == '' || ipt_mensagem.value == ''){
        modal.showModal();
        return msgModal.innerText = "Preencha TODOS os campos corretamente!";
    }
    
    var mensagem = `
        Nome Usuário: ${nome}<br>
        Email: ${emailContactado}<br>
        Assunto: ${assunto}<br>
        Mensagem: ${ipt_mensagem.value}
    `;

    Email.send({
        Host: "smtp.elasticemail.com",
        Port: porta,
        Username: email,
        Password: senha,
        To: email,
        From: email,
        Subject:assunto,
        Body: mensagem
    })
    .then(function (resposta) {
        msgModal.innerText = resposta;
        modal.showModal();
    });
}
function closeModal(){
    modal.close();
}