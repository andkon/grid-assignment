import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return [{
      isList: true,
      x: 1,
      y: 0,
      width: 1,
      height: 1
    }, {
      isMap: true,
      x: 2,
      y: 0,
      width: 2,
      height: 2
    }, {
      isList: true,
      x: 0,
      y: 3,
      width: 1,
      height: 1
    }
    ]
  },
  actions: {
    change(event, items) {
      // Here, any changes to the grid items will bubble up.
      // console.log(items);
    }
  }
});
