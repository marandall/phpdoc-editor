/**
 *
 * @param {phpdoc.Editor} editor
 * @param {object} init
 * @constructor
 */
phpdoc.elements.Section = function (editor, init) {
    let self = this,
        meta = init.meta || {},
        data = init.data || {},
        languages = [],
        element,
        translations_element;

    element = editor.makeFeatureBlock('block')
        .setTitle('Text Section')
        .append(translations_element = $('<div></div>'))
        .addFooterButton('Add or Translate', 'silk/add.png', function(e) {
            let menu = new pfw.ui.ContextMenu({title: 'Select Language'});
            $.each(editor.getLanguageList(), function(code, name) {
                menu.add(name, '', function() {
                    if (self.isLanguageUsed(code)) {
                        alert(name + ' already has a translation defined');
                        return;
                    }

                    let bt = phpdoc.elements.SectionChild.CreateLanguageBlock(editor, code, '');
                    self.addTranslatedText(bt)
                });
            });

            menu.show(e.pageX, e.pageY);
        })
        .getElement();

    this.isLanguageUsed = function(lang_code) {
        let i = 0;
        for (i = 0; i < languages.length; i++) {
            if (languages[i].getLanguage() === lang_code) {
                return true;
            }
        }

        return false;
    };

    this.addTranslatedText = function (tb) {
        translations_element.append(tb.getElement());
        languages.push(tb);
    };

    function addLanguageByConfiguration(lang_config) {
        self.addTranslatedText(
            new phpdoc.elements.SectionChild(editor, lang_config)
        );
    }

    this.getElement = function () {
        return element;
    };

    /**
     * Returns the configuration data of this node and its children
     * @return {object}
     */

    this.serialize = function() {
        let block_list = {};
        $.each(languages, function(ix, language) {
            block_list[language.getLanguage()] = language.serialize();
        });

        return {
            meta: meta,
            data: {
                translations: block_list
            }
        };
    };

    $.each(data.translations, function(ix, block) {
       addLanguageByConfiguration(block);
    });
};

phpdoc.elements.Section.CreateEmptyBlock = function (editor) {
    return new phpdoc.elements.Section(editor, {
        meta: {
            modified: new Date().getTime() / 1000
        },
        data: {
            languages: []
        }
    })
};

/**
 *
 * @param {phpdoc.Editor} editor
 * @param {object} init
 * @constructor
 */

phpdoc.elements.SectionChild = function (editor, init) {
    var self = this,
        meta = init.meta || {},
        state = init.data || {},
        language = state.lang || 'en',
        format = state.format || 'text',
        contents = state.contents || '',
        element,
        editor_element;

    element = editor.makeFeatureBlock(language)
        .setTitle('Translation: ' + language + ' (' + format + ')')
        .append(editor_element = $('<textarea style="width: 100%; height: 100px">').val(contents))
        .getElement();

    /**
     * Returns the language that this text block is written in
     * @return {string}
     */
    this.getLanguage = function () {
        return language;
    };

    /**
     * Returns the rendering element for this block
     * @return {jQuery}
     */
    this.getElement = function () {
        return element;
    };

    /**
     * Returns the contents of this node and its children
     * @return {object}
     */

    this.serialize = function () {
        return {
            meta: meta,
            data: {
                lang: language,
                format: format,
                contents: editor_element.val()
            }
        }
    };
};

phpdoc.elements.SectionChild.CreateLanguageBlock = function (editor, language, text) {
    return new phpdoc.elements.SectionChild(editor, {
        meta: {
            modified: new Date().getTime() / 1000
        },
        data: {
            lang: language,
            format: 'text',
            contents: ''
        }
    })
};