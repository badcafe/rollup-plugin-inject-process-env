import MagicString from 'magic-string';
import { Plugin } from 'rollup';

const name = 'rollup-plugin-inject-process-env';

// The virtual id for our shared "process" mock.
// We prefix it with \0 so that other plugins ignore it
const VIRTUAL_MODULE_ID = `\0${ name }`;

export default function rollupPluginInjectProcessEnv(env = {}): Plugin {
    return {
        name,
        transform(code: string, id: string) {
            // Each module except our virtual module gets the process mock injected.
            // Tree-shaking will make sure the import is removed from most modules later.
            // This will produce invalid code if a module defines a top-level "process" variable, so beware!
            if (id !== VIRTUAL_MODULE_ID) {
                const magicString = new MagicString(code);
                magicString.prepend(`import * as process from '${VIRTUAL_MODULE_ID}';\n`);
                return {
                    code: magicString.toString(),
                    map: magicString.generateMap({ hires: true })
                };
            }
        },
        resolveId(id: string) {
            // this tells Rollup not to try to resolve imports from our virtual id
            if (id === VIRTUAL_MODULE_ID) {
                return VIRTUAL_MODULE_ID;
            }
        },
        load(id: string) {
            if (id === VIRTUAL_MODULE_ID) {
                // All fields of 'process' we want to mock are top level exports of the module.
                // For now I hardcoded "NODE_ENV" but you probably want to put more logic here.
                return `export const env = ${ JSON.stringify(env) }`;
            }
            return null;
        },
    };
}
