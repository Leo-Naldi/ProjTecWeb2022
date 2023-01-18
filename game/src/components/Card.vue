<template>
    <div class="card" style="width: 18rem;">
    <img class="card-img-top" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.La-kOegvtKO1c20JZ2svtAHaF7%26pid%3DApi&f=1&ipt=558e02b26cf2f430dacb1ba6ccbdfd5ae9f95fcf990cf2b19ded14afbf7775a1&ipo=images" alt="Card image cap">
    <div class="card-body">
        <div class="card-title">
            <h1>{{ props.title }}</h1>
        </div>
        <div class="card-text">
            <p>{{ props.text }}</p>
        </div>
        <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
</div>
</template>

<script setup>
    const props = defineProps({
        title: String,
        text: String,
    })
</script>