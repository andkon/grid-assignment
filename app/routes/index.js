import Route from '@ember/routing/route';

export default Route.extend({
  actions: {
    change(event, items) {
      console.log(items);
    }
  }
});
