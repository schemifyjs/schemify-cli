export function registerHelpCommand(program) {
    program
        .helpOption('-h, --help', 'Output usage information.')
        .helpCommand(false);
}
