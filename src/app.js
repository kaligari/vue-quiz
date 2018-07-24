import Vue from 'vue';
import GameQuiz from './components/GameQuiz.vue';

new Vue({
    el: '#app',
    components: {
        'game-quiz': GameQuiz,
    }
});
