/**
 * @param {phpdoc.Editor} editor
 * @param {object} init
 * @constructor
 */
phpdoc.elements.SectionCollection = function (editor, init) {
    var _self = this,
        _meta = init.meta || {},
        _state = init.data || {},
        _blocks = [],
        _element,
        _content_element = $('<div></div>');


    this.addBlock = function(block) {
        _blocks.push(block);
        _content_element.append(block.getElement());
    };

    function loadBlockFromConfiguration(block_config) {
        let b = new phpdoc.elements.Section(editor, block_config);
        _self.addBlock(b);
    }

    _element = editor.makeFeatureBlock('section')
        .setTitle('Text Content Collection')
        .append(_content_element)
        .onClickAdd(function(e) {
            let b = phpdoc.elements.Section.CreateEmptyBlock(editor);
            _self.addBlock(b);
        })
        .getElement();

    this.getElement = function () {
        return _element;
    };

    /**
     * Returns the configuration of this object and its childrne
     * @return {object}
     */
    this.serialize = function() {
        var block_list = [];
        $.each(_blocks, function(ix, block) {
            block_list.push(block.serialize());
        });

        return {
            meta: _meta,
            data: {
                blocks: block_list
            }
        }
    };

    $.each(_state.blocks || [], function(ix, block_config) {
        loadBlockFromConfiguration(block_config);
    });
};