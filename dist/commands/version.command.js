import { version as CLIVersion } from '../version.js';
export function registerVersionCommand(program) {
    program
        .name('schemify')
        .usage('<command> [options]')
        .version(CLIVersion, '-v, --version', 'Output the current version.');
}
