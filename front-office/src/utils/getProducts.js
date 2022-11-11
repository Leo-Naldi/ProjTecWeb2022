function getProducts(num) {
    let res = []

    for (let i = 0; i < num; i++){
        res.push({
            id: i,
        });
    }

    return res;
}

export default getProducts;