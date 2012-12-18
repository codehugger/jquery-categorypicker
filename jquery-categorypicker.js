(function ($) {
    /*
        jquery-categorypicker
        Copyright (c) 2012, Bjarki Gudlaugsson (codehugger) <codehugger@codehuggers.com>
        All rights reserved.

        This code is distributed under the terms of the BSD licence

        Redistribution and use of this software in source and binary forms, with or without modification,
        are permitted provided that the following conditions are met:

        * Redistributions of source code must retain the above copyright notice, this list of conditions
          and the following disclaimer.
        * Redistributions in binary form must reproduce the above copyright notice, this list of
          conditions and the following disclaimer in the documentation and/or other materials provided
          with the distribution.
        * The names of the contributors to this file may not be used to endorse or promote products
          derived from this software without specific prior written permission.

        THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED
        WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
        PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
        ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
        LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
        INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR
        TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
        ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
    */

    $.fn.categorypicker = function (categories, opts) {
        var self = this;

        // declare internals
        var availableCategories, selectedCategories;

        // declare ui templates
        var rootTemplate;

        function itemClicked (e) {
            // update the list of selected categories
            var id = e.target.id;
            var checked = e.target.checked;

            var newSelection = [];

            // copy all of the values from selected
            $.each(selectedCategories, function (i, category) {
                if (id !== category[idField]) {
                    newSelection.push(category);
                }
            });

            if (checked) {
                $.each(availableCategories, function (i, category) {
                    if (id === category[idField]) {
                        newSelection.push(category);
                    }
                });
            }

            selectedCategories = newSelection;

            selectedCategories.sort(function (a, b) { return a[sortField] > b[sortField]; });

            triggerOnChange();
        }

        function allClicked (e) {
            selectedCategories = availableCategories;

            render();

            triggerOnChange();

            e.preventDefault();
        }

        function noneClicked(e) {
            selectedCategories = [];

            render();

            triggerOnChange();

            e.preventDefault();
        }

        function triggerOnChange() {
            if (onUpdate) { onUpdate(selectedCategories); }
        }

        function buildQuickSelection () {
            var quick_node = $(quickTemplate);
            var all_node = $('<button href="#">All</button>');
            var none_node = $('<button href="#">None</button>');

            all_node.on('click', allClicked);
            all_node.attr('value', 'all');
            none_node.on('click', noneClicked);
            none_node.attr('value', 'none');

            quick_node.append(all_node);
            quick_node.append(none_node);

            return quick_node;
        }

        function buildItem (item) {
            var item_node = $(itemTemplate);
            var internal_node = $('<input type="checkbox">');

            internal_node.attr('id', item[idField]);
            internal_node.attr('value', item[valueField]);

            $.each(selectedCategories, function (i, selectedItem) {
                if (selectedItem[idField] === item[idField]) {
                    internal_node.attr('checked', true);
                }
            });

            internal_node.on('click', itemClicked);

            item_node.html(internal_node);
            item_node.append(item[displayField]);

            return item_node;
        }

        function buildList () {
            var list_node = $(listTemplate);

            // append items to list
            $.each(availableCategories, function (i, item) {
                list_node.append(buildItem(item));
            });

            return list_node;
        }

        /*
         * handles display of the categorypicker component
         */
        function render() {
            // make sure we have a clean slate
            var root = $(rootTemplate);

            // append list of categories
            root.append(buildList());

            self.html(root);
        }

        /*
         * validates options and initializes the categorypicker
         */
        function init(opts) {

            if (opts === undefined) { opts = {}; }

            // internals
            availableCategories     = opts.availableCategories  || [];
            selectedCategories      = opts.selectedCategories   || [];
            selectAll               = opts.selectAll            || false;
            idField                 = opts.idField              || 'id';
            sortField               = opts.sortField            || idField;
            valueField              = opts.valueField           || 'value';
            displayField            = opts.displayField         || 'value';
            onUpdate                = opts.onUpdate;

            // templates
            rootTemplate            = opts.rootTemplate         || '<div class="categorypicker"></div>';
            listTemplate            = opts.listTemplate         || '<ul class="item_list"></ul>';
            itemTemplate            = opts.itemTemplate         || '<li class="item"></li>';
            quickTemplate           = opts.quickTemplate        || '<div class="quick"></div>';

            // initialize display
            render();

            // fire an initial event
            triggerOnChange();

            return self;
        }

        // initialize and return
        return init(categories, opts);
    };
})(jQuery);
