export class ExerciseGoal {
  isAchieved: boolean;

  constructor(
    public readonly description: string,
    private readonly howToCheck: () => boolean,
    public readonly setUp: () => void = () => { },
    public readonly tearDown: () => void = () => { },
  ) { }

  check(): boolean {
    return this.isAchieved = this.howToCheck();
  }
}
