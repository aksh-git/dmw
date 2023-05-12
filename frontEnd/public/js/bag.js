let bag = {
    items : []
}

function saveBag(nbag){
    localStorage.setItem('dmw-bag',JSON.stringify(nbag));
}
function getBag(){
    return JSON.parse(localStorage.getItem('dmw-bag'));
}
function emptyBag(){
    localStorage.setItem('dmw-bag',JSON.stringify(bag));
}

const ITEMS_PRICE = {
    S : 270,
    M : 310,
    L : 375,
    XL : 425,
    XXL : 450
}