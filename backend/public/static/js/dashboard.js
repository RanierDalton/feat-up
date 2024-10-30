function charts(){
  Chart.defaults.color = "#fff";

  const genero = document.getElementById('generos');

  new Chart(genero, {
    type: 'bar',
    data: {
      labels: ['Trap', 'Eletrônica', 'Funk', 'Outros'],
      datasets: [{
        data: [483, 234, 129, 145],
        backgroundColor: '#BE0000'
      }]
    },
    options: {
      plugins: {
          legend: {
              display: false
          },
          title: {
              display: true,
              text: 'Gêneros Musicais mais Produzidos'
          }
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
                  color: '#fff'
              }
          }
        
      }
    }
  });

  const feat = document.getElementById('feats');

  new Chart(feat, {
    type: 'pie',
    data: {
      labels: ['Aceitos', 'Solicitados'],
      datasets: [{
        data: [73.7, 26.3],
        backgroundColor: ['#BE0000', '#ebde34'],
        borderWidth: [0,0]
      }]
    },
    options: {
      plugins: {
          title: {
              display: true,
              text: 'Interações ao Feat'
          }
      },
      tooltips: {
          enabled: false
      },
    }
  });

  const aplicativo = document.getElementById('aplicativos');

  new Chart(aplicativo, {
    type: 'bar',
    data: {
      labels: ['FlStudio', 'Ableton', 'Pro Tools', 'Outros'],
      datasets: [{
        data: [1234, 531, 254, 26],
        backgroundColor:'#BE0000'
      }]
    },
    options: {
      plugins: {
          legend: {
              display: false
          },
          title: {
              display: true,
              text: 'Aplicativos de Produção mais Utilizados'
          }
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
                  color: '#fff'
              }
          }
      }
    }
  });
}

charts();
