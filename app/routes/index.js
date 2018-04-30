import Route from '@ember/routing/route';

export default Route.extend({
  actions: {
    change(event, items) {
      // Here, any changes to the grid items will bubble up.
      // console.log(items);
    }
  }
});
