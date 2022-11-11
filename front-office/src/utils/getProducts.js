function getProducts(num) {
    let res = []

    for (let i = 0; i < num; i++){
        res.push({
            id: i,
            img: "https://source.unsplash.com/random",
            name: `Product Number ${i}`,
            price: (i+1)*10,
        });
    }

    return res;
}

export default getProducts;