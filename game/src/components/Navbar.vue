<template>
<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" :href="NavLink" @click="navigate"> {{ NavName }} </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link active" aria-current="page" :to="home.link">{{ home.name }}</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="games.link">{{ games.name }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>

<script>
export default {
  name: 'Navbar',
  props: {

  },

  data() {
    return {
      NavLink: "#",
      NavName: "Animal House",

      home: {
        name: "Home",
        link: "/",
      },

      games: {
        name: "Games",
        link: "/games"
      },
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  
</style>
