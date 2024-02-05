<script setup>
import {useMovieStore} from "./stores/MovieStore.js";
import MovieComponent from "./components/MovieComponent.vue";
import SearchComponent from "./components/SearchComponent.vue";
const movieStore = useMovieStore();

const setTab = (nameTab) => {
  movieStore.setActiveTab(nameTab);
}
</script>

<template>
  <main>
    <header class="header">
      <img src="../public/logo.svg" alt="logo" class="header-logo"/>
      <h2>My favorite movies</h2>
    </header>
    <div class="tabs">
      <button :class="['btn', {'btn_green': movieStore.activeTab === 'Favorite'}]"
              @click="setTab('Favorite')">Favorite
      </button>
      <button :class="['btn', {'btn_green': movieStore.activeTab === 'Search'}]"
              @click="setTab('Search')">Search
      </button>
    </div>
    <div class="movies" v-if="movieStore.activeTab === 'Favorite'">
      <input id="checkWatch" type="checkbox" v-model="movieStore.showWatched">
      <label for="checkWatch">Show watched films</label>
      <template v-if="movieStore.showWatched">
        <h3>Watched Movies: {{movieStore.watchedMovies.length}}</h3>
        <MovieComponent v-for="movie of movieStore.watchedMovies"
                        :key="movie.id"
                        :movie="movie"/>
      </template>
      <template v-else>
        <h3>All Movies: {{movieStore.getTotalCountMovies}}</h3>
        <MovieComponent v-for="movie of movieStore.movies"
                        :key="movie.id"
                        :movie="movie"/>
      </template>
    </div>
    <div class="search" v-else>
      <SearchComponent/>
    </div>
  </main>
</template>

<style lang="css">
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
.header-logo {
  max-width: 50px;
  margin-right: 10px;
}
.btn {
  border: none;
  width: 100px;
  height: 40px;
  font-size: 14px;
  margin: 0 10px;
  border-radius: 10px;
  cursor: pointer;
  background: #efefef;
}
.btn:hover {
  opacity: 0.7;
}
.btn_green {
  background: #37df5c;
}

.tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}
</style>
