<script setup>
import {ref} from 'vue';
import {useSearchStore} from "../stores/SearchStore.js";
import LoaderComponent from "./LoaderComponent.vue";
import MovieComponent from "./MovieComponent.vue";

const searchMovie = ref('');
const searchStore = useSearchStore();

</script>

<template>
  <form @submit.prevent="searchStore.getMovies(searchMovie)">
    <input
        class="search-input"
        type="text"
        placeholder="Search..."
        v-model="searchMovie">
  </form>
  <LoaderComponent v-if="searchMovie.loader === true"/>
  <div v-else>
    <MovieComponent v-for="movie of searchStore.movies"
                    :key="movie.id"
                    :movie="movie"
                    :is-searched="true"/>
  </div>

</template>

<style scoped>
  .search-input{
    border: 1px solid #e7e7e7;
    width: 100%;
    height: 40px;
    padding: 0 10px;
    margin-bottom: 20px;
    border-radius: 10px;
  }
  .search-input:focus{
    border: 1px solid #00bd7e;
    outline: none;
  }
</style>