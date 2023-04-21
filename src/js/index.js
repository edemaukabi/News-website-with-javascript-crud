const container = document.querySelector(".container");
const prevPageButton = document.querySelector("#prev-page");
const nextPageButton = document.querySelector("#next-page");
let deleteNewsBtn;

let currentPage = 1;
let totalPages;
let limit = 10;
let pageSize;


const setURL = (page) => {
  return `https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1/news?page=${page}&limit=${limit}`;
};

let requestURL = `https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1/news?page=1`;

const generateUI = (articles) => {
  for (let item of articles) {
    let card = document.createElement("div");
    card.classList.add("news-card");
    card.innerHTML = `<a href="./src/pages/news_detail.html?id=${item.id}"><div class="news-image-container">
    <img src="${item.avatar || "./src/resources/images/image1.jpg"}" alt="" />
    </div>
    <div class="news-content">
      <div class="news-title">
        ${item.author}
      </div>
      <div class="news-description">
      ${item.id || ""}
      </div>
      <div class="news-down-buttons">
        <a href="./src/pages/news_detail.html?id=${item.id}" target="_blank" class="view-button view-button-left">
          Read More
        </a>
        <button id= "${item.id}" class="view-button view-button-right">
          Delete News
        </button>
      </div>
    </div></a>`;
    container.appendChild(card);
    
    if (currentPage == 1) {
      prevPageButton.classList.remove("active");
      prevPageButton.disabled = true;
    }
    if (currentPage > 1) {
      prevPageButton.classList.add("active");
      prevPageButton.disabled = false;
    }
    if ( currentPage >= pageSize) {
      console.log({currentPage, pageSize})
      nextPageButton.classList.remove("active");
      nextPageButton.disabled = true;
    }
    if (currentPage == 1){
        nextPageButton.classList.add("active");
        nextPageButton.disabled = false;
    }
  }
};


const getNews = async () => {
  container.innerHTML = "";
  let response = await fetch(requestURL);
  if (!response.ok) {
    alert("Data unavailable at the moment. Please try again later");
    return false;
  }
  let data = await response.json();
  totalPages = data.length;
  return {
    data: data,
    size: data.length
  };
};

container.addEventListener("click", async (e) => {
  deleteNewsBtn = document.getElementById(`${e.target.id}`);
  deleteNewsBtn.addEventListener("click", async () => {
    let deleteURL = `https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1/news/${e.target.id}`;
    let response = await fetch(deleteURL, {
      method: "DELETE",
    });
    if (!response.ok) {
      alert("Data unavailable at the moment. Please try again later");
      return false;
    }
    getPaginatedNews(currentPage);
  })
})


// Get paginated news
const getPaginatedNews = async (page) => {
  let URL = setURL(page);
  container.innerHTML = "";
  let response = await fetch(URL);
  if (!response.ok) {
    alert("Data unavailable at the moment. Please try again later");
    return false;
  }
  totalData = await getNews();
  let data = await response.json();
  totalPages = totalData.size;
  pageSize = totalPages/limit
  generateUI(data);
};

prevPageButton.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    getPaginatedNews(currentPage);
  }
});

nextPageButton.addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage++;
    getPaginatedNews(currentPage);
  }
});

const init = () => {
  getPaginatedNews(currentPage);
};

window.onload = () => {
  init();
};