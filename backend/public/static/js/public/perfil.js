let isAberto = false;

function abrirPerfil(){
  if(isAberto){
    dropdownPerfil.classList.remove('mostrar');
    isAberto = false;
  } else{
    dropdownPerfil.classList.add('mostrar');
    isAberto = true;
  }
}