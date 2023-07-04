import path from "path";
import del from 'rollup-plugin-delete';
import resolve from "rollup-plugin-node-resolve";
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

export default {
    input: pkg.source,
    output: [
        { file: pkg.main, format: 'cjs', },
    ],
    watch: {
        include: [pkg.source, "src/*"],
        exclude: 'node_modules/**'
    },
    plugins: [
        external({
            includeDependencies: true
        }),
        resolve(),
        postcss({
            minimize: true,
            extensions: ['.css'],
            extract: path.resolve('dist/index.css')
        }),
        typescript({
            useTsconfigDeclarationDir: true,
        }),
        del({ targets: ['dist/*'] }),
    ],
    external: Object.keys(pkg.peerDependencies || {})
};
