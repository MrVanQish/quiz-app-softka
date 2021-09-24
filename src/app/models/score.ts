export class Score{
    public points: number;
    public nickname: string;
    public correctAsnwers: number;
    public hitPercentage: string;

    constructor(points: number, nickname: string, correctAsnwers: number, hitPercentage : string ){
        this.points	= points;
        this.nickname = nickname;
        this.correctAsnwers = correctAsnwers;
        this.hitPercentage = hitPercentage;
    }
}