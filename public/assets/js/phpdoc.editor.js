var phpdoc = {
    elements: {},
    renderers: {}
};

var config_data = {
    "meta": {
        "modified": 1569115803.137
    },
    "data": {
        "name": "example",
        "description": {
            "meta": {},
            "data": {
                "blocks": [
                    {
                        "meta": {
                            "modified": 1569115808.404
                        },
                        "data": {
                            "translations": {
                                "en": {
                                    "meta": {
                                        "modified": 1569115809.085
                                    },
                                    "data": {
                                        "lang": "en",
                                        "format": "text",
                                        "contents": "Generates a URL-encoded query string from the associative (or indexed) array provided."
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
                "meta": {
                    "modified": 1569115830.516
                },
                "data": {
                    "name": "query_data",
                    "types": [
                        {
                            "meta": {
                                "modified": 1569115833.768
                            },
                            "data": {
                                "type_name": "array",
                                "description": {
                                    "meta": {},
                                    "data": {
                                        "blocks": [
                                            {
                                                "meta": {
                                                    "modified": 1569115846.753
                                                },
                                                "data": {
                                                    "translations": {
                                                        "en": {
                                                            "meta": {
                                                                "modified": 1569115847.332
                                                            },
                                                            "data": {
                                                                "lang": "en",
                                                                "format": "text",
                                                                "contents": "A simple one-dimensional structure, or an array of arrays (which in turn may contain other arrays)"
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                }
                            }
                        },
                        {
                            "meta": {
                                "modified": 1569115868.974
                            },
                            "data": {
                                "type_name": "object",
                                "description": {
                                    "meta": {},
                                    "data": {
                                        "blocks": [
                                            {
                                                "meta": {
                                                    "modified": 1569115873.984
                                                },
                                                "data": {
                                                    "translations": {
                                                        "en": {
                                                            "meta": {
                                                                "modified": 1569115875.266
                                                            },
                                                            "data": {
                                                                "lang": "en",
                                                                "format": "text",
                                                                "contents": "If query_data is an object, then only public properties will be incorporated into the result."
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
                    ]
                }
            }
        ],
        "examples": {
            "meta": {},
            "data": {
                "blocks": []
            }
        },
        "notes": {
            "meta": {},
            "data": {
                "blocks": []
            }
        },
        "return_types": {
            "meta": {},
            "data": {
                "blocks": []
            }
        }
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

    let load_config = JSON.parse(window.localStorage.getItem('latest_config')) || config_data;

    var method = new phpdoc.elements.Method(this, load_config);
    jParent.append(method.getElement());

    this.changed = function () {
        let serialized = method.serialize(),
            json = JSON.stringify(serialized, null, 4);

        if (json !== last_json) {
            let x = renderer.render(serialized);
            $('#json').empty().append(x);
            last_json = json;

            window.localStorage.setItem('latest_config', JSON.stringify(serialized));
        }
    };

    this.getLanguageList = function() {
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
        content_area;

    element = $('<div style="border: 1px solid #eeeeee; margin: 5px; margin-left: 10px; margin-right: 10px"></div>').append(
        menu_bar = $('<div style="background: #eeeeee; padding: 3px; font-size: smaller"></div>')
            .append(
                menu_title = $('<span style="cursor: pointer"></span>').text(label).click(function() {
                    content_area.toggle(!content_area.is(':visible'));
                }),
                menu_tools = $('<span style="float: right"></span>').append(
                    events.onClickAdd.icon = $('<img src="./assets/icons/silk/add.png" alt="add" style="cursor: pointer; margin: 3px; display: none; vertical-align: center" />').click(function(e) {
                        if (events.onClickAdd.callback) {
                            events.onClickAdd.callback.call(null, e);
                        }
                        self.show();
                    })
                )
            ),
        content_area = $('<div style="padding: 5px; display: none"></div>').append(top || {})
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
     * Bind a callback to the append event
     *
     * @param callback
     * @return {phpdoc.Editor.FeatureBlock}
     */

    this.onClickAdd = function (callback) {
        events.onClickAdd.icon.show();
        events.onClickAdd.callback = callback;
        return this;
    };

    /**
     * Adds content to content area of this feature box
     *
     * @param {jQuery|array} content
     * @return {phpdoc.Editor.FeatureBlock}
     */

    this.append = function(content) {
        content_area.append(content);
        return self;
    };

    /**
     * Opens up the content area
     * @return {phpdoc.Editor.FeatureBlock}
     */
    this.show = function() {
        content_area.slideDown();
        return self;
    };
};