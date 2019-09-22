var pfw = {
    ui: {

    }
};

pfw.ui.ContextMenu = function (args, parent_container) {
    var /** @type {jQuery} */
        _element = $('<div class="m3-cmenu-popup">').appendTo($(document.body)),
        _children = [],
        _id = ++pfw.ui.ContextMenu.TrackerID,
        _self = this,
        _activeSubmenu,
        _titleElement;

    /* the title element is placed at the top of the window and hidden until needed */
    _titleElement = $('<div class="m3-cmenu-popup-title"></div>').hide().appendTo(_element);

    /* the title can be changed after it has already loaded */
    this.setTitle = function (text) {
        _titleElement.show().text(text);
    };

    /* if a title is included from the constructor arguments, apply it now */
    if (args.title) {
        this.setTitle(args.title);
    }

    /**
     * Adds a new command to the function
     *
     * @param {string} text
     * @param {string} icon
     * @param {Function} clicked
     */

    this.add = function (text, icon, clicked) {
        var item = new pfw.ui.ContextMenu.Item(this, {label: text, icon: icon, callback: clicked});
        _children.push(item);
        _element.append(item.getElement());

        /* if visible, i.e. edited after the popup has been displayed, need to recalculate */
        if (this.onRedisplay && _element.is(':visible')) {
            this.onRedisplay();
        }

        return item;
    };

    this.display = function (x, y, adjust, vertical_anchor, horizontal_anchor) {
        var max_width = 200,
            top = -1,
            left = -1,
            relative_y,
            display_width,
            display_height,
            window_width = $(window).width(),
            window_height = $(window).height(),
            scroll_top = $(window).scrollTop();

        /* show the element to get its display size */
        _element.show();

        /* this is the size that we are going to show  */
        display_width = _element.outerWidth();
        display_height = _element.outerHeight();
        relative_y = y - scroll_top;

        if (horizontal_anchor === undefined) {
            horizontal_anchor = 0;
        }

        /* if there is no adjustment value then set it to 0 for type safety */
        if (adjust === undefined) {
            adjust = 0;
        }

        if (x > (window_width - max_width)) {
            left = x - horizontal_anchor - display_width + adjust;
        }
        else {
            left = x - adjust;
        }

        if (relative_y > ((window_height - display_height) || vertical_anchor === 'bottom')) {
            top = y - display_height + adjust;
        }
        else {
            top = y - adjust;
        }

        _id = ++pfw.ui.ContextMenu.TrackerID;
        _element
            .attr('data-id', _id)
            .bringToFront()
            .show();

        /* element style change */
        _element.css('left', left + 'px');
        _element.css('top', top + 'px');

        /* when it is redisplayed, toggle this again */
        var self = this;
        this.onRedisplay = function () {
            self.display(x, y, adjust, vertical_anchor);
        };
    };

    this.show = function (x, y) {
        this.display(x, y, 5);
    };

    this.hide = function () {
        _element.hide();
        this.visible = false;
        this.applySubmenu(null, null);
    };

    this.getID = function () {
        return _id;
    };

    /* When the function leaves the content area, if it has not ended up on a decending
     * window then we have to shut down the entire interface
     */

    _element.bind('mouseleave', function (e) {
        var rel = $(e.relatedTarget),
            menu_parent,
            swap_id = 0;

        /* is another popup itself */
        if (rel.hasClass('m3-cmenu-popup')) {
            swap_id = parseInt(rel.attr('data-id'));
        }
        else if (rel.parents('.m3-cmenu-popup').length) {
            swap_id = parseInt(rel.parents('.m3-cmenu-popup').attr('data-id'));
        }


        /* if it's another child then it has to be one with a higher ID */
        if (swap_id === 0) {
            _self.collapseDown();
        }
        else if (swap_id < _id) {
            _self.hide();
        }
        else {
            /* ... */
        }
    });

    this.applySubmenu = function (menu, e) {

        /* close any existing windows */
        if (_activeSubmenu) {
            _activeSubmenu.hide();
            _activeSubmenu = undefined;
        }

        /* show the child info */
        if (menu) {
            var child_menu = menu.getChild();
            if (child_menu) {
                var m_ele = menu.getElement();
                child_menu.display(m_ele.offset().left + m_ele.outerWidth(), m_ele.offset().top, undefined, undefined, _element.width());
                _activeSubmenu = child_menu;
            }
        }
    }

    this.collapseUp = function () {

    };

    this.collapseDown = function () {

        /* if we can go futher up the tree then continue traversing */
        if (parent_container) {
            parent_container.collapseDown();
        }
        /* nothing else above, tear everything out */
        else {
            this.destroy();
        }
    };

    /**
     * Removes the menu container and all of its decendents from the DOM
     */

    this.destroy = function () {
        _element.remove();
        $.each(_children, function (ix, item) {
            item.destroy();
        });
    };
};

