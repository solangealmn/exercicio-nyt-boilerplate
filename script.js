const btnBusca = document.getElementById("btn-busca");
btnBusca.addEventListener("click", trazBusca);
let docs = [];

function buscaPalavra(){
  return document.getElementById("campo-busca").value;
}

function erro(){
  console.log("erro");
}

function trazBusca(event){
  event.preventDefault();
  const pegarNoticia = new XMLHttpRequest();
  pegarNoticia.open("GET", `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${buscaPalavra()}&api-key=132b29c8d05848999164b56f47037013`);
  pegarNoticia.onload = carregaPosts;
  pegarNoticia.onerror = erro;
  pegarNoticia.send();
}

function carregaPosts(){
  docs = JSON.parse(this.responseText)["response"]["docs"];
  exibePosts();
}

function exibePosts(){
  let exibeBusca = document.getElementById("exibe-busca");
    exibeBusca.innerHTML = 
      `<div class="area-noticia"> ${docs.map(doc => `
        <div class="noticia">
          <h3>${doc.headline.main}</h3>
          <p>${doc.snippet}</p>
          <a href="${doc.web_url}">Link para original</a>
        </div>
        `).join("")}
      </div>`;
}
  


