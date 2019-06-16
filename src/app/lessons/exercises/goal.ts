export class Goal {
  isAchieved: boolean;

  constructor(
    public readonly description: string,
    private readonly howToCheck: () => boolean
  ) { }

  check(): boolean {
    return this.isAchieved = this.howToCheck();
  }
}
