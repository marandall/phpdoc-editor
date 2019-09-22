phpdoc.renderers.SegmentContainerRender = function () {
    this.render = function (segment_container_data) {
        var container = $('<div></div>');


        $.each(segment_container_data.blocks, function (ix, segment) {
            if (segment.data.translations.en) {
                var en_contents = segment.data.translations.en.data.contents;
                if (en_contents.indexOf('<?php') === 0) {
                    container.append(
                        $('<div style="margin-bottom: 1em; font-size: 14px; padding: 10px; background: #dddddd; font-family: \'Courier New\'; white-space: pre-wrap ">').text(en_contents)
                    );
                } else {
                    container.append(
                        $('<div style="margin-bottom: 1em; font-size: 14px; white-space: pre-wrap">').text(en_contents)
                    );
                }
            }
        });

        return container;
    };
};

phpdoc.renderers.TextSegmentRenderer = function () {
    this.render = function (segment) {
        if (segment.data.translations.en) {
            let en_contents = segment.data.translations.en.data.contents,
                container = $('<div></div>');

            if (en_contents.indexOf('<?php') === 0) {
                container.append(
                    $('<div style="margin-bottom: 1em; font-size: 14px; padding: 10px; background: #dddddd; font-family: \'Courier New\'; white-space: pre-wrap ">').text(en_contents)
                );
            } else {
                container.append(
                    $('<div style="margin-bottom: 1em; font-size: 14px; white-space: pre-wrap">').text(en_contents)
                );
            }

            return container;
        }

        return null;
    };
};

phpdoc.renderers.Method = function () {
    this.render = function (method_data) {
        let name = method_data.data.name,
            segment_renderer = new phpdoc.renderers.TextSegmentRenderer(),
            segment_container_renderer = new phpdoc.renderers.SegmentContainerRender(),
            container = $('<div></div>');

        /*
         * Name goes big and bold at the top of the page
         */
        container.append(
            $('<h1></h1>').text(name)
        );

        let params = [],
            all_params = $('<span></span>'),
            detailed_param_elements = $('<div></div>'),
            signature_close_brackets = '';

        $.each(method_data.data.parameters, function (ix, param_data) {
            let union_types = [],
                param_element = $('<div></div>'),
                default_value = param_data.data.default_value || '',
                h_element,
                signature_key = '';

            /*
             * If there is only one type defined (no overloading), integrate it into one section
             * for cleaner layout
             */

            if (param_data.data.types.length === 0) {
                param_element.append(
                    h_element = $('<h3></h3>').text('$' + param_data.data.name + ' : mixed'),
                );

                union_types.push('mixed');
            } else if (param_data.data.types.length === 1) {
                param_element.append(
                    h_element = $('<h3></h3>').text(param_data.data.name + ' : ' + param_data.data.types[0].data.type_name),
                    $('<div class="indent"></div>').append(
                        segment_container_renderer.render(param_data.data.types[0].data.description.data)
                    )
                );

                union_types.push(param_data.data.types[0].data.type_name);
            } else {
                param_element.append(
                    h_element = $('<h3></h3>').text(param_data.data.name + ' : Union Type')
                );

                var pe_child = $('<div class="indent"></div>');

                $.each(param_data.data.types, function (ij, type_data) {
                    union_types.push(type_data.data.type_name);
                    pe_child.append(
                        $('<h5></h5>').text(type_data.data.type_name),
                        segment_container_renderer.render(type_data.data.description.data)
                    );
                    param_element.append(pe_child);
                });
            }

            signature_key = union_types.join('|') + ' $' + param_data.data.name;

            if (param_data.data.optional) {
                all_params.append(' [');
                signature_close_brackets = signature_close_brackets + ']';
            }

            if (default_value) {
                h_element.append($('<span></span>').text(' = ' + default_value));
                signature_key = signature_key + ' = ' + default_value;
            }

            detailed_param_elements.append(param_element);

            if (all_params.children().length) {
                all_params.append(', ');
            }

            all_params.append($('<span></span>').text(signature_key));
        });

        all_params.append($('<span></span>').text(signature_close_brackets));

        container.append(
            $('<h2></h2>').text('Description'),
            $('<div style="padding: 20px; background: skyblue; font-size: larger; margin: 1em"></div>').append(
                $('<span></span>').text(name),
                ' ( ',
                $('<span></span>').append(all_params),
                ')'
            ),
            segment_container_renderer.render(method_data.data.description.data)
        );

        container.append(
            $('<h2></h2>').text('Parameters'),
            $('<div></div>').append(detailed_param_elements)
        );

        function appendIfPresent(title, payload) {
            if (payload.data.blocks.length !== 0 || true) {
                container.append(
                    $('<h2></h2>').text(title),
                    segment_container_renderer.render(payload.data)
                );
            }
        }

        var rv_types = $('<div></div>');
        $.each(method_data.data.return_types || [], function (ix, type_config) {
            console.log(type_config);
            rv_types.append(
                $('<h3></h3>').text(type_config.data.type_name),
                $('<div class="indent"></div>').append(
                    segment_renderer.render(type_config.data.description)
                )
            );
        });

        container.append(
            $('<h2>Return Value</h2>'),
            method_data.data.return_value_description
                ? segment_container_renderer.render(method_data.data.return_value_description.data)
                : null,
            rv_types
        );

        appendIfPresent('Examples', method_data.data.examples);
        appendIfPresent('Notes', method_data.data.notes);

        return container;
    }
};