const $ = id => document.getElementById(id);
const qs = selector => document.querySelector(selector);

const query = new URLSearchParams(location.search);

if($('form-search')){
    $('form-search').addEventListener('submit', e => {
        e.preventDefault()
        if(location.pathname != '/products/search'){
            $('form-search').submit()
        }else{
            query.set("keywords",$('input-search').value)
            history.replaceState({}, '', `${location.pathname}?${query}`) //reemplazo la url
            search(query.get('keywords'))
        }
    })
}

if(sessionStorage.getItem('dark')){
    document.body.classList.add('dark');
    document.getElementById('switch').classList.add('active');
}

document.getElementById('switch').addEventListener('click', () => {
    document.body.classList.toggle('dark');
    document.getElementById('switch').classList.toggle('active');
    if(sessionStorage.getItem('dark')){
        sessionStorage.removeItem('dark')
        console.log(sessionStorage.getItem('dark'))
    }else{
        sessionStorage.setItem('dark','active')
        console.log(sessionStorage.getItem('dark'))
    }
})



