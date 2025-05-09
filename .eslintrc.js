module.exports = {
    // ...existing configuration...
    settings: {
        'import/resolver': {
            alias: {
                map: [
                    ['@', './src/renderer']
                ],
                extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue']
            }
        }
    }
};