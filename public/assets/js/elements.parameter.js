/**
 *
 * @param {phpdoc.Editor} editor
 * @param {object} init
 * @constructor
 */
phpdoc.elements.Parameter = function (editor, init) {
    var _self = this,
        _meta = init.meta || {},
        _state = init.data || {},
        _name = _state.name || '',
        _optional = _state.optional,
        _types = [],
        _element,
        _element_name,
        _element_types,
        _element_optional,
        _element_default_value;

    _element = editor.makeFeatureBlock('param_' + _name)
        .setTitle('Parameter: ' + _name)
        .append([
            _element_name = $('<h3></h3>').text(_name),
            $('<div></div>').append(
                _element_optional = $('<input type="checkbox" />').prop('checked', _state.optional),
                $('<span></span>').text('Optional')
            ),
            $('<div></div>').append(
                _element_default_value = $('<input type="text" />').val(_state.default_value || ''),
                $('<span></span>').text('Default Value')
            ),
            _element_types = $('<div></div>'),
        ])
        .addFooterButton('Declare Type', 'silk/add.png', function (e) {
            let type_name = prompt('Please enter the type');
            if (type_name) {
                _types.push(phpdoc.elements.ParameterType.CreateFromTypeName(editor, type_name));
                updateUi();
            }
        })
        .getElement();

    this.registerType = function (type_config) {
        let t = new phpdoc.elements.ParameterType(editor, type_config);
        _types.push(t);
    };

    /**
     * @return {jQuery}
     */
    this.getElement = function () {
        return _element;
    };

    /**
     * Rebuilds the UI layout to represent the current configuration
     * as it exists in this object
     */

    function updateUi() {
        _element_name.text(init.name);
        _element_types.children().detach();
        $.each(_types, function (ix, type) {
            _element_types.append(type.getElement());
        });
    }

    /**
     * Converts this object and its children into a serializable form
     */

    this.serialize = function () {
        let type_list = [];
        $.each(_types, function (ix, type) {
            type_list.push(type.serialize());
        });

        return {
            meta: _meta,
            data: {
                types: type_list,
                name: _name,
                optional: _element_optional.prop('checked'),
                default_value: _element_default_value.val()
            }
        };
    };

    $.each(_state.types || [], function (ix, type) {
        _self.registerType(type);
    });

    updateUi();
};

phpdoc.elements.Parameter.CreateFromName = function (editor, name, optional) {
    return new phpdoc.elements.Parameter(editor, {
        meta: {
            modified: new Date().getTime() / 1000
        },
        data: {
            name: name,
            optional: optional
        }
    });
};