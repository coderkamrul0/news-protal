let fetchData = [];
let today = []

// fetch news menu
const lodeMenu = () =>{
    const url = 'https://openapi.programming-hero.com/api/news/categories'
    fetch(url).then(res => res.json()).then(data => displayMenu(data.data))
}


// show news
const displayMenu = (data) =>{
    const menuContainer = document.getElementById('menu-container')
    data.news_category.forEach(singleCategory => {
        const p = document.createElement('p');
        p.innerHTML = `
        <a href="#" class="text-decoration-none text-black" onclick="fetchCategoryNews('${singleCategory.category_id}', '${singleCategory.category_name}')">${singleCategory.category_name}</a>
        `;
        menuContainer?.appendChild(p)
    })
}



// fetch category news
const fetchCategoryNews = (category_id,category_name) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`
    fetch(url).then(res => res.json())
    .then(data => {
      fetchData = data.data;
      today = data.data;
      displayNews(data.data,category_name)
    })
}


// show category news
const displayNews =(data,category_name)=>{
    const item = document.getElementById('item').innerText = data.length
    const category = document.getElementById('category').innerText = category_name


    const newsShowContainer = document.getElementById('news-show-container');
    newsShowContainer.innerHTML = ''

    data.forEach(data =>{
        const {_id,total_view,title,author,thumbnail_url,details} = data
        const div = document.createElement('div')
        div.classList.add('card','mb-3')
        div.innerHTML = `
        
        <div class="row g-0">
        <div class="col-md-3">
          <img src="${thumbnail_url}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-9 d-flex flex-column">
          <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${details.slice(0,200)}...</p>
          </div>
          <div class="card-body">
            <p class="card-text">${details.slice(0,200)}...</p>
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <div class="d-flex gap-2 align-items-center">
                        <div><img height="40" width="40" class="rounded-circle" src="${author.img}"></div>
                        <div>
                        <p class="m-0 p-0">${author.name}</p>
                        <p class="m-0 p-0">${author.published_date}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <i class="fa-solid fa-eye "> ${total_view}</i>
                </div>
                <div>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star-half-stroke"></i>
                </div>
                <div>
                <button onclick="modalData('${_id}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <i class="fa-solid fa-arrow-right text-white"></i>
              </button>
                </div>
            </div>
          </div>
        </div>
      </div>

        `;
        newsShowContainer?.appendChild(div)
    })
    

}


// modal data fetch
const modalData = (id_url) =>{
    fetch(`https://openapi.programming-hero.com/api/news/${id_url}`).then(res => res.json()).then(data => modalDataDisplay(data.data[0]))
}


// modal data show
const modalDataDisplay = (data) => {
    console.log(data);
    const {rating,total_view,title,author,image_url,details} = data
    const modalContainer = document.getElementById('exampleModal')
    modalContainer.innerHTML = ''
    const div = document.createElement('div')
    div.classList.add('modal-dialog');
    div.innerHTML = `
    <div class="modal-content">
    <div class="modal-header">
      
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
        <img src="${image_url}" class="img-fluid">
        <h4 class="pt-2">${title}</h4>
        <p>${details}</p>
        <div class="d-flex justify-content-between align-items-center">
                <div>
                    <div class="d-flex gap-2 align-items-center">
                        <div><img height="40" width="40" class="rounded-circle" src="${author.img}"></div>
                        <div>
                        <p class="m-0 p-0">${author.name}</p>
                        <p class="m-0 p-0">${author.published_date}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <i class="fa-solid fa-eye "> ${total_view}</i>
                </div>
                <div>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star-half-stroke"></i>
                </div>
                <div>
                
                </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    </div>
  </div>
    `;
    modalContainer?.appendChild(div);
}



// show trending news
const showTrending = () =>{
  
  const trendingNews = fetchData.filter(single => single.others_info.is_trending === true);
  const category = document.getElementById('category').innerText;
  console.log(trendingNews);
 
  displayNews(trendingNews,category);

}

// show todays pick
const showTodaysPick = () =>{
  
  const todayPick = today.filter(single => single.others_info.is_todays_pick === true);
  const category = document.getElementById('category').innerText;
  console.log(todayPick);
 
  displayNews(todayPick,category);
}