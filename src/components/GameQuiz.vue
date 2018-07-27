<template>
    <div id="game-quiz">
        <div class="quiz-header">
            Your points: {{ points }}
        </div>
        <div class="question" v-for="question,key in questions" v-if="key == currentQuestion && !isFinished">
            <h2 class="question-title">Question {{ key+1 }} of {{ total }} - {{ question.question }}</h2>
            <div class="field" v-for="answer,answerKey in question.answers">
                <div class="control">
                    <label class="radio">
                        <input type="radio" :name="'question-'+key" :value="answer.points" @click="selectAnswer(key,answer.points)" v-model="answers[currentQuestion]">
                        {{ answer.answer }}
                    </label>
                </div>
            </div>
        </div>
        <div class="result" v-if="isFinished">
            <h2>Quiz result</h2>
            <p>You collect {{ points }} points.</p>
            <p v-for="result,key in results" v-if="showResult(key,result.points)">{{ result.message }}</p>
            <button class="button" @click="restartQuiz">Restart</button>
        </div>
        <div class="quiz-navigation" v-if="!isFinished">
            <button class="button" @click="prevQuestion" :disabled="isFirst">Previous</button>
            <button class="button is-primary" @click="nextQuestion" v-if="isBeforeTotal" :disabled="answers[currentQuestion] == null">Next</button>
            <button class="button is-primary" @click="isFinished = true" v-if="isLast" :disabled="answers[currentQuestion] == null">Finish</button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            currentQuestion: 0,
            points: 0,
            answers: Array(this.total).fill(null),
            isFinished: false,
        }
    },
    props:{
        questions:{
            type: Array,
            required: true
        },
        results:{
            type: Array,
            required: true
        },
    },
    computed: {
        total(){
          return this.questions.length;
        },
        isBeforeTotal(){
            return this.currentQuestion < this.total-1;
        },
        isAfterStart(){
            return this.currentQuestion > 0;
        },
        isFirst(){
            return this.currentQuestion == 0;
        },
        isLast(){
            return this.currentQuestion == this.total-1;
        },
    },
    methods:{
        nextQuestion(){
            if(this.isBeforeTotal){
                this.currentQuestion++;
            }
        },
        prevQuestion(){
            if(this.isAfterStart){
                this.currentQuestion--;
            }
        },
        selectAnswer(key,points){
            this.answers[key] = points;
            this.points = this.answers.reduce((a, b) => {return a+b;});
        },
        showResult(key, points){
            let min = key == 0 ? 0 : this.results[key-1].points;
            return (this.points > min && this.points <= points);
        },
        restartQuiz(){
            this.isFinished = false;
            this.points = 0;
            this.currentQuestion = 0;
            this.answers.fill(null);
        }
    }
}
</script>

<style lang="less">
#game-quiz{
    .quiz-header{
        font-weight: bold;
        text-align: center;
        margin-bottom: 50px;
    }
    .question{
        .question-title{
            text-decoration: underline;
            font-weight: bold;
            margin-bottom: 30px;
        }
    }
    .quiz-navigation{
        margin-top: 50px;
    }
    .result{
        button{
            margin-top: 50px;
        }
    }
}
</style>
