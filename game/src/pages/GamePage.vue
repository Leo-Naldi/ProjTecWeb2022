<template>
  <div class="container-fluid">
    <h1> Sono l'impiccato </h1>
    <Card 
      :title="tit"
      :text="tex"
    />
  </div>
    
</template>
  
  <script>
  import Card from '@/components/Card.vue'
  
  export default {
    name: 'GamePage',
    components: {
      Card
    },

    data() {
      return {
        tit: "L'impiccato",
        tex: "Questo è il classico gioco dell'impiccato"
      }
    }
  }
  </script>
  
  <style>
  
  </style>