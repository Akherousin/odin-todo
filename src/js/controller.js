import * as model from './model';
import navView from './view/NavView';

export const init = function () {
  navView.render(model.state);
};
