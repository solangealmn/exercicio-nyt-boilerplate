$(document).ready(() => {
  const btnBusca = document.getElementById("btn-busca");
  btnBusca.addEventListener("click", trazBusca);

});

let docs = [];

function buscaPalavra(){
  return document.getElementById("campo-busca").value;
}

function erro(){
  console.log("erro");
}

function trazBusca(event){
  event.preventDefault();
  const url = `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${buscaPalavra()}&page=2&sort=oldest&api-key=a0bb9d25234c494086ca1611e7395010`;
  $.ajax({
    type:"GET",
    url,
    success: carregarPosts,
    error: erro,
    crossDomain: true
  });
}
function carregarPosts(data){
  docs = data.response.docs;
  // docs = JSON.parse(this.responseText)["response"]["docs"];
  exibePosts();
}

function exibePosts(){
  let exibeBusca = document.getElementById("exibe-busca");
  exibeBusca.innerHTML = `
  <div class="area-noticia">${docs.map(doc => `
    <div class="noticia">
    <a href="${doc.web_url}">
    <h3>${doc.headline.main}</h3>
    <p>${doc.snippet}</p></a>
  </div>`).join("")}</div>`;
}
