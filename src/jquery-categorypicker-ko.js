ko.bindingHandlers.categorypicker = {
    update: function (element, valueAccessor, allBindingsAccessor) {
        // First get the latest data that we're bound to
        var value = valueAccessor(), allBindings = allBindingsAccessor();

        // Next, whether or not the supplied model property is observable, get its current value

        var selected = ko.utils.unwrapObservable(value) || [];

        var available = ko.utils.unwrapObservable(allBindings.availableCategories);
        var idField = ko.utils.unwrapObservable(allBindings.idField);
        var sortField = ko.utils.unwrapObservable(allBindings.sortField);
        var valueField = ko.utils.unwrapObservable(allBindings.valueField);
        var displayField = ko.utils.unwrapObservable(allBindings.displayField);
        var onUpdate = ko.utils.unwrapObservable(allBindingsAccessor.onUpdate) || function (newSelection) {
                value(newSelection);
            };
        var onInit = ko.utils.unwrapObservable(allBindingsAccessor.onInit);

        // Now manipulate the DOM element
        $(element).categorypicker({
            selectedCategories: selected,
            availableCategories: available,
            idField: idField,
            sortField: sortField,
            valueField: valueField,
            displayField: displayField,
            onInit: onInit,
            onUpdate: onUpdate
        });
    }
};
