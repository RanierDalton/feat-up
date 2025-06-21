function construirCabecalhoInfo(titulo, descricao, isFiltro){
    const cabecalho = document.getElementsByClassName("cabecalho-achar")[0];
    
    cabecalho.innerHTML = `
        <div class="infos">
            <span class="titulo">${titulo}</span>
            <span class="subtitle">${descricao}</span>
        </div>
        ${
            isFiltro ? `<div class="filtro">
                            <a href="#" onclick="abrirFiltro()">
                                <span>Filtrar</span>
                                <i class="fa-solid fa-filter"></i>
                            </a>
                        </div> ` : ""
        }
    `

    if (isFiltro){
        document.getElementsByTagName('body').innerHTML += `
            <dialog close id="modalFiltro">
                <div>
                    <div>
                        <div>
                            <span></span>
                            <a href="#" onclick="modalFiltro.close()"></a><i class="fa-solid fa-xmark"></i>
                        </div>
                        <div>
                            <div>
                                <span></span>
                                <i class="fa-solid fa-caret-down"></i>
                            </div>
                            <div>
                                <span></span>
                                <i class="fa-solid fa-caret-down"></i>
                            </div>
                            <div>
                                <span></span>
                                <i class="fa-solid fa-caret-down"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </dialog>
        ` 
    }
}