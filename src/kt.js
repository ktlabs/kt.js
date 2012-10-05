/**
 * Collection of  utility function from different sources.
 */

/**
 * @class KT
 * global library object
 * @singleton
 */
window.KT = {};

(function() {
    /**
     * Simple copy all properties from source object to target
     * @param target
     * @param source
     */
    KT.extend = function(target, source){
        for (var v in source) {
            if (source.hasOwnProperty(v)) {
                target[v] = source[v];
            }
        }
    };

    /**
     * Typecheckers. Usage is obvious
     */
    KT.is = {
        fun: function (f) {
            return typeof f === 'function';
        }

        , str: function (s) {
            return typeof s === 'string';
        }

        , ele: function (el) {
            return !!(el && el.nodeType && el.nodeType == 1);
        }

        , arr: function (ar) {
            return ar instanceof Array;
        }

        , arrLike: function (ar) {
            return (ar && ar.length && isFinite(ar.length));
        }

        , num: function (n) {
            return typeof n === 'number';
        }

        , bool: function (b) {
            return (b === true) || (b === false);
        }

        , args: function (a) {
            return !!(a && hasOwn.call(a, 'callee'));
        }

        , emp: function (o) {
            var i = 0;
            return KT.is.arr(o) ? o.length === 0 :
                KT.is.obj(o) ? (function () {
                    for (var k in o) {
                        i++;
                        break;
                    }
                    return (i === 0)
                }()) :
                    o === ''
        }

        , dat: function (d) {
            return !!(d && d.getTimezoneOffset && d.setUTCFullYear);
        }

        , reg: function (r) {
            return !!(r && r.test && r.exec && (r.ignoreCase || r.ignoreCase === false));
        }

        , nan: function (n) {
            return n !== n;
        }

        , nil: function (o) {
            return o === n;
        }

        , und: function (o) {
            return typeof o === 'undefined';
        }

        , def: function (o) {
            return typeof o !== 'undefined';
        }

        , obj: function (o) {
            return o instanceof Object && !KT.is.fun(o) && !KT.is.arr(o);
        }
    };

    KT.extend(KT, {
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
         * Creates dot separated namespace objects to be used for scoping variables and classes
         * so that they are not global.
         * @param {String} namespace
         * @param {Function} callback
         * @return {Object} the namespace object
         */
        namespace : function(namespace, callback) {
            var o, parts, i = 0, v;

            parts = namespace.split('.');
            o = window[parts[0]] = window[parts[0]] || {};

            for (i = 1; i < parts.length; i++ ) {
                v = parts[i];
                o = o[v] = o[v] || {};
            }

            if(typeof(callback) == 'function'){
                callback.apply(o);
            }

            return o;
        },

        /**
         *  Returns integer number from 0 to n
         */
        random : function(n) {
            return Math.floor(Math.random()*n);
        },

        /**
         * String formating with .NET style placehloders
         * @param text
         * @param params
         */
        format : function(text) {
            var i = 0, l =  arguments.length - 1;

            if (l <= 0) {
                return text;
            }

            for (; i < l; i++){
                text = text.replace( ('{' + i + '}') , arguments[i+1]);
            }

            return text;
        },

        merge: function () {
            // based on jQuery deep merge
            var options, name, src, copy, clone
                , target = arguments[0], i = 1, length = arguments.length;

            for (; i < length; i++) {
                if ((options = arguments[i]) !== null) {
                    // Extend the base object
                    for (name in options) {
                        src = target[name];
                        copy = options[name];
                        if (target === copy) {
                            continue;
                        }
                        if (copy && (KT.is.obj(copy))) {
                            clone = src && KT.is.obj(src) ? src : {};
                            target[name] = KT.merge(clone, copy);
                        } else if (copy !== undefined) {
                            target[name] = copy;
                        }
                    }
                }
            }
            return target;
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
