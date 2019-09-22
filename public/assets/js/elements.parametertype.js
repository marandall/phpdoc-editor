/**
 *
 * @param {phpdoc.Editor} editor
 * @param {object} init
 * @constructor
 */
phpdoc.elements.ParameterType = function (editor, init) {
    var _state = init.data || {},
        meta = init.meta || {},
        type_label = _state.type_name || '',
        description = new phpdoc.elements.SectionCollection(editor, _state.description || editor.nullData()),
        _element;

    /**
     * @return {string}
     */
    this.getTypeLabel = function () {
        return type_label;
    };

    /**
     * @return {jQuery}
     */

    this.getElement = function () {
        return _element;
    };

    /**
     * Returns the configuration of this node and its children
     * @return {object}
     */
    this.serialize = function () {
        return {
            meta: meta,
            data: {
                type_name: type_label,
                description: description.serialize()
            }
        }
    };

    _element = editor.makeFeatureBlock('type_' + type_label)
        .setTitle('Type of ' + type_label)
        .append([
            $('<h4></h4>').text(type_label),
            description.getElement()
        ])
        .getElement();
};

/**
 * @param {phpdoc.Editor} editor
 * @param {string} type_name
 * @constructor
 */
phpdoc.elements.ParameterType.CreateFromTypeName = function (editor, type_name) {
    return new phpdoc.elements.ParameterType(editor, {
        meta: {
            modified: new Date().getTime() / 1000
        },
        data: {
            type_name: type_name
        }
    })
};