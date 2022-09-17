const key = 'k-l13yweaBiJusJsMpfHw0Wk-pwLDHMKb6_gpxlzQdA',
    api = `https://api.unsplash.com/photos/?client_id=${key}&per_page=50`,
    header = document.querySelector('.header');

//scrollY
window.addEventListener('scroll', () => {
    if (window.scrollY > 1700){
        header.classList.add('header--show');
    }else{
        header.classList.remove('header--show');
    }
})

let block = document.querySelector('.gallery__inner');

//maconry
let macyInstance = Macy({
    container: block,
    margin: 3
});

//api request
async function request(){
    try{
        let response = await fetch(api);
        let data = await response.json();
        let key;

        for(key in data){
            block.innerHTML += `<div class="gallery__item">
                <img src="${data[key].urls.regular}" alt="">
                <div class="gallery__item-text"><box-icon name='heart' type='solid'></box-icon></div>
            </div>`;
        }
    }
    catch(e){console.log('Error: ' + e);}
}

request();