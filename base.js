var botaoMenu = document.getElementById("botaoMenu");
var navegacao = document.getElementById("navegacao");
var cabecalho = document.getElementById("cabecalho");
var voltarTopo = document.getElementById("voltarTopo");
var fundos = document.querySelectorAll(".hero-fundo");
var pontos = document.getElementById("pontos");
var indiceAtual = 0;

botaoMenu.addEventListener("click", function () {
  var aberto = navegacao.classList.toggle("aberto");
  botaoMenu.setAttribute("aria-expanded", aberto);
  botaoMenu.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
});

navegacao.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    navegacao.classList.remove("aberto");
    botaoMenu.setAttribute("aria-expanded", "false");
  });
});

if (fundos.length > 0) {
fundos.forEach(function (_, i) {
  var ponto = document.createElement("span");
  if (i === 0) ponto.classList.add("ativo");
  ponto.addEventListener("click", function () { mostrarFoto(i); });
  pontos.appendChild(ponto);
});

function mostrarFoto(indice) {
  fundos[indiceAtual].classList.remove("ativo");
  pontos.children[indiceAtual].classList.remove("ativo");
  indiceAtual = (indice + fundos.length) % fundos.length;
  fundos[indiceAtual].classList.add("ativo");
  pontos.children[indiceAtual].classList.add("ativo");
}

document.getElementById("setaAnterior").addEventListener("click", function () {
  mostrarFoto(indiceAtual - 1);
});
document.getElementById("setaProximo").addEventListener("click", function () {
  mostrarFoto(indiceAtual + 1);
});

var timer = setInterval(function () { mostrarFoto(indiceAtual + 1); }, 6000);

var hero = document.getElementById("hero");
hero.addEventListener("mouseenter", function () { clearInterval(timer); });
hero.addEventListener("mouseleave", function () {
  timer = setInterval(function () { mostrarFoto(indiceAtual + 1); }, 6000);
});
}

window.addEventListener("scroll", function () {
  var rolou = window.scrollY > 40;
  cabecalho.classList.toggle("rolado", rolou);
  voltarTopo.classList.toggle("visivel", window.scrollY > 400);
});

voltarTopo.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

navegacao.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function (e) {
    if (link.getAttribute("href") === "#") e.preventDefault();
    navegacao.querySelectorAll("a").forEach(function (l) { l.classList.remove("ativo"); });
    link.classList.add("ativo");
  });
});

document.getElementById("anoAtual").textContent = new Date().getFullYear();

document.querySelectorAll('a[href="#"]').forEach(function (link) {
  if (link.closest(".navegacao")) return;
  link.addEventListener("click", function (e) {
    e.preventDefault();
    alert("Esta página ainda está em construção. Em breve você poderá acessá-la!");
  });
});
