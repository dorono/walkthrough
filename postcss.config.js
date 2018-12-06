module.exports = ctx => {
    return {
        plugins: [
            require('postcss-import')({
                path: [`${ctx.cwd}/src`, ctx.webpack.context],
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
    };
};
