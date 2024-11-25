let modalError= document.getElementById('popUp');
let msgModalError = document.getElementById('msgPopUp');

let modalSuccess = document.getElementById("successModal");
let msgSuccess = document.getElementById("msgModalSuccess");

function errorModal(text){
    modalError.showModal();
    msgModalError.innerText = text;
}

function successModal(text){
    modalSuccess.showModal();
    msgSuccess.innerText = text;
}

function closeSuccessModal(){
    modalSuccess.close();
}