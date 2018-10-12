import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import closure from 'rollup-plugin-closure-compiler-js';
import filesize from 'rollup-plugin-filesize';

const babelOptions = {
    babelrc: false,
    exclude: 'node_modules/**',
    presets: [
        [
            '@babel/preset-env',
            {
                modules: false
            }
        ]
    ]
};

const closureOptions = {
    compilationLevel: 'SIMPLE',
    languageOut: 'ECMASCRIPT5_STRICT',
    env: 'CUSTOM',
    processCommonJsModules: false,
    applyInputSourceMaps: true,
    createSourceMap: true
};

function createBundleConfig(fileName, output = {}) {
    return {
        input: `src/${fileName}.js`,
        output: Object.assign(
            {
                file: `lib/${fileName}.js`,
                format: 'cjs',
                sourcemap: true,
                sourcemapFile: `lib/${fileName}.js.map`
            },
            output
        ),
        plugins: [
            resolve(),
            babel(babelOptions),
            closure(closureOptions),
            filesize({
                render: (_, __, { bundleSize, gzipSize }) =>
                    `Bundle size: ${bundleSize}, Gzipped size: ${gzipSize}`
            })
        ]
    };
}

export default [
    createBundleConfig('index', {
        format: 'umd',
        name: 'numberGenerator'
    }),
    createBundleConfig('index', {
        format: 'esm',
        file: 'lib/index.esm.js',
        sourcemapFile: 'lib/index.esm.js.map'
    }),
    createBundleConfig('aleaRNGFactory'),
    createBundleConfig('murmurhash2_x86_32'),
    createBundleConfig('murmurhash3_x86_32')
];
