const categories = [
    'giocattoli',
    'igene',
    'accessori',
    'cibo',
    'armi di distruzione di massa',
];

export function getCategories() {

    return new Promise((resolve, reject) => resolve(categories));
}

export function getProducts(num) {
    let res = []

    for (let i = 0; i < num; i++){
        res.push({
            id: i,
            img: "https://source.unsplash.com/random",
            name: `Product Number ${i}`,
            price: (i+1)*10,
            categories: [],
            pet_types: [],
        });
    }

    return new Promise((resolve, reject) => resolve(res));
}

export default getProducts;