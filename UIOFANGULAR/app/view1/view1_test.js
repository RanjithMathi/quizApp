'use strict';

describe('myApp.view1 module', function() {

  beforeEach(module('myApp.view1'));

  describe('login Controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var view1Ctrl = $controller('loginController');
      expect(view1Ctrl).toBeDefined();
    }));

  });
});
