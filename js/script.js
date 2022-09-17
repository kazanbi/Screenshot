const key = 'k-l13yweaBiJusJsMpfHw0Wk-pwLDHMKb6_gpxlzQdA',
    api = 'https://api.unsplash.com',
    btn = document.querySelector('.scroll-top'),
    searchBtn = document.querySelector('.search-btn');
    
let block = document.querySelector('.gallery__inner');

//searchApi
async function requestSearch(){
    try{
        const query =  document.querySelector('.search').value;
        let res = await fetch(`${api}/search/photos/?client_id=${key}&query=${query}`);
        let data = await res.json();
        data.results.forEach(photo => {
            block.innerHTML += `<div class="gallery__item">
                <img src="${photo.urls.regular}" alt="">
                <div class="gallery__item-text"><box-icon name='heart' type='solid'></box-icon></div>
            </div>`;
        });
    }
    catch(e){console.log('Error: ' + e); }   
}

searchBtn.addEventListener('click', requestSearch);

//scroll to the top of the page
window.addEventListener('scroll', () =>{
    if(scrollY > 1000){
        btn.classList.add('scroll-top--show');
    }else{
        btn.classList.remove('scroll-top--show');
    }
})
btn.addEventListener('click', () => {
    id = document.getElementById('header').scrollIntoView({
        behavior: 'smooth'
    });
});

//maconry
let macy = Macy({
    container: block,
    trueOrder: false,
    waitForImages: false,
    margin: 3,
});

//api request
async function request(){
    try{
        let response = await fetch(`${api}/photos/?client_id=${key}&per_page=50`);
        let data = await response.json();
        let keyD;

        for(keyD in data){
            block.innerHTML += `<div class="gallery__item">
                <img src="${data[keyD].urls.regular}" alt="">
                <div class="gallery__item-text"><box-icon name='heart' type='solid'></box-icon></div>
            </div>`;
        }
    }
    catch(e){console.log('Error: ' + e);}
}
request();