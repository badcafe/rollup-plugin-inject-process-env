import babel from "rollup-plugin-babel";
import injectProcessEnv from '../../dist/rollup-plugin-inject-process-env.es.js';
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default {
    input: 'build/index.js',
    output: {
        file: 'dist/index.iife.js',
        format: 'iife',
        name: 'myApp',
        sourcemap: true,
    },
    plugins: [
        nodeResolve({
            browser: true,
        }),
        commonjs({
            include: "node_modules/**",
        }),
        injectProcessEnv({
            NODE_ENV: 'production',
            SOME_OBJECT: { one: 1, two: [1, 2], three: '3' },
            UNUSED: null
        }),
        babel({
            exclude: [/\/core-js\//],
            babelrc: false,
            presets: [
                [
                    "@babel/preset-env",
                    {
                        corejs: 3,
                        modules: false,
                        useBuiltIns: "usage",
                        targets: {
                            ie: "11",
                        },
                    },
                ],
            ],
        }),
    ],
};
