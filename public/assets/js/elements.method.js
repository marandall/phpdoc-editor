/**
 *
 * @param {phpdoc.Editor} editor
 * @param {object} init
 * @constructor
 */
phpdoc.elements.Method = function (editor, init) {
    var _self = this,
        meta = init.meta || {},
        state = init.data,
        name = state.name,
        description_node = new phpdoc.elements.SectionCollection(editor, state.description || {}),
        examples_node = new phpdoc.elements.SectionCollection(editor, state.examples || {}),
        notes_node = new phpdoc.elements.SectionCollection(editor, state.notes || {}),
        return_types_node = new phpdoc.elements.SectionCollection(editor, state.return_types || {}),
        parameters = [],
        _element,
        _description_element,
        _parameter_elements;

    _element = editor.makeFeatureBlock('method')
        .setTitle('Method')
        .append($('<h1></h1>').text(state.name || ''))
        .append([
            editor.makeFeatureBlock('description')
                .setTitle('Description')
                .append(description_node.getElement())
                .getElement(),

            editor.makeFeatureBlock('parameters')
                .setTitle('Function Parameters')
                .append(_parameter_elements = $('<div></div>'))
                .onClickAdd(function (e) {
                    let name = prompt('Please enter the name of the parameter', 'Enter Name');
                    if (name) {
                        _self.addParameter(phpdoc.elements.Parameter.CreateFromName(editor, name, false));
                    }
                })
                .getElement(),

            editor.makeFeatureBlock('return_types')
                .setTitle('Return Type Information')
                .append(return_types_node.getElement())
                .getElement(),

            editor.makeFeatureBlock('examples')
                .setTitle('Examples')
                .append(examples_node.getElement())
                .getElement(),

            editor.makeFeatureBlock('notes')
                .setTitle('Notes')
                .append(notes_node.getElement())
                .getElement()
        ])
        .getElement();

    this.addParameter = function (p) {
        parameters.push(p);
        _parameter_elements.append(p.getElement());
    };

    function loadParameterFromConfig(param_config) {
        let p = new phpdoc.elements.Parameter(editor, param_config);
        _self.addParameter(p);
    }

    $.each(state.parameters || [], function (ix, param_config) {
        loadParameterFromConfig(param_config);
    });

    this.getElement = function () {
        return _element;
    };

    this.serialize = function () {
        let param_list = [];
        $.each(parameters, function (ix, param) {
            param_list.push(param.serialize());
        });

        return {
            meta: init.meta || {},
            data: {
                name: name,
                description: description_node.serialize(),
                parameters: param_list,
                examples: examples_node.serialize(),
                notes: notes_node.serialize(),
                return_types: return_types_node.serialize()
            }
        };
    };
};

phpdoc.elements.Method.CreateFromName = function (editor, method_name) {
    return new phpdoc.elements.Method(
        editor,
        {
            meta: {
                modified: new Date().getTime() / 1000
            },
            data: {
                name: method_name,
                optional: false
            }
        }
    );
};