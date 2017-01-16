const fif = require('.').fif
const fswitch = require('.').fswitch
const chai = require('chai')

const assert = chai.assert

describe('test fif(k) with values', function() {
	const fif1 = fif("k1").fthen(1).felse(2)
	
	it('then branch is taken', function() {
		assert.equal(fif1.exec("k1"), 1)
	})
	
	it('else branch is taken', function() {
		assert.equal(fif1.exec("k2"), 2)
	})
	
	const fif2 = fif("k1").fthen(1)
	
	it('then branch is not undefined', function() {
		assert.equal(fif2.exec("k1"), 1)
	})
	it('else branch is undefined', function() {
		assert.isUndefined(fif2.exec("k2"))
	})
	
	const fif3 = fif("k1").felse(2)
	
	it('then branch is undefined', function() {
		assert.isUndefined(fif3.exec("k1"))
	})
	it('else branch is not undefined', function() {
		assert.equal(fif3.exec("k2"), 2)
	})

})

describe('test fif().exec(cond) with values', function() {
	const fif1 = fif().fthen(1).felse(2)
	
	it('then branch is taken', function() {
		assert.equal(fif1.exec(true), 1)
	})
	
	it('else branch is taken', function() {
		assert.equal(fif1.exec(false), 2)
	})
	
	const fif2 = fif().fthen(1)
	
	it('then branch is not undefined', function() {
		assert.equal(fif2.exec(true), 1)
	})
	it('else branch is undefined', function() {
		assert.isUndefined(fif2.exec(false))
	})
	
	const fif3 = fif().felse(2)
	
	it('then branch is undefined', function() {
		assert.isUndefined(fif3.exec(true))
	})
	it('else branch is not undefined', function() {
		assert.equal(fif3.exec(false), 2)
	})

})

describe('test fif(k) with functions', function() {
	const fif1 = fif("k1").fthen_f((a,b) => a+b).felse_f((a,b) => a-b)
	
	it('then branch is taken', function() {
		assert.equal(fif1.exec("k1", 1, 1), 2)
	})
	
	it('else branch is taken', function() {
		assert.equal(fif1.exec("k2", 1, 1), 0)
	})
	
	const fif2 = fif("k1").fthen_f((a,b) => a+b).felse((a,b) => a-b)
	
	it('then branch is taken', function() {
		assert.equal(fif2.exec("k1", 1, 1), 2)
	})
	
	it('else branch is a function', function() {
		assert.isFunction(fif2.exec("k2", 1, 1))
	})
})

describe('test fswitch() with values', function() {
	const fsw1 = fswitch().fcase("k1", 1).fcase("k2", 2).fdefault(3)
	
	it("k1 case is taken", function(){
		assert.equal(fsw1.exec("k1"), 1)
	})
	
	it("k2 case is taken", function(){
		assert.equal(fsw1.exec("k2"), 2)
	})
	
	it("default is taken", function(){
		assert.equal(fsw1.exec("k42"), 3)
	})
	
	const fsw2 = fswitch().fcase("k1", 1).fcase("k2", 2)
	
	it("k2 case is taken", function(){
		assert.equal(fsw2.exec("k2"), 2)
	})
	
	it("default is undefined", function(){
		assert.isUndefined(fsw2.exec("k42"))
	})
})

describe('test fswitch() with functions', function() {
	const fsw1 = fswitch().fcase_f("k1", a => a+1).fcase_f("k2", a => a+2).fdefault_f(a=>a+3)
	
	it("k1 case is taken", function(){
		assert.equal(fsw1.exec("k1", 1), 2)
	})
	
	it("k2 case is taken", function(){
		assert.equal(fsw1.exec("k2", 1), 3)
	})
	
	it("default is taken", function(){
		assert.equal(fsw1.exec("k42", 1), 4)
	})
	
	const fsw2 = fswitch().fcase_f("k1", a => a+2).fcase("k2", a=>a+3)
	
	it("k1 case is taken", function(){
		assert.equal(fsw2.exec("k1", 1), 3)
	})
	
	it("k2 case is a function", function(){
		assert.isFunction(fsw2.exec("k2", 1))
	})
	
	it("default is udnefined", function(){
		assert.isUndefined(fsw2.exec("k42", 1))
	})
})



// console.log(fswitch().fcase("test1", 1).fcase("test2", 2).exec("test"))