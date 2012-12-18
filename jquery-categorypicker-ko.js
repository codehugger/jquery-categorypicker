ko.bindingHandlers.categorypicker = {
    update: function (element, valueAccessor, allBindingsAccessor) {
        // First get the latest data that we're bound to
        var value = valueAccessor(), allBindings = allBindingsAccessor();

        // Next, whether or not the supplied model property is observable, get its current value

        var selected = ko.utils.unwrapObservable(value);

        var available = ko.utils.unwrapObservable(allBindings.available);
        var idField = ko.utils.unwrapObservable(allBindings.id);
        var displayField = ko.utils.unwrapObservable(allBindings.display);
        var valueField = ko.utils.unwrapObservable(allBindings.value);

        // Now manipulate the DOM element
        $(element).categorypicker({
            onUpdate: function (newSelection) {
                value(newSelection);
            },
            selectedCategories: selected,
            availableCategories: available,

            idField: idField,
            valueField: valueField,
            displayField: displayField
        });
    }
};
