import typescript from 'rollup-plugin-typescript2';
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import injectProcessEnv from '../../dist/rollup-plugin-inject-process-env.es.js';

export default [{
    input: 'src/index.ts',
    output: [{
        file: 'dist/index.cjs.js',
        format: 'cjs',
    }, {
        file: 'dist/index.es.js',
        format: 'es'
    }, {
        file: 'dist/index.js',
        format: 'umd',
        name: 'myApp'
    }],
    plugins: [
        typescript(),
        injectProcessEnv({ 
            NODE_ENV: 'production',
            SOME_OBJECT: { one: 1, two: [1,2], three: '3' },
            UNUSED: null
        }),
        nodeResolve(),
        commonjs()
    ],
    external: ['fs', 'path']
}]
