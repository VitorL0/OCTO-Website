//Contatos da equipe
var WHATSAPP = "5521976405870"; // DDI + DDD + número, só dígitos
var INSTAGRAM = "icarusufrj";   // usuário sem o @

var TAMANHOS = ["P", "M", "G", "GG"];
var PASTA = "img/produtos/";

// Valores 
var produtos = [
  {
    id: "moletom-cartoon", nome: "Moletom Octo Mascote", categoria: "vestuario", tipo: "Moletom",
    preco: 180.0, selo: "Mais pedido", tamanhos: TAMANHOS,
    fotos: ["moletom-cartoon.webp"],
    descricao: "Moletom canguru roxo com o mascote saindo do bolso, cordão laranja e logo OCTO."
  },
  {
    id: "camisa-equipe", nome: "Camisa Oficial da Equipe 2026", categoria: "vestuario", tipo: "Camisa",
    preco: 65, selo: "Uniforme", tamanhos: TAMANHOS,
    fotos: ["camisa-equipe-front.webp", "camisa-equipe-back.webp", "camisa-equipe-duo.webp"],
    descricao: "Vista a mesma energia que move nossos protótipos. A Camisa Oficial OCTO 2026 traz um conceito estético inspirado no layout dinâmico da equipe McLaren na F1 2026, mesclando elegância e agressividade técnica. Confeccionada com corte anatômico e malha encorpada de alta durabilidade, ela carrega o mascote da equipe no peito e as marcas do Rio e do Brasil nas mangas, traduzindo o orgulho de representar a engenharia da UFRJ dentro e fora d'água."
  },
  {
    id: "camisa-deep", nome: "Camiseta Engineered for the Deep", categoria: "vestuario", tipo: "Camiseta oversized",
    preco: 55, selo: "Novo", tamanhos: TAMANHOS,
    fotos: ["camisa-deep-front.webp", "camisa-deep-back.webp", "camisa-deep-duo.webp"],
    descricao: "A camiseta streetwear da OCTO traz modelagem ampla e acabamento encorpado, garantindo presença e caimento impecável no corpo. Confeccionada em 100% algodão nobre de fibra longa, pré-encolhido e resistente."
  },
  {
    id: "moletom-octo", nome: "Moletom OCTO Clássico", categoria: "vestuario", tipo: "Moletom",
    preco: 180.0, tamanhos: TAMANHOS,
    fotos: ["moletom-octo.webp"],
    descricao: "Moletom canguru roxo com o logo OCTO em branco e laranja no peito."
  },
  {
    id: "caneca", nome: "Caneca com Tirante", categoria: "acessorios", tipo: "Caneca",
    preco: 45.0,
    fotos: ["caneca-front.webp", "caneca-back.webp", "caneca-duo.webp"],
    descricao: "Caneca preta fosca de 450 ml - OCTO UFRJ."
  },
  {
    id: "adesivos", nome: "Adesivos - Octo UFRJ", categoria: "acessorios", tipo: "Adesivos",
    preco: 3.0,
    fotos: ["adesivos-quadrado.webp", "adesivo1.webp", "adesivo2.webp", "adesivo3.webp", "adesivo4.webp", "adesivo5.webp"],
    descricao: "Leve a identidade da robótica subaquática para o seu portátil, caderno, garrafa ou caderno com as ilustrações exclusivas da OCTO UFRJ.\n\nComo pedir: ao ser redirecionado para o WhatsApp ou Instagram, indique os números dos modelos pretendidos (conforme identificados na imagem) e a quantidade de cada um."
  }
];

