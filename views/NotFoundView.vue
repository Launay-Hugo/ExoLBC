<script setup>
import { RouterLink } from 'vue-router';

</script>
<template>
<h1>404</h1>
<h2>Perdu dans les <span>RAYONS !</span></h2>
<p>Désolés, on a cherché dans tous les coins, on n'a pas trouvé la bonne page.</p>
<p><RouterLink :to="{name : 'home'}"><font-awesome-icon :icon="['fas', 'arrow-left']" />Retour à l'accueil</RouterLink></p>

</template>
<style scoped>

</style>