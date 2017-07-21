const cssnext = require('postcss-cssnext')({browsers: 'last 5 versions, IE >= 10'});

module.exports = ctx => ({
    plugins: [
        require('postcss-smart-import')({
            addDependencyTo: ctx.webpack,
            path: [ctx.webpack.options.context],
        }),
        ...cssnext.plugins,
        require('rucksack-css'),
    ],
});