function formatarPreco(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function linkWhatsapp(produto, tamanho) {
  var texto = "Oi, OCTO! Quero fazer um pedido:";
  if (produto) {
    texto += "\n• " + produto.nome + (tamanho ? " (tamanho " + tamanho + ")" : "") + " — " + formatarPreco(produto.preco);
  }
  return "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(texto);
}

function buscarProduto(id) {
  return produtos.find(function (p) { return p.id === id; });
}

// ===== Catálogo =====
var grade = document.getElementById("gradeProdutos");

function mostrarCatalogo(filtro) {
  var lista = produtos.filter(function (p) { return filtro === "todos" || p.categoria === filtro; });
  grade.innerHTML = lista.map(function (p) {
    return (
      '<article class="card">' +
        '<button class="card-foto" data-detalhe="' + p.id + '" aria-label="Ver detalhes de ' + p.nome + '">' +
          (p.selo ? '<span class="selo">' + p.selo + "</span>" : "") +
          '<img src="' + PASTA + p.fotos[0] + '" alt="' + p.nome + '" loading="lazy">' +
        "</button>" +
        '<div class="card-corpo">' +
          '<p class="categoria">' + p.tipo + "</p>" +
          "<h3>" + p.nome + "</h3>" +
          '<p class="preco">' + formatarPreco(p.preco) + "</p>" +
          (p.tamanhos ? '<p class="tamanhos-texto">Tamanhos: ' + p.tamanhos.join(" · ") + "</p>" : '<p class="tamanhos-texto">Tamanho único</p>') +
          '<div class="card-acoes">' +
            '<a class="botao" href="' + linkWhatsapp(p) + '" target="_blank" rel="noopener">Pedir</a>' +
            '<button class="link-card" data-detalhe="' + p.id + '">Ver detalhes &rarr;</button>' +
          "</div>" +
        "</div>" +
      "</article>"
    );
  }).join("");
}

document.getElementById("filtros").addEventListener("click", function (e) {
  var botao = e.target.closest(".filtro");
  if (!botao) return;
  document.querySelectorAll(".filtro").forEach(function (b) { b.classList.toggle("ativo", b === botao); });
  mostrarCatalogo(botao.dataset.filtro);
});

// ===== Detalhe do produto =====
var modal = document.getElementById("modal");
var produtoAtual = null;
var tamanhoAtual = null;

function abrirDetalhe(id) {
  produtoAtual = buscarProduto(id);
  tamanhoAtual = null;
  var p = produtoAtual;

  document.getElementById("modalCategoria").textContent = p.tipo;
  document.getElementById("modalNome").textContent = p.nome;
  document.getElementById("modalPreco").textContent = formatarPreco(p.preco);
  document.getElementById("modalDescricao").textContent = p.descricao;

  document.getElementById("modalMiniaturas").innerHTML = p.fotos.length > 1
    ? p.fotos.map(function (f, i) {
        return '<button data-foto="' + i + '" aria-label="Foto ' + (i + 1) + '"><img src="' + PASTA + f + '" alt=""></button>';
      }).join("")
    : "";
  trocarFoto(0);

  document.getElementById("modalTamanhosBloco").hidden = !p.tamanhos;
  document.getElementById("modalTamanhos").innerHTML = (p.tamanhos || []).map(function (t) {
    return '<button data-tamanho="' + t + '">' + t + "</button>";
  }).join("");

  atualizarLinkPedido();
  modal.classList.add("aberto");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function trocarFoto(i) {
  var foto = document.getElementById("modalFoto");
  foto.src = PASTA + produtoAtual.fotos[i];
  foto.alt = produtoAtual.nome;
  document.querySelectorAll("#modalMiniaturas button").forEach(function (b, j) {
    b.classList.toggle("ativo", j === i);
  });
}

function atualizarLinkPedido() {
  document.getElementById("modalWhatsapp").href = linkWhatsapp(produtoAtual, tamanhoAtual);
}

function fecharDetalhe() {
  modal.classList.remove("aberto");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.getElementById("modalMiniaturas").addEventListener("click", function (e) {
  var b = e.target.closest("[data-foto]");
  if (b) trocarFoto(Number(b.dataset.foto));
});

document.getElementById("modalTamanhos").addEventListener("click", function (e) {
  var b = e.target.closest("[data-tamanho]");
  if (!b) return;
  tamanhoAtual = b.dataset.tamanho;
  document.querySelectorAll("#modalTamanhos button").forEach(function (x) { x.classList.toggle("ativo", x === b); });
  atualizarLinkPedido();
});

document.addEventListener("click", function (e) {
  var detalhe = e.target.closest("[data-detalhe]");
  if (detalhe) abrirDetalhe(detalhe.dataset.detalhe);
  if (e.target.closest("[data-fechar]")) fecharDetalhe();
  if (e.target.closest("[data-construcao]")) {
    e.preventDefault();
    alert("Esta página ainda está em construção. Em breve você poderá acessá-la");
  }
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") fecharDetalhe();
});

// ===== Links de contato =====
document.querySelectorAll("[data-whatsapp]").forEach(function (a) {
  a.href = linkWhatsapp();
  a.target = "_blank";
  a.rel = "noopener";
});
document.querySelectorAll("[data-instagram]").forEach(function (a) {
  a.href = "https://ig.me/m/" + INSTAGRAM;
});

// ===== Menu, cabeçalho e voltar ao topo (mesmo comportamento da home) =====
var botaoMenu = document.getElementById("botaoMenu");
var navegacao = document.getElementById("navegacao");
var cabecalho = document.getElementById("cabecalho");
var voltarTopo = document.getElementById("voltarTopo");

botaoMenu.addEventListener("click", function () {
  var aberto = navegacao.classList.toggle("aberto");
  botaoMenu.setAttribute("aria-expanded", aberto);
  botaoMenu.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
});

navegacao.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function (e) {
    navegacao.classList.remove("aberto");
    botaoMenu.setAttribute("aria-expanded", "false");
    if (link.getAttribute("href") === "#") {
      e.preventDefault();
      alert("Esta página ainda está em construção. Em breve você poderá acessá-la");
    }
  });
});

window.addEventListener("scroll", function () {
  cabecalho.classList.toggle("rolado", window.scrollY > 40);
  voltarTopo.classList.toggle("visivel", window.scrollY > 400);
});

voltarTopo.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.getElementById("anoAtual").textContent = new Date().getFullYear();

mostrarCatalogo("todos");
