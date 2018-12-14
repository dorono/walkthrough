module.exports = {
    setupTestFrameworkScriptFile: './test/setup.js',
    snapshotSerializers: ['enzyme-to-json/serializer'],
    testURL: 'http://localhost/',
    moduleDirectories: [
        'node_modules',
        'src',
    ],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/test/fileMock.js',
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
};