pfw.ui.ContextMenu.Item = function (menu_container, args) {
    var _label = args.label,
        _icon = args.icon ? args.icon : 'silk/bullet_black.png',
        _callback = args.callback,
        _child,
        _element,
        _self = this,
        _expand_icon;

    /* create the element and attach event handlers to it */
    _element = $('<div class="m3-cmenu-item" style="padding: 5px; display: flex; flex-flow: row; flex-direction: row"></div>').append(
        $('<img style="vertical-align: text-bottom; width: 16px; height: 16px; flex: 0 1 auto" />').attr('src', '/static/icons/' + _icon),
        $('<div class="m3-cmenu-item-label" style="padding-left: 5px; padding-right: 3px; flex: 1 1 auto"></div>').text(_label),
        _expand_icon = $('<img style="vertical-align: text-bottom; width: 16px; height: 16px; flex: 0 1 auto; display: none" />').attr('src', '/static/icons/silk/bullet_go.png')
    );

    /* when the item is clicked */
    _element.click(function (e) {
        if (_callback) {
            menu_container.collapseDown();
            _callback(e);
        }
    });

    _element.bind('mouseenter', function (e) {
        menu_container.applySubmenu(_self, e);
    });

    this.getElement = function () {
        return _element;
    };

    this.getChild = function () {
        return _child;
    }

    this.add = function (text, icon, clicked) {
        if (!_child) {
            _child = new pfw.ui.ContextMenu({}, menu_container);
            _element.find('.m3-cmenu-item-label').text(_label);
            _expand_icon.show();
        }

        return _child.add(text, icon, clicked);
    };

    this.destroy = function () {
        _element.remove();
        if (_child) {
            _child.destroy();
        }
    }
};

pfw.ui.ContextMenu.TrackerID = 0;

