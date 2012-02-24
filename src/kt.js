/**
 * Collection of  utility function from different sources
 */

// for old browsers
window.undefined = window.undefined;

/**
 * @class KT
 * global library object
 * @singleton
 */
window.KT = {};

(function() {
    _.extend(KT, {
        /**
         * Original version by John Resig
         * http://ejohn.org/blog/simple-javascript-inheritance/
         * Create a new class that inherits from Object.
         * Has init() method as constructor
         * Inherited class has .extend() method for next levels of inheritance
         * and can call superclass with ._super() function
         * @param {Object} Class fields defination
         * @return {Function} class constructor function
         */
        define : function(prop) {
            return KT.Class.extend(prop);
        },

        /**
         * Creates namespaces to be used for scoping variables and classes so that they are not global.
         * Source - Ext core
         * @param {String} namespace1
         * @param {String} namespace2
         * @return {Object} the namespace object
         */
        namespace : function() {
            var o, d;
            _.each(arguments, function(v) {
                d = v.split(".");
                o = window[d[0]] = window[d[0]] || {};
                _.each(d.slice(1), function(v2) {
                    o = o[v2] = o[v2] || {};
                });
            });
            return o;
        }
    });

})();

(function(){
  var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
  // The base Class implementation (does nothing)
  KT.Class = function(){};

  // Create a new Class that inherits from this class
  KT.Class.extend = function(prop) {
    var _super = this.prototype;

    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    var prototype = new this();
    initializing = false;

    // Copy the properties over onto the new prototype
    for (var name in prop) {
      // Check if we're overwriting an existing function
      prototype[name] = typeof prop[name] == "function" &&
        typeof _super[name] == "function" && fnTest.test(prop[name]) ?
        (function(name, fn){
          return function() {
            var tmp = this._super;

            // Add a new ._super() method that is the same method
            // but on the super-class
            this._super = _super[name];

            // The method only need to be bound temporarily, so we
            // remove it when we're done executing
            var ret = fn.apply(this, arguments);
            this._super = tmp;

            return ret;
          };
        })(name, prop[name]) :
        prop[name];
    }

    // The dummy class constructor
    function Class() {
      // All construction is actually done in the init method
      if ( !initializing && this.init )
        this.init.apply(this, arguments);
    }

    // Populate our constructed prototype object
    Class.prototype = prototype;

    // Enforce the constructor to be what we expect
    Class.prototype.constructor = Class;

    // And make this class extendable
    Class.extend = arguments.callee;

    return Class;
  };
})();