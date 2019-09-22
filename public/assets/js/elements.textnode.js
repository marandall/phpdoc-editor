/**
 *
 * @param {phpdoc.Editor} editor
 * @param {object} init
 * @constructor
 */
phpdoc.elements.TextNode = function(editor, parent, config) {
    let _element = $('<textarea style="width: 100%; height: 100px"></textarea>'),
        _display_element = _element;

    this.getNodeType = function() {
        return 'text';
    };

    this.getElement = function() {
        return _element;
    };
};