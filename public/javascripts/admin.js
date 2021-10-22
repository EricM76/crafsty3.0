console.log('admin.js connected success');

let header = qs('header');
let nav = qs('nav')
let fondo = qs('.admin');
let table = qs('.table');
let tableProduct = document.getElementById('table-products');
let selectFilter = document.getElementById('select-filter');
let boxPaginator = document.getElementById('box-paginator');


/* categories */

const loadCategories = async () => {
    try {
        let response = await fetch('/api/categories');
        let result = await response.json();
        result.data.forEach(category => {
            selectFilter.innerHTML += `<option value="${category.id}">${category.name}</option>`;
        })
    } catch (error) {
        console.log(error);
    }
}

/* products */

tableProduct.innerHTML = "";

const loadProducts = async (limit, show, current, initial, order='id',filter="") => {
    tableProduct.innerHTML = null;
    boxPaginator.innerHTML = null;

    try {
        let response = await fetch(`/api/products?current=${current}&limit=${limit}&order=${order}&filter=${filter}`);
        let result = await response.json()
        result.data.forEach((product, index) => {
            addItem(product, index)
        });
        sessionStorage.setItem('total', JSON.stringify(result.meta.cantidad))
        pagination(result.meta.cantidad, limit, show, current, initial)
    } catch (error) {
        console.log(error)
    }
}

loadProducts(10, 6, 1, 1)

$('select-view').addEventListener('change', e => {
    let limit = e.target.value;
    loadProducts(+limit, 6, 1, 1)
})

const addItem = (product, index) => {
    let item = `
    <tr>
        <th scope="row">${product.id} </th>
        <td>${product.name} </td>
        <td>${product.price} </td>
        <td>${product.category.name} </td>
        <td class="d-flex justify-content-around">
            <a class="btn btn-sm btn-success"
            href="/products/edit/${product.id} "><i class="fas fa-edit"></i></a>
        <div>
            <form
                action="/products/delete/${product.id}?_method=DELETE"
                method="POST">
                <button class="btn btn-sm btn-danger"
                    type='submit'><i class="fas fa-trash-alt"></i></button>
            </form>
        </div>
        </td>
    </tr>
    `
    tableProduct.innerHTML += item;

}
loadCategories()

/* paginador */

const goPage = async (event, current, limit, initial,order=$('select-order').value,filter=$('select-filter').value) => {
    event.preventDefault()
    tableProduct.innerHTML = null;

    try {
        let response = await fetch(`/api/products?current=${current}&limit=${limit}&order=${order}&filter=${filter}`);
        let result = await response.json()
        console.log(result)
        result.data.forEach((product, index) => {
            addItem(product, index)
        });
        boxPaginator.innerHTML = null;
        pagination(JSON.parse(sessionStorage.getItem('total')), limit, 6, current, initial)


    } catch (error) {
        console.log(error)
    }
}

const goPagesNext = (event, total, limit, show, current, initial) => {
    event.preventDefault()
    current = current + show
    initial = initial + show
    boxPaginator.innerHTML = null;
    pagination(total, limit, show, current, initial)
    goPage(event, current, limit, initial)

}

const goPageLast = (event, total, limit, show, current, initial) => {
    event.preventDefault()
    current = current - show
    initial = initial - show
    boxPaginator.innerHTML = null;
    pagination(total, limit, show, current, initial)
    goPage(event, current, limit, initial)

}

const goFirst = (event, total, limit, show) => {
    event.preventDefault();
    boxPaginator.innerHTML = null;
    pagination(total, limit, show, 1, 1);
    goPage(event, 1, limit, 1)

}

const goLast = (event,total,limit,show, pages) => {
    event.preventDefault();
    boxPaginator.innerHTML = null;
    let current = pages;
    let initial = pages - show;
    goPage(event, current, limit, initial)

    pagination(total, limit, show, current, initial);

}

function pagination(total, limit, show, current, initial) {
    let pages = Math.ceil(total / limit);
    if (initial > 1) {
        boxPaginator.innerHTML = `
    
        <li class="page-item mx-2" >
            <a class="page-link" href="#" onclick="goFirst(event,${total},${limit},${show})"><i class="fas fa-angle-left"></i></a>
        </li>
        <li class="page-item" >
            <a class="page-link" href="#" onclick="goPageLast(event,${total}, ${limit}, ${show}, ${current}, ${initial})"><i class="fas fa-angle-double-left"></i></a>
        </li>`
    }
    

    for (let i = initial; i <= initial + show; i++) {
        if(i <= pages){
            let page = ` 
            <li class="page-item ${current == i ? 'active' : ''}" id="pag${i}">
                <a class="page-link"  href="#" onclick="goPage(event,${i},${limit},${initial})">${i}</a>
            </li>`

        boxPaginator.innerHTML += page
        }
      
    }

    if (initial + show < pages) {
        boxPaginator.innerHTML += ` 
        <li class="page-item">
            <a class="page-link" href="#" onclick="goPagesNext(event, ${total}, ${limit}, ${show}, ${current}, ${initial})" ><i class="fas fa-angle-double-right"></i></a>
        </li>
        <li class="page-item goLast mx-2">
            <a class="page-link" href="#" onclick="goLast(event,${total},${limit},${show},${pages})"><i class="fas fa-angle-right"></i></a>
        </li>`
    }
    boxPaginator.innerHTML += `<p class="text-primary small ms-2 mt-1">pág. ${current} de ${pages}</p>`
}

/* order */

$('select-order').addEventListener('change', (e) => {
    let order = e.target.value
    let filter = $('select-filter').value
    loadProducts(10, 6, 1, 1, order,filter)

})

$('select-filter').addEventListener('change', (e) => {
    let order = $('select-order').value
    let filter =e.target.value
    loadProducts(10, 6, 1, 1, order,filter)

})

