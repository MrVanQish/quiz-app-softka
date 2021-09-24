export class Score{

    public points: number;
    public nickname: string;
    public correctAsnwers: number;
    public hitPercentage: string;

    constructor(points: number, nickname: string, correctAsnwers: number){
        this.points	= points;
        this.nickname = nickname;
        this.correctAsnwers = correctAsnwers;
        this.hitPercentage = this.calculateHitPercentage();
    }

    public calculateHitPercentage(){
        return `${(this.correctAsnwers * 100) / 5}%`;
    }

}