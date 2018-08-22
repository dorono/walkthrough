module.exports = ctx => ({
    plugins: [
        require('postcss-import')({
            addDependencyTo: ctx.webpack,
            path: [ctx.webpack.options.context],
        }),
        require('postcss-custom-properties')({
            preserve: false,
        }),
        require('postcss-color-function'),
        require('postcss-nested'),
        require('rucksack-css'),
        require('postcss-preset-env')({
            stage: 1,
            browsers: 'last 2 versions, IE >= 10',
        }),
    ],
});
