async function search(keywords) {
    try {
      let response = await fetch('/api/products/search?keywords=' + keywords)
      let result = await response.json();

      if (result.meta.total > 0) {
        $('box-search').innerHTML = "";
        $('text-search').innerText = 'Resultados de la búsqueda : ' + query.get('keywords')

        result.data.forEach(product => {
         let item =  `<div class="col-12 col-md-4 col-lg-3 my-2">
          <a href="/products/detail/${product.id}">
            <article class="p-3">
              <img src="/images/${product.images[0].file}" class="img-fluid" alt="" />
              <h4 class="text-secondary text-center">${product.name} </h4>
            </article>
          </a>
        </div>`
        $('box-search').innerHTML += item
        });
       
      }else{
        $('box-search').innerHTML = "";
        $('text-search').innerText = 'No hay resultados para la búsqueda : ' + query.get('keywords')
      }
    } catch (error) {
      console.log(error)
    }
  }

window.addEventListener('load', () => {
      search(query.get('keywords'))
})
          