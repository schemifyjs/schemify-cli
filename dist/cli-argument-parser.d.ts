export declare class CLIArgumentParser {
    private program;
    constructor();
    private setupConfiguration;
    private setupCommands;
    parse(argv?: string[]): Promise<void>;
}
