# grid-assignment

This is my coding assignment for Isle of Code. It's the first thing I built in ember, and I learned a whole lot along the way.

## Working with `gridstack.js`

I chose `gridstack.js` — implemented as the `ember-gridstack` addon — for a couple reasons. Most importantly, this is meant to be a fast prototype that can be delivered to a client quickly. If you're emphasizing speed, I think it's better to begin by working with a well-maintained library that meets your current well-defined needs than to commit to an unexplored, unscoped custom implementation that might accommodate future but still unknown requirements. `gridstack` definitely fits the bill: it's actively maintained, its demo apps seem to show working implementations for all specified requirements, and it even seems to have API features that could be used to accommodate edge cases around window resizing (see more on those below). Even if it turns out to be inadequate, to begin with it puts productivity and identified client needs first, rather than a ton of labour that may not even turn into project that pays. That work won't be wasted — it'll inform the development of whatever might be necessary.

`gridstack` also has support for touch devices and touch events, in case Isle's customer ends up wanting a mobile version of their Ember app.

## How it works

`ember-gridstack` has a `grid-stack` component that manages rows and columns of `grid-stack-item`s. Instead of subclassing `grid-stack-item` to create different content-specific items (which ended up resulting in super strange behaviour), I've inserted content-specific components inside them — such as `list-grid-item` and `map-grid-item`. Their css is defined in `app.js`.

I also subclassed `grid-stack` as `grid-stack-resizable`, and used the `ember-resize` addon to get it to watch for window viewport changes. When the width changes, we use `gridStack.setGridWidth()` to set the new number of columns. `grid-stack-resizable` also uses the `didInsertElement` event for the opportunity to decide how many columns to begin with initially.

## Edge cases

We need to decide what expected behaviour should be for window resizing — as both vertical and horizontal resizing present unique challenges. If the resizing of the window puts an item outside the viewport, how should we handle it?

As far as vertical resizing goes, `gridstack` has a `setGridWidth()` method, which has an item-resizing options built-in (change `GridStackResizable.propagateResizesToItems` to `true` to see how it behaves), but it's pretty unpredictable, and `setGridWidth` is itself marked as experimental. `gridstack` has many underlying API features that would probably let us make the right call about what to do with items when they move outside the viewport, but we need to decide on what should be expected behaviour first.

Right now, the `disableOneColumnMode` and `minWidth` options on `grid-stack` are broken, meaning there's just one column of items when the viewport is smaller than 768px.

`gridstack` also gives a lot less control over the height of the grid stack compared to its width. We'd either need to extend it to offer a method to change the number of rows in the grid, or offer another solution for matching the rows to the viewport. Right now, there are an unlimited number of rows (`height` is set to 0 on `grid-stack-resizable`), but there's no real way to grow the viewport vertically, which might be desirable. Again, we've got to establish what the desired behaviour should be, but we may run into more trouble and less flexibility here than with horizontal resizing.

## Future work

Extending the app to communicate with an API seems pretty straightforward: using the `ember-route-action-helper` addon, we can watch for any changes to the items or to the grid in the `index.js` route, and handle their persistence or networking there. Right now, just the `change` event is configured there.

As far as configuring the content that lives within the grid stack items, we can use this pattern suggested by `ember-gridstack` in order to pass events down to sub-components:

```
{{#grid-stack-item
   options=(hash x=0 y=0 width=6 height=2)
   as |item|
}}
  {{custom-component
    parentContainer=item
  }}
{{/grid-stack-item}}
```

Overall, I think we can make `gridstack.js` work in a very embery (emberific? emberous?) way to accomplish the clients' stated and expected needs. Thanks for the chance to let me work on this problem!

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone <repository-url>` this repository
* `cd grid-assignment`
* `npm install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Linting

* `npm run lint:js`
* `npm run lint:js -- --fix`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
