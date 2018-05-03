module.exports = () => {
    const css = (process.env.NODE_ENV === 'production')
        // .env is loaded in the file that calls this, so NODE_ENV is set/correct
        ? [
            'gemini',
            'semantic-ui',
        ]
        : [];

    return {
        css,
        js: 'gemini',
    };
};
