# jquery-categorypicker

A simple category picker base on jquery

## Introduction

If you find yourself writing the same code over and over again when creating a list of selectable items where the end result is the selected items. The **categorypicker** jquery plugin is simple easy and follows two principles _Keep-It-Simple-Stupid_ and _Principle-Of-Least-Astonishment_.

```html
<div id="categorypicker"></div>

<script type="text/javascript">
  $(function () {
    $(element).categorypicker({
      availableCategories: [{"1", "foo"}, {"2", "bar"}],
      onUpdate: function (selection) { console.log(selection); }
    });
  });
</script>
```

## Live Example

There is a live example available on [jsFiddle]()

## Options

**selectedCategories:** a collection of pre-selected categories. (default: [])

**availableCategories:** the base collection of categories (default: [])

**idField:** object field to use for id attribute on checkboxes (default: 'id')

**sortField:** object field to use for sorting the checkboxes (default: 'id')

**valueField:** object field to use for value attribute on checkboxes (default: 'value')

**displayField:** object field used for text on checkboxes (default: 'value')

**onUpdate:** a callback used when the selection changes (default: undefined)

**rootTemplate:** the template surrounding the categorypicker. Default:

  ```html
  <div class="categorypicker"></div>
  ```

**listTemplate:** the template for the list. Default:

  ```html
  <ul class="list"></ul>
  ```

**itemTemplate:** the template for the items in the list. Default:

  ```html
  <li class="item"></li>
  ```

## Knockout.js bindings

A simple **categorypicker** binding for Knockout.js is included in _jquery-categorypicker-ko.js_.

```html
<div data-bind="selected, availableCategories: available"></div>

<script type="text/javascript">
  $(function () {
    var ViewModel = {
      this.available = ko.observableArray([
        {id: "1", value: "Fruit", display: "Fruitz"},
        {id: "2", value: "Vegetables", display: "Veggies"},
        {id: "3", value: "Dairy", display: "Milk and stuff"},
        {id: "4", value: "Meat", display: "Here piggy, piggy!"}
      ]);
      this.selected = ko.observableArray([]);
    };
    ko.applyBindings(new ViewModel());
  });
</script>
```
