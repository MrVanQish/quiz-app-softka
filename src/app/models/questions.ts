export class ResultsQuestions {

    public results: Array<Questions>;

    constructor(results: Array<Questions>){
        this.results = results;
    }

}

export class Questions{
    
    public category : string;
    public type : string;
    public difficulty : string;
    public question : string;
    public correct_answer : string;
    public incorrect_answers : Array<String>


    constructor(category : string, type: string, difficulty: string, question: string, correct_answer: string, incorrect_answers: Array<String> ){
        this.category = category;
        this.type = type;
        this.difficulty = difficulty;
        this.question = question;
        this.correct_answer = correct_answer;
        this.incorrect_answers = incorrect_answers;
    }
}
