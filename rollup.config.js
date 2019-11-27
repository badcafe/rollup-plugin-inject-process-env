import typescript from 'rollup-plugin-typescript2';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import pkg from './package.json';

export default [{
	input: 'src/index.ts',
	output: [{
		file: pkg.main,
		format: 'cjs'
	}, {
		file: pkg.module,
		format: 'es'
	}],
	plugins: [
		typescript(),
		nodeResolve(),
		commonjs()
	],
	external: ['fs', 'path']
}];
