// Area de varias ligadas ao html. Ligadas ao display do usuario
const citacaoContainer = document.getElementById('citacao-container');
const citacaoTexto = document.getElementById('citacao');
const autorTexto = document.getElementById('autor');
const btnTwitter = document.getElementById('twitter');
const btnNovaCitacao = document.getElementById('nova-citacao');
const loader = document.getElementById('loader');

let apiCitacoes = [];

// mostar um simbolo de carregando
function loading(){
    loader.hidden = false;
    citacaoContainer.hidden = true;
}

// remover o simbolo de carregando
function complete() {
    citacaoContainer.hidden = false;
    loader.hidden = true;
}

// funcao mostrar nova citacao
function novaCitacao() {
    loading();
    const citacao = apiCitacoes[Math.floor(Math.random() * apiCitacoes.length)];
    // dentro da API usada tem dois nomes especificos usados que sao as chaves "author" e "text", por isso eles seram usados e reproduzidos agora na minha condicional. se fosse um outro nome ou o nome traduzido gerara um erro
    // checar se o campo author esta vazio, se sim colocar 'unknwon' no lugar
    if (!citacao.author) {
        autorTexto.textContent = 'unknown';
    } else {
        autorTexto.textContent = citacao.author;
    }
    // checar se a citacao for grande e add um estilo apropriado
    if(citacao.text.length > 120) {
        citacaoTexto.classList.add('long-quote');
    } else {
        citacaoTexto.classList.remove('long-quote');
    }

    citacaoTexto.textContent = citacao.text;
    complete();
}
// funcao que pega as citacoes direto do API
async function pegarCitacoes() {
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiCitacoes = await response.json();
        novaCitacao();
    } catch (error) {
        alert('Algum inconveniente ocorreu, verifique com seu programador');
    }
    
}

// Twittar a citacao 
function twittarCitacao() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=?${citacaoTexto.textContent} - ${autorTexto.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
btnNovaCitacao.addEventListener('click', novaCitacao);
btnTwitter.addEventListener('click', twittarCitacao);

// On load
pegarCitacoes();