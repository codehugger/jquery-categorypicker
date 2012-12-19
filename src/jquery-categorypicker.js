(function ($) {

    $.fn.categorypicker = function (categories, opts) {
        var self = this;

        // declare internals
        var availableCategories, selectedCategories;

        // declare ui templates
        var rootTemplate;

        /*
         * handle the check/uncheck of a list item
         */
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

            triggerOnUpdate();
        }

        /*
         * triggers the onUpdate callback with selectedCategories
         */
        function triggerOnUpdate() {
            if (onUpdate) { onUpdate(selectedCategories); }
        }

        /*
         * build list item from template and attach events
         */
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

        /*
         * build list from template and attach list items
         */
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
            idField                 = opts.idField              || 'id';
            sortField               = opts.sortField            || idField;
            valueField              = opts.valueField           || 'value';
            displayField            = opts.displayField         || 'value';
            onUpdate                = opts.onUpdate;

            // templates
            rootTemplate            = opts.rootTemplate         || '<div class="categorypicker"></div>';
            listTemplate            = opts.listTemplate         || '<ul class="list"></ul>';
            itemTemplate            = opts.itemTemplate         || '<li class="item"></li>';

            // initialize display
            render();

            // fire an initial event
            triggerOnUpdate();

            return self;
        }

        // initialize and return
        return init(categories, opts);
    };
})(jQuery);
