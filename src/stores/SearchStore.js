import {defineStore} from "pinia";
import {useMovieStore} from "./MovieStore.js";

const API_KEY = 'https://api.themoviedb.org/3/search/movie?api_key=27a514a19179ed6110468f03d7e8f543&query=';

// Composition API:
import {ref} from 'vue';
export const useSearchStore = defineStore('searchStore', () =>{
    const loader = ref(false);
    const movies = ref([]);
    const getMovies = async function(search){
        loader.value = true;
        const res = await fetch(API_KEY + search)
            .catch(err => {
                console.log('Error with getting film info via API: ' + err);
            });
        const data = await res.json();
        movies.value = data.results;
        loader.value = false;
    }
    const addToUserMovies = function(obj){
        const movieStore = useMovieStore();
        movieStore.movies.push({...obj, isWatched: false});
        movieStore.activeTab = 'Favorite';
    }
    return {
        loader, movies, getMovies, addToUserMovies
    }
});

// Options API:
/*
export const useSearchStore = defineStore('searchStore', {
    state: () => {
        return {
            movies: () => [],
            loader: false,
        }
    },
    actions: {
       async getMovies(search){
           this.loader = true;
           const res = await fetch(API_KEY + search)
               .catch(err => {
               console.log('Error with getting film info via API: ' + err);
           });
           const data = await res.json();
           this.movies = data.results;
           this.loader = false;
       },
       addToUserMovies(obj){
           const movieStore = useMovieStore();
           movieStore.movies.push({...obj, isWatched: false});
           movieStore.activeTab = 'Favorite';
       }
    }
});
*/