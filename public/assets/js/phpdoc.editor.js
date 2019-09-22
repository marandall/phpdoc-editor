var phpdoc = {
    elements: {},
    renderers: {}
};

var config_data = {
    "meta": {},
    "data": {
        "name": "",
        "purpose": {
            "meta": {},
            "data": {
                "translations": {
                    "en": {
                        "meta": {
                            "modified": 1569165209.015
                        },
                        "data": {
                            "lang": "en",
                            "format": "text",
                            "contents": "Finds the length of the initial segment of a string consisting entirely of characters contained within a given mask"
                        }
                    }
                }
            }
        },
        "description": {
            "meta": {},
            "data": {
                "blocks": [
                    {
                        "meta": {},
                        "data": {
                            "translations": {
                                "en": {
                                    "meta": {},
                                    "data": {
                                        "lang": "en",
                                        "format": "text",
                                        "contents": "Finds the length of the initial segment of subject that contains only characters from mask.\n\nIf start and length are omitted, then all of subject will be examined. If they are included, then the effect will be the same as calling strspn(substr($subject, $start, $length), $mask) (see substr for more information)."
                                    }
                                },
                                "fr": {
                                    "meta": {
                                        "modified": 1569170093.2
                                    },
                                    "data": {
                                        "lang": "fr",
                                        "format": "text",
                                        "contents": "Trouve la longueur du segment initial de subject qui contient uniquement les caractères depuis le masque mask.\n\nSi les paramètres start et length sont omis, alors toutes les chaînes subject seront analysées. S'ils sont fournis, alors les effets seront identiques à appeler strspn(substr($subject, $start, $length), $mask) (voir substr pour plus d'informations)."
                                    }
                                }
                            }
                        }
                    }
                ]
            }
        },
        "parameters": [
            {
                "meta": {},
                "data": {
                    "types": [
                        {
                            "meta": {},
                            "data": {
                                "type_name": "string",
                                "description": {
                                    "meta": {},
                                    "data": {
                                        "blocks": [
                                            {
                                                "meta": {},
                                                "data": {
                                                    "translations": {
                                                        "en": {
                                                            "meta": {},
                                                            "data": {
                                                                "lang": "en",
                                                                "format": "text",
                                                                "contents": "The string to examine."
                                                            }
                                                        },
                                                        "fr": {
                                                            "meta": {
                                                                "modified": 1569182561.092
                                                            },
                                                            "data": {
                                                                "lang": "fr",
                                                                "format": "text",
                                                                "contents": "La chaîne à analyser."
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    ],
                    "name": "subject",
                    "optional": false,
                    "default_value": ""
                }
            },
            {
                "meta": {},
                "data": {
                    "types": [
                        {
                            "meta": {},
                            "data": {
                                "type_name": "string",
                                "description": {
                                    "meta": {},
                                    "data": {
                                        "blocks": [
                                            {
                                                "meta": {},
                                                "data": {
                                                    "translations": {
                                                        "en": {
                                                            "meta": {},
                                                            "data": {
                                                                "lang": "en",
                                                                "format": "text",
                                                                "contents": "The list of allowable characters."
                                                            }
                                                        },
                                                        "fr": {
                                                            "meta": {
                                                                "modified": 1569182574.522
                                                            },
                                                            "data": {
                                                                "lang": "fr",
                                                                "format": "text",
                                                                "contents": "La liste des caractères autorisés."
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    ],
                    "name": "mask",
                    "optional": false,
                    "default_value": ""
                }
            },
            {
                "meta": {},
                "data": {
                    "types": [
                        {
                            "meta": {},
                            "data": {
                                "type_name": "int",
                                "description": {
                                    "meta": {},
                                    "data": {
                                        "blocks": [
                                            {
                                                "meta": {},
                                                "data": {
                                                    "translations": {
                                                        "en": {
                                                            "meta": {},
                                                            "data": {
                                                                "lang": "en",
                                                                "format": "text",
                                                                "contents": "The position in <parameter>subject</parameter> to start searching.\n\nIf <parameter>start</parameter> is given and is non-negative, then <function>strspn</function> will begin examining <parameter>subject</parameter> at the <parameter>start</parameter> 'th position. For instance, in the string ' <literal>abcdef</literal> ', the character at position <literal>0</literal> is ' <literal>a</literal> ', the character at position <literal>2</literal> is ' <literal>c</literal> ', and so forth.\n\nIf <parameter>start</parameter> is given and is negative, then <function>strspn</function> will begin examining <parameter>subject</parameter> at the <parameter>start</parameter> 'th position from the end of <parameter>subject</parameter> ."
                                                            }
                                                        },
                                                        "fr": {
                                                            "meta": {
                                                                "modified": 1569182591.118
                                                            },
                                                            "data": {
                                                                "lang": "fr",
                                                                "format": "text",
                                                                "contents": "La position dans la chaîne subject à partir de laquelle nous devons chercher.\n\nSi start est fourni et n'est pas négatif, alors strspn() commencera à analyser la chaîne subject à la position start. Par exemple, dans la chaîne 'abcdef', le caractère à la position 0 est 'a', le caractère à la position 2 est 'c', et ainsi de suite.\n\nSi start est fourni et est négatif, alors strspn() commencera à analyser la chaîne subject à la position start depuis la fin de la chaîne subject."
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    ],
                    "name": "start",
                    "optional": true,
                    "default_value": ""
                }
            },
            {
                "meta": {},
                "data": {
                    "types": [
                        {
                            "meta": {},
                            "data": {
                                "type_name": "int",
                                "description": {
                                    "meta": {},
                                    "data": {
                                        "blocks": [
                                            {
                                                "meta": {},
                                                "data": {
                                                    "translations": {
                                                        "en": {
                                                            "meta": {},
                                                            "data": {
                                                                "lang": "en",
                                                                "format": "text",
                                                                "contents": "The length of the segment from <parameter>subject</parameter> to examine.\n\nIf <parameter>length</parameter> is given and is non-negative, then <parameter>subject</parameter> will be examined for <parameter>length</parameter> characters after the starting position.\n\nIf <parameter>length</parameter> is given and is negative, then <parameter>subject</parameter> will be examined from the starting position up to <parameter>length</parameter> characters from the end of <parameter>subject</parameter> ."
                                                            }
                                                        },
                                                        "fr": {
                                                            "meta": {
                                                                "modified": 1569182607.232
                                                            },
                                                            "data": {
                                                                "lang": "fr",
                                                                "format": "text",
                                                                "contents": "La longueur de la chaîne à analyser.\n\nSi length est fourni et n'est pas négatif, alors subject sera examiné sur length caractères après la position de départ.\n\nSi length est fourni et est négatif, alors subject sera examiné sur length caractères depuis la fin de la chaîne subject."
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    ],
                    "name": "length",
                    "optional": true,
                    "default_value": ""
                }
            }
        ],
        "examples": {
            "meta": {},
            "data": {
                "blocks": [
                    {
                        "meta": {
                            "modified": 1569169917.548
                        },
                        "data": {
                            "translations": {
                                "en": {
                                    "meta": {
                                        "modified": 1569169920.867
                                    },
                                    "data": {
                                        "lang": "en",
                                        "format": "text",
                                        "contents": "<?php\n// subject does not start with any characters from mask\nvar_dump(strspn(\"foo\", \"o\"));\n\n// examine two characters from subject starting at offset 1\nvar_dump(strspn(\"foo\", \"o\", 1, 2));\n\n// examine one character from subject starting at offset 1\nvar_dump(strspn(\"foo\", \"o\", 1, 1));\n?>"
                                    }
                                }
                            }
                        }
                    }
                ]
            }
        },
        "notes": {
            "meta": {},
            "data": {
                "blocks": [
                    {
                        "meta": {
                            "modified": 1569169852.063
                        },
                        "data": {
                            "translations": {
                                "en": {
                                    "meta": {
                                        "modified": 1569169858.404
                                    },
                                    "data": {
                                        "lang": "en",
                                        "format": "text",
                                        "contents": "This is some random example of notes"
                                    }
                                }
                            }
                        }
                    }
                ]
            }
        },
        "return_value_description": {
            "meta": {},
            "data": {
                "blocks": [
                    {
                        "meta": {
                            "modified": 1569180929.538
                        },
                        "data": {
                            "translations": {}
                        }
                    }
                ]
            }
        },
        "return_types": [
            {
                "meta": {
                    "modified": 1569164469.462
                },
                "data": {
                    "type_name": "string",
                    "description": {
                        "meta": {},
                        "data": {
                            "translations": {}
                        }
                    }
                }
            },
            {
                "meta": {
                    "modified": 1569164472.182
                },
                "data": {
                    "type_name": "false",
                    "description": {
                        "meta": {},
                        "data": {
                            "translations": {
                                "en": {
                                    "meta": {
                                        "modified": 1569164476.928
                                    },
                                    "data": {
                                        "lang": "en",
                                        "format": "text",
                                        "contents": "An error has occurred"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        ]
    }
};


/**
 * @constructor
 */
phpdoc.Editor = function (jParent, init) {
    var self = this,
        sections = [],
        last_json = '',
        renderer = new phpdoc.renderers.Method();

    this.nullData = function () {
        return {
            meta: {},
            data: {}
        };
    };

    /**
     * @return {phpdoc.Editor.FeatureBlock}
     */
    this.makeFeatureBlock = function (id) {
        return new phpdoc.Editor.FeatureBlock(this, '', id);
    };

    let load_config = JSON.parse(window.localStorage.getItem('latest_config_2')) || config_data;

    var panel_container = $('#previews');

    function showPreviewPanel(panel_id) {
        panel_container.children().hide();
        panel_container.find('.panel-' + panel_id).show();
    }

    $('#show-preview').click(function () {
        showPreviewPanel('html');
    });

    $('#show-json').click(function () {
        showPreviewPanel('json');
    });

    var method = new phpdoc.elements.Method(this, load_config);
    jParent.append(method.getElement());

    this.changed = function () {
        let serialized = method.serialize(),
            json = JSON.stringify(serialized, null, 4);

        if (json !== last_json) {
            let html = renderer.render(serialized);

            $('#json-preview').val(json);
            $('#html-preview').children().detach();
            $('#html-preview').append(html);

            last_json = json;
            window.localStorage.setItem('latest_config_2', JSON.stringify(serialized));
        }
    };

    this.getLanguageList = function () {
        return {
            'en': 'English (Default)',
            'fr': 'French'
        };
    };

    setInterval(function () {
        self.changed();
    }, 1000);
};


phpdoc.Editor.FeatureBlock = function (editor, label, id) {
    var self = this,
        state = {
            title: label,
        },
        events = {
            onClickAdd: {
                icon: null,
                callback: null
            }
        },
        element,
        menu_bar,
        menu_title,
        menu_tools,
        content_area,
        tool_area,
        visible_state_icon;

    element = $('<div style="border: 1px solid #eeeeee; margin-bottom: 5px"></div>').append(
        menu_bar = $('<div class="fbar-title"></div>')
            .append(
                visible_state_icon = $('<img style="margin-right: 5px; vertical-align: center">'),
                menu_title = $('<span style="cursor: pointer"></span>').text(label),
                menu_tools = $('<span style="float: right"></span>')
            ).click(function () {
                content_area.is(':visible') ? self.hide() : self.show();
            }),
        content_area = $('<div class="fbar-content-area" style="padding: 10px"></div>').append(top || {}),
        tool_area = $('<div style="padding: 5px; padding-top: 0px; text-align: right; display: none;"></div>'),
        $('<div style="clear: both"></div>')
    );

    /**
     * Returns the top level element which represents this section, everything else will
     * be contained within it, the children can be manipulated by their owner but everything
     * else should only be manipulated via this class
     *
     * @return {jQuery}
     */

    this.getElement = function () {
        return element;
    };

    this.getId = function () {
        return id;
    };

    /**
     * @param {string} title
     * @return {phpdoc.Editor.FeatureBlock}
     */
    this.setTitle = function (title) {
        state.title = title;
        menu_title.text(title || '');
        return self;
    };

    /**
     * Removes the title bar and padding from around this item
     * @return {phpdoc.Editor.FeatureBlock}
     */

    this.compact = function() {
        menu_bar.hide();
        element.css('border', '0px');
        content_area.css('margin-left', 0).css('margin-right', 0).css('margin-top', 0).css('padding', 0);
        return self;
    };

    /**
     * Adds a button at the bottom of the feature area
     *
     * @param {string} label
     * @param {string} icon
     * @param {function} callback
     */

    this.addFooterButton = function(label, icon, callback) {
        let btn = $('<span class="fe-button" ></span>').append(
            $('<img style="margin-right: 3px" />').attr('alt', label).attr('src', '/assets/icons/' + icon),
            $('<span style="font-size: smaller"></span>').text(label)
        ).click(function(e) {
            callback.call(null, e);
        });

        tool_area.append(btn);
        if (content_area.is(':visible')) {
            tool_area.show();
        }

        return self;
    };

    /**
     * Adds content to content area of this feature box
     *
     * @param {jQuery|array} content
     * @return {phpdoc.Editor.FeatureBlock}
     */

    this.append = function (content) {
        content_area.append(content);
        return self;
    };

    /**
     * Opens up the content area
     * @return {phpdoc.Editor.FeatureBlock}
     */
    this.show = function () {
        content_area.slideDown();
        visible_state_icon.attr('src', '/assets/icons/silk/folder_page_white.png');
        if (tool_area.children().length) {
            tool_area.show();
        }
        return self;
    };

    /**
     * Collapses the window
     * @return {phpdoc.Editor.FeatureBlock}
     */
    this.hide = function() {
        visible_state_icon.attr('src', '/assets/icons/silk/folder.png');
        content_area.slideUp();
        tool_area.hide();
        return self;
    };

    this.hide();
};