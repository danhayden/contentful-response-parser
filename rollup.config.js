import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
import {minify} from 'uglify-js-harmony'
import fs from 'fs'
const pkg = JSON.parse(fs.readFileSync('./package.json'))

export default {
  entry: 'src/contentful-response-parser.js',
  moduleName: 'contentfulResponseParser',
  targets: [
    {dest: pkg.main, format: 'cjs'},
    {dest: pkg.module, format: 'es'},
    {dest: pkg['umd:main'], format: 'umd'}
  ],
  plugins: [
    resolve(),
    babel({exclude: 'node_modules/**'}),
    uglify({}, minify)
  ]
}
