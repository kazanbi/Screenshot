const key = 'k-l13yweaBiJusJsMpfHw0Wk-pwLDHMKb6_gpxlzQdA',
    api = 'https://api.unsplash.com',
    btn = document.querySelector('.scroll-top'),
    searchBtn = document.querySelector('.search-btn');
    
let block = document.querySelector('.gallery__inner');


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
let macyInstance = Macy({
    container: block,
    trueOrder: false,
    waitForImages: false,
    margin: 3,
});
function fixMancyBug(){
    macyInstance.runOnImageLoad(function () {
        macyInstance.recalculate(true, true);
        var evt = document.createEvent('UIEvents'); 
        evt.initUIEvent('resize', true, false, window, 0); 
        window.dispatchEvent(evt);
    }, true);
}

//api request
async function request(){
    try{
        let response = await fetch(`${api}/photos/?client_id=${key}&per_page=50`);
        let data = await response.json();
        data.forEach(key => {
            block.innerHTML += `<div class="gallery__item">
                <img src="${key.urls.regular}" alt="">
                <div class="gallery__item-text"><box-icon class="heart" name='heart' type='solid'></box-icon></div>
            </div>`
        });
        fixMancyBug();
    }
    catch(e){console.log('Error: ' + e);}
}
request();

//removePhoto
function removePhoto(parent){
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}

//searchApi
async function requestSearch(){
    removePhoto(block);
    try{
        const query =  document.querySelector('.search').value;
        let res = await fetch(`${api}/search/photos/?client_id=${key}&query=${query}&per_page=50`);
        let data = await res.json();
        if(!query) location.reload();
        data.results.forEach(photo => {
            block.innerHTML += `<div class="gallery__item">
                <img src="${photo.urls.regular}" alt="">
                <div class="gallery__item-text"><box-icon class="heart" name='heart' type='solid'></box-icon></div>
            </div>`
            console.log(photo);
        });
        fixMancyBug();
    }
    catch(e){
        console.log('Error: ' + e); 
        if(e === 'TypeError: Failed to fetch'){
            alert('there is no such request');
        }
    }   
}
searchBtn.addEventListener('click', requestSearch);

//-Favourites-

let favBtn = document.querySelector('.heart');

favBtn.addEventListener('click', () =>{

});