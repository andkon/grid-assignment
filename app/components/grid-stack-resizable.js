import GridStack from 'ember-gridstack/components/grid-stack';

export default GridStack.extend({
  propagateResizesToItems: false,
  classNames: ['grid-stack-resizable'],
  init() {
    this._super(...arguments)

    this.get('resizeService').on('didResize', event => {
      console.log(this.gridStack.grid.width);
      this.gridStack.setGridWidth(Math.floor(window.innerWidth / (110+20)), this.propagateResizesToItems)
    })
  },

  didInsertElement() {
    this._super(...arguments);
    this.gridStack.setGridWidth(Math.floor(window.innerWidth / (110+20)), this.propagateResizesToItems)
  }
});
