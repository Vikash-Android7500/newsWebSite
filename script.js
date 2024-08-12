const API_KEY = "317d6b39f5f04804b70ed2cd888e94d4";
const Url = "https://newsapi.org/v2/everything?q=";

const cardContainer = document.getElementById("CardContainer");
const newsTemplate = document.getElementById("TemplateNewsCard");
const searchButton = document.getElementById("SearchButton");
const searchText = document.getElementById("SearchText");
// Errors
const loadingScreen = document.querySelector(".loading-container");
const notfound = document.querySelector(".ErrerImage");
const InputError = document.querySelector(".inputError");
const InputRightWordError = document.querySelector(".inputRightWordError");

window.addEventListener("load", () => fetchNews("India"));

// home NEWS icon
function reload() {
  window.location.reload();
}
///

async function fetchNews(query) {
  try {
    loadingScreen.classList.add("active");
    const res = await fetch(`${Url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    console.log(data);
    bindData(data.articles);
    loadingScreen.classList.remove("active");

    // if (data.code > 429) {
    //   loadingScreen.classList.remove("active");
    //   notfound.classList.add("active");
    // } else {
    //   notfound.classList.remove("active");
    //   bindData(data.articles);
    // }

  } catch (error) {
    // console.error("Internal Server Error !");
  }
}

function bindData(articles) {
  cardContainer.innerHTML = "";

  articles.forEach((article) => {
    if (!article.urlToImage) {
      notfound.classList.add("active");
    } else {
      notfound.classList.remove("active");

      const CardClone = newsTemplate.content.cloneNode(true);
      fillDataInCard(CardClone, article);
      cardContainer.appendChild(CardClone);
    }
  });
}

function fillDataInCard(CardClone, article) {
  const NewsImage = CardClone.getElementById("newsImg");
  const Newstitle = CardClone.getElementById("NewsTitle");
  const NewsSOurce = CardClone.getElementById("NewsSource");
  const NewsDEsc = CardClone.getElementById("NewsDesc");
  // All Data In Card
  NewsImage.src = article.urlToImage;
  Newstitle.innerHTML = article.title.split("").slice(0, 40).join("") + "...";
  NewsDEsc.innerHTML =
    article.description.split("").slice(0, 100).join("") + "...";

  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/kolkata",
  });

  NewsSOurce.innerHTML = `${article.source.name} . ${date}`;

  CardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}

let currnetSeclectNav = null;

function onNavItemClick(id) {
  fetchNews(id);
  const navItem = document.getElementById(id);
  currnetSeclectNav?.classList.remove("active");
  currnetSeclectNav = navItem;
  currnetSeclectNav.classList.add("active");
}

searchButton.addEventListener("click", () => {
  const query = searchText.value;
  if (!query) {
    InputError.classList.add("active");
  } 
  else {
    InputError.classList.remove("active");
  }
  fetchNews(query);
  

  currnetSeclectNav?.classList.remove("active");
  currnetSeclectNav = null;
});
