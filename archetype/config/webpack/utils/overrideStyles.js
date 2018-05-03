const _map = require('lodash/map');

/**
 * Interacts with Electrode's Webpack Composer to add Gemini styles
 * @param  {Object} customStyles A piece of a webpack config object that may contain rules for
 *   styles
 * @param  {Object} composer     From Webpack Composer
 * @return {Void}                Updates by reference
 */
module.exports = function overrideStyles(customStyles, composer) {
    const { _base } = composer.profiles;
    const _extractStyle = _base.partials['_extract-style'];

    _extractStyle.enable = false;

    if (!customStyles.length) return;

    const customPartials = _map(customStyles, (customStyle) => {
        const { _name } = customStyle;
        delete customStyle._name;
        delete customStyle._type;

        _base.partials[_name] = { order: _extractStyle.order };

        return {
            [_name]: { config: { module: { rules: customStyle } } }
        }
    });

    composer.addPartials(customPartials);
}
