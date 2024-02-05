import {defineStore} from "pinia";

// Composition API:
import {ref, computed, watch} from 'vue';
export const useMovieStore = defineStore('movieStore', ()=> {
    const movies = ref([]);
    const activeTab = ref('Favorite');
    const showWatched = ref(false);

    watch(
        ()=> movies,
        (state)=> {
        localStorage.setItem('movies', JSON.stringify(state._value));
    }, {deep: true});

    const moviesOnLocalStorage = localStorage.getItem('movies');
    if(moviesOnLocalStorage){
        movies.value = JSON.parse(moviesOnLocalStorage);
    }

    const setActiveTab = function(nameTab){
        activeTab.value = nameTab;
    }
    const toggleWatched = function(id){
        const idx = movies.value.findIndex(el => el.id === id);
        if(idx < 0) console.log('error with toggling watched status to film ' + id);
        else{
            movies.value[idx].isWatched = !movies.value[idx].isWatched;
        }
    }
    const  removeMovie = function(id){
        movies.value = movies.value.filter(el => el.id !== id);
    }

    const watchedMovies = computed( () => {
        return movies.value.filter(el => el.isWatched);
    });

    const getTotalCountMovies = computed(() => {
        return movies.value.length;
    });

    return {
        movies, activeTab, showWatched,
        setActiveTab, toggleWatched, removeMovie,
        watchedMovies, getTotalCountMovies
    }
});

// Options API:
/*
export const useMovieStore = defineStore('movieStore', {
    state:  () => {
        return {
            movies: [],
            activeTab: 'Favorite',
            showWatched: false,
        }
    },
    getters: {
        watchedMovies: function () {
            return this.movies.filter(el => el.isWatched);
        },
        getTotalCountMovies(){
            return this.movies.length;
        }
    },
    actions: {
        setActiveTab(nameTab){
            this.activeTab = nameTab;
        },
        toggleWatched(id){
            const idx = this.movies.findIndex(el => el.id === id);
            if(idx < 0) console.log('error with toggling watched status to film ' + id);
            else{
                this.movies[idx].isWatched = !this.movies[idx].isWatched;
            }
        },
        removeMovie(id){
            this.movies = this.movies.filter(el => el.id !== id);
        }
    },
});*/
