/**
 * Crafted by ZIgi
 */

$(function(){

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