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
        purpose_node = new phpdoc.elements.Section(editor, state.purpose || {}),
        description_node = new phpdoc.elements.SectionCollection(editor, state.description || {}),
        examples_node = new phpdoc.elements.SectionCollection(editor, state.examples || {}),
        notes_node = new phpdoc.elements.SectionCollection(editor, state.notes || {}),
        return_value_description = new phpdoc.elements.SectionCollection(editor, state.return_value_description || {}),
        parameters = [],
        return_types = [],
        _return_type_element,
        _element,
        _description_element,
        _parameter_elements;

    _element = editor.makeFeatureBlock('method')
        .setTitle('Method')
        .append($('<h1></h1>').text(state.name || ''))
        .append([
            editor.makeFeatureBlock('Purpose')
                .setTitle('Purpose')
                .append(purpose_node.getElement())
                .getElement(),

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

            editor.makeFeatureBlock('return_value')
                .onClickAdd(function (e) {
                    let name = prompt('Please enter the type of the return value', '');
                    if (name) {
                        _self.addReturnType(phpdoc.elements.ReturnTypeNode.CreateWithType(editor, name));
                    }
                })
                .setTitle('Return Value')
                .append([
                    return_value_description.getElement(),
                    _return_type_element = $('<div></div>')
                ])
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
        .show()
        .getElement();


    /**
     * @param {phpdoc.elements.Parameter} p
     */

    this.addParameter = function (p) {
        parameters.push(p);
        _parameter_elements.append(p.getElement());
    };

    /**
     * @param {phpdoc.elements.ReturnTypeNode} rt
     */
    this.addReturnType = function (rt) {
        return_types.push(rt);
        _return_type_element.append(rt.getElement());
    };

    function loadParameterFromConfig(param_config) {
        let p = new phpdoc.elements.Parameter(editor, param_config);
        _self.addParameter(p);
    }

    $.each(state.parameters || [], function (ix, param_config) {
        loadParameterFromConfig(param_config);
    });

    $.each(state.return_types || [], function (ix, rt_config) {
        _self.addReturnType(new phpdoc.elements.ReturnTypeNode(editor, rt_config));
    });


    this.getElement = function () {
        return _element;
    };

    this.serialize = function () {
        let param_list = [],
            return_type_list = [];

        $.each(parameters, function (ix, param) {
            param_list.push(param.serialize());
        });

        $.each(return_types, function (ix, rt) {
            return_type_list.push(rt.serialize());
        });

        return {
            meta: init.meta || {},
            data: {
                name: name,
                purpose: purpose_node.serialize(),
                description: description_node.serialize(),
                parameters: param_list,
                examples: examples_node.serialize(),
                notes: notes_node.serialize(),
                return_value_description: return_value_description.serialize(),
                return_types: return_type_list
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