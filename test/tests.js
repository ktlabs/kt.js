/**
 * Crafted by ZIgi
 */

$(function(){

module('Basic');

test('Extend', function() {
    var o1 = {
        some : 'stuff'
    },
    o2 = {};

    KT.extend(o2, o1);
    equal(o2.some, 'stuff', 'Extend function - ok');
});

test('Type checking', function() {
    //TODO write other
    equal(KT.is.fun(function(){}), true, 'Function detected - ok');
    equal(KT.is.fun('Fuuuu'), false, 'Not function deteted - ok');

});

test('Random', function() {
    var r1 = KT.random(9999), r2 = KT.random(9999);
    equal(r1 === r2, false, 'Random - ok');
});

test('Merge', function() {
    var o1 = {
        foo : {
            bar : 'bla'
        }
    },
        o2 = {
            foo : {
                some : 'value'
            },
            baz : {
                doz : 'stuff'
            }
        };

    var o3 = KT.merge(o1, o2);

    equal(o3.foo.some, 'value', 'Child object merged');
    equal(o3.foo.bar, 'bla', 'Destination object keeped');

});

test('String format', function() {
    var s = KT.format('Lorem {1} dolor {0} amet', 'sit', 'ipsum');
    equal(s, 'Lorem ipsum dolor sit amet', 'String formated - ok');

    var s2 = KT.format('Test');
    equal(s2, 'Test', '1 arg formating - ok')
});

module('OOP features');

test('Namespaces', function() {
    KT.namespace('Foo.Bar');
    notEqual(Foo.Bar, undefined, 'Namespace created');

    Foo.Bar.bla = 'test';
    KT.namespace('Foo.Bar');
    equal(Foo.Bar.bla, 'test', 'Namespace preserved');
});

test('Inheritance', function() {

    var Person = KT.define({
        init : function(data) {
            this.data = data;
        },
        getData : function() {
            return this.data;
        },
        sayHello : function() {
            return 'hello'
        },
        sayBye : function () {
            return 'bye'
        }
    });


    var p = new Person('parent');

    equal(p instanceof Person, true, 'Class is defined. instanceof checking passed' );
    equal(p.getData(), 'parent', 'Constructing instance with init() method');


    var Manager = Person.extend({
        init : function() {
            this._super('test');
        },
        sayHello : function() {
            return 'overriden';
        },
        work : function() {
            return 'I am working';
        },
        sayBye: function() {
            return 'bye-' + this._super()
        }
    });

    var m = new Manager();

    equal(m instanceof Manager, true, 'Child class is defined');
    equal(m.getData(), 'test', 'Superclass init calling');
    equal(m.sayHello(), 'overriden', 'Method override');
    equal(m.work(), 'I am working', 'Self method calling');
    equal(m.sayBye(), 'bye-bye', 'Superclass method calling')

});

});