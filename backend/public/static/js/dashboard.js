function charts() {
  Chart.defaults.color = "#fff";

  const genero = document.getElementById("generos");

  new Chart(genero, {
    type: "bar",
    data: {
      labels: ["Trap", "Eletrônica", "Funk", "Outros"],
      datasets: [
        {
          data: [483, 234, 129, 145],
          backgroundColor: "#BE0000",
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: "Gêneros Musicais mais Produzidos",
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
        y: {
          beginAtZero: true,
          grid: {
            color: "#fff",
          },
        },
      },
    },
  });

  const feat = document.getElementById("feats");

  new Chart(feat, {
    type: "pie",
    data: {
      labels: ["Aceitos", "Solicitados"],
      datasets: [
        {
          data: [73.7, 26.3],
          backgroundColor: ["#BE0000", "#ebde34"],
          borderWidth: [0, 0],
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "Interações ao Feat",
        },
      },
      tooltips: {
        enabled: false,
      },
    },
  });

  const aplicativo = document.getElementById("aplicativos");

  new Chart(aplicativo, {
    type: "bar",
    data: {
      labels: ["FlStudio", "Ableton", "Pro Tools", "Outros"],
      datasets: [
        {
          data: [1234, 531, 254, 26],
          backgroundColor: "#BE0000",
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: "Aplicativos de Produção mais Utilizados",
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
        y: {
          beginAtZero: true,
          grid: {
            color: "#fff",
          },
        },
      },
    },
  });
}

function obterDadosGrafico() {
  // TODO botar pra funfar
  if (proximaAtualizacao != undefined) {
      clearTimeout(proximaAtualizacao);
  }

  fetch(`/dashboard`, { cache: 'no-store' })
  .then(function (response) {
      if (response.ok) {
          response.json().then(function (resposta) {
              console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
              resposta.reverse();

              plotarGrafico(resposta);
          });
      } else {
          console.error('Nenhum dado encontrado ou erro na API');
      }
  })
      .catch(function (error) {
          console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
      });
}

function plotarGrafico(resposta) {

  console.log('iniciando plotagem do gráfico...');

  // Criando estrutura para plotar gráfico - labels
  let labels = [];

  // Criando estrutura para plotar gráfico - dados
  let dados = {
      labels: labels,
      datasets: [{
          label: 'Umidade',
          data: [],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
      },
      {
          label: 'Temperatura',
          data: [],
          fill: false,
          borderColor: 'rgb(199, 52, 52)',
          tension: 0.1
      }]
  };

  console.log('----------------------------------------------')
  console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
  console.log(resposta)

  // Inserindo valores recebidos em estrutura para plotar o gráfico
  for (i = 0; i < resposta.length; i++) {
      var registro = resposta[i];
      labels.push(registro.momento_grafico);
      dados.datasets[0].data.push(registro.umidade);
      dados.datasets[1].data.push(registro.temperatura);
  }

  console.log('----------------------------------------------')
  console.log('O gráfico será plotado com os respectivos valores:')
  console.log('Labels:')
  console.log(labels)
  console.log('Dados:')
  console.log(dados.datasets)
  console.log('----------------------------------------------')

  // Criando estrutura para plotar gráfico - config
  const config = {
      type: 'line',
      data: dados,
  };

  // Adicionando gráfico criado em div na tela
  let myChart = new Chart(
      document.getElementById(`myChartCanvas${idAquario}`),
      config
  );

  setTimeout(() => atualizarGrafico(dados, myChart), 2000);
}


function atualizarGrafico( dados, myChart) {
  fetch(`/dashboard`, { cache: 'no-store' })
  .then(function (response) {
      if (response.ok) {
          response.json().then(function (novoRegistro) {

              obterDadosGrafico();
              // alertar(novoRegistro, );
              console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
              console.log(`Dados atuais do gráfico:`);
              console.log(dados);

              let avisoCaptura = document.getElementById(`capturei`)
              avisoCaptura.innerHTML = ""


              if (novoRegistro[0].momento_grafico == dados.labels[dados.labels.length - 1]) {
                  console.log("---------------------------------------------------------------")
                  console.log("Como não há dados novos para captura, o gráfico não atualizará.")
                  avisoCaptura.innerHTML = "<i class='fa-solid fa-triangle-exclamation'></i> Foi trazido o dado mais atual capturado pelo sensor. <br> Como não há dados novos a exibir, o gráfico não atualizará."
                  console.log("Horário do novo dado capturado:")
                  console.log(novoRegistro[0].momento_grafico)
                  console.log("Horário do último dado capturado:")
                  console.log(dados.labels[dados.labels.length - 1])
                  console.log("---------------------------------------------------------------")
              } else {
                  // tirando e colocando valores no gráfico
                  dados.labels.shift(); // apagar o primeiro
                  dados.labels.push(novoRegistro[0].momento_grafico); // incluir um novo momento

                  dados.datasets[0].data.shift();  // apagar o primeiro de umidade
                  dados.datasets[0].data.push(novoRegistro[0].umidade); // incluir uma nova medida de umidade

                  dados.datasets[1].data.shift();  // apagar o primeiro de temperatura
                  dados.datasets[1].data.push(novoRegistro[0].temperatura); // incluir uma nova medida de temperatura

                  myChart.update();
              }

              // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
              proximaAtualizacao = setTimeout(() => atualizarGrafico(dados, myChart), 20000);
          });
      } else {
          console.error('Nenhum dado encontrado ou erro na API');
          // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
          proximaAtualizacao = setTimeout(() => atualizarGrafico(dados, myChart), 2000);
      }
  })
      .catch(function (error) {
          console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
      });

}
