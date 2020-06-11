import typescript from 'rollup-plugin-typescript2';
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import injectProcessEnv from '../../dist/rollup-plugin-inject-process-env.es.js';
import postcss from 'rollup-plugin-postcss';

export default [{
    input: ['src/index.3.ts'],
    output: [{
        file: 'dist/index.3.js',
        format: 'umd',
        name: 'myApp'
    }],
    plugins: [
        typescript(),
        injectProcessEnv({
            NODE_ENV: 'production',
            SOME_OBJECT: { one: 1, two: [1,2], three: '3' },
            UNUSED: null
        }, {
            exclude: '**/*.css',
            verbose: true
        }),
        nodeResolve(),
        commonjs(),
        postcss({
            inject: true,
            minimize: true,
            plugins: [],
        }),
    ],
    external: ['fs', 'path']
}]