(function (jQuery) {
    /**
     * Brings the current window to the top of the render stack based on
     * previous calls to bringToFront
     *
     * @returns {jQuery}
     */

    jQuery.fn.bringToFront = function () {
        // if window z index not defined
        if (window.popupZIndex === undefined) {
            window.popupZIndex = 1000;
        }

        return this.each(function () {
            jQuery(this).css('z-index', ++window.popupZIndex);
        });
    };

    /**
     * Calculates the positioning needed to place the selected element
     * in the direct center of the parent element.
     *
     * @param parent
     * @returns {jQuery}
     */

    jQuery.fn.center = function (parent) {
        if (parent === undefined) {
            parent = jQuery(window);
        }

        var width, height, self = this;

        if (parent === 'fixed') {
            width = jQuery(window).width();
            height = jQuery(window).height();
        }
        else {
            width = parent.width();
            height = parent.height();
        }

        self.css({
            top: (height / 2 - (self.height() / 2)) + "px",
            left: (width / 2 - (self.width() / 2)) + "px"
        });

        return this;
    };

    /**
     * Inserts the object as a child in the current element, this will be automatically
     * sorted based on the value param.
     *
     * @param {jQuery} obj
     * @param {string|number} value
     * @returns {jQuery}
     */

    jQuery.fn.insertOrderedChild = function (obj, value) {
        var self = this,
            jSelf = jQuery(this),
            found = false, this_value,
            numeric = false;

        /* is the value is numeric we need to pad it */
        if (typeof value === 'number') {
            numeric = true;
        }

        /* store the value of the object for sorting here */
        obj.attr('data-sort', value.toString()).addClass('is-ordered');

        /* is equivilent to an append */
        var last_node = jSelf.children(':last');
        if (last_node.length) {
            this_value = last_node.attr('data-sort');

            if (numeric) {
                this_value = parseInt(this_value);
            }

            if (value > this_value) {
                jSelf.append(obj);
                return self;
            }
        }

        jSelf.children().each(function () {
            var this_node = jQuery(this),
                this_value = this_node.attr('data-sort');

            if (numeric) {
                this_value = parseInt(this_value);
            }

            /* compare node values */
            if (this_value > value) {
                obj.insertBefore(this_node);
                found = true;
                return false;
            }
        });

        // has got to the end of the list with nothing found higher
        if (!found) {
            jSelf.append(obj);
        }

        return this;
    };

    /**
     *
     *
     * @param {jQuery} parent
     * @param {string|number} value
     * @returns {jQuery}
     */

    jQuery.fn.insertOrderedIn = function (parent, value) {
        jQuery(parent).insertOrderedChild(jQuery(this), value);
        return this;
    };

    /**
     * Disables UI selection on a given element by applying deselection CSS
     *
     * @returns {jQuery}
     */

    jQuery.fn.disableSelection = function () {
        return this.each(function () {
            this.onselectstart = function () {
                return false;
            };
            this.unselectable = "on";
            jQuery(this).css('user-select', 'none');
            jQuery(this).css('-o-user-select', 'none');
            jQuery(this).css('-moz-user-select', 'none');
            jQuery(this).css('-khtml-user-select', 'none');
            jQuery(this).css('-webkit-user-select', 'none');
        });
    };

    /**
     * Limits the number of children to a certain count
     *
     * Used to prevent the DOM from becoming incredibly slow when used with live
     * updating data that may spawn thousands upon thousands of rows such as
     * chat logs.
     *
     * @param {number} limit - How many items should be shown when we overflow
     * @param {number} overflow - How many items before we run the cropper
     * @param {string} [from]
     * @returns {jQuery}
     */

    jQuery.fn.limitChildren = function (limit, overflow, from) {
        return this.each(function () {
            if (this.childNodes.length >= overflow) {
                while (this.childNodes.length > limit) {
                    // which type
                    if (from === 'bottom') {
                        this.removeChild(this.lastChild);
                    }
                    else {
                        this.removeChild(this.firstChild);
                    }
                }
            }
        });
    };

    /**
     * Animates a spinning rotator that indicates something is loading
     *
     * @param option
     * @returns {jQuery}
     */

    jQuery.fn.throb = function (option) {
        var dlg;
        this.empty().append(dlg = jQuery('<img src="/static/icons/common_css/throb.gif" alt="loading" />'));

        /* edit style */
        if (option === 'small') {
            dlg.css('width', '16px').css('height', '16px');
        }
        else {
            dlg.css('width', '32px').css('height', '32px');
        }


        return this;
    };

    /**
     * Automatically scrolls the window to the bottom of its viewport if the
     * viewer is already at the bottom of the viewport.
     *
     * @param args
     * @returns {jQuery}
     */

    jQuery.fn.autoScroll = function (args) {
        /* arguments being available means we're initiating the scroll */
        if (args) {
            this.addClass('autoscroll-target').css('overflow-y', 'scroll');
            this.scroll(function (e) {
                var top = this.scrollTop,
                    height = this.scrollHeight,
                    bottom = jQuery(this).outerHeight(true);

                /* log if we are at the bottom of the page */
                // jQuery(this).data('scroll-is-bottom', (height - top) === bottom);
                jQuery(this).data('scroll-is-bottom', (bottom - height + top > -10));
            });

            /* assume we want to be at the bottom by default */
            jQuery(this).data('scroll-is-bottom', true);

            /* double click on the scrollbar */
            jQuery(this).dblclick(function (e) {
                var offset = jQuery(this).offset(),
                    left = e.pageX - offset.left,
                    top = e.pageY - offset.top;
            });
        }
        else {
            this.each(function () {
                var j = jQuery(this);
                if (j.data('scroll-is-bottom') === true) {
                    j.scrollTop(j[0].scrollHeight);
                }
            });
        }

        return this;
    };

})(jQuery);