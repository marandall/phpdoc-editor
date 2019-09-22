/**
 *
 * @param {phpdoc.Editor} editor
 * @param {object} init
 * @constructor
 */
phpdoc.elements.ReturnTypeNode = function (editor, init) {
    var self = this,
        meta = init.meta || {},
        data = init.data || {},
        type_name = data.type_name || '',
        description_node = new phpdoc.elements.Section(editor, data.description || editor.nullData()),
        element;

    element = editor.makeFeatureBlock('return_type_' + type_name)
        .setTitle('Type of ' + type_name)
        .append([
            $('<h4></h4>').text(type_name),
            description_node.getElement()
        ]);

    this.getElement = function() {
        return element.getElement();
    };

    this.serialize = function () {
        return {
            meta: meta,
            data: {
                type_name: type_name,
                description: description_node.serialize()
            }
        }
    };
};

phpdoc.elements.ReturnTypeNode.CreateWithType = function(editor, type_name) {
   return new phpdoc.elements.ReturnTypeNode(editor, {
       meta: {
         modified: new Date().getTime() / 1000
       },
       data: {
           type_name: type_name
       }
   });
} ;