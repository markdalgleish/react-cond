jest.dontMock('../module/');

import React from 'react/addons';
import R from 'ramda';
import { equal } from 'assert';

const { TestUtils } = React.addons;
const { Cond, value, and } = require('../module/');


describe('React-Cond', () => {

	describe('#R.gt', () => {

		it('should render the child component the value is gt the nr', () => {
			const gt = R.flip(R.gt);
			let component = TestUtils.renderIntoDocument(
				<Cond value={10}>
					{[ gt(11), <h1>unexpected</h1>]}
					{[ gt(9), <h1>expected</h1>]}
					{[ R.T, <h1>unexpected</h1>]}
				</Cond>
			);
			let val = TestUtils.findRenderedDOMComponentWithTag(component, 'h1');
			equal(val.getDOMNode().textContent, 'expected');
		});
	});

	describe('#R.lt', () => {

		it('should render the child component the value is lt the nr', () => {
			const lt = R.flip(R.lt);

			let component = TestUtils.renderIntoDocument(
				<Cond value={10}>
					{[ lt(10), <h1>unexpected</h1>]}
					{[ lt(11), <h1>expected</h1>]}
					{[ R.T, <h1>unexpected</h1>]}
				</Cond>
			);
			let val = TestUtils.findRenderedDOMComponentWithTag(component, 'h1');
			equal(val.getDOMNode().textContent, 'expected');
		});
	});

	describe('#R.lte', () => {

		it('should render the child component the value is lte the nr', () => {
			const lte = R.flip(R.lte);

			let component = TestUtils.renderIntoDocument(
				<Cond value={10}>
					{[ lte(9), <h1>unexpected</h1>]}
					{[ lte(10), <h1>expected</h1>]}
					{[ R.T, <h1>unexpected</h1>]}
				</Cond>
			);
			let val = TestUtils.findRenderedDOMComponentWithTag(component, 'h1');
			equal(val.getDOMNode().textContent, 'expected');
		});
	});

	describe('#R.gte', () => {

		it('should render the child component the value is gte the nr', () => {
			const gte = R.flip(R.gte);
			let component = TestUtils.renderIntoDocument(
				<Cond value={10}>
					{[ gte(11), <h1>unexpected</h1>]}
					{[ gte(10), <h1>expected</h1>]}
					{[ R.T, <h1>unexpected</h1>]}
				</Cond>
			);
			let val = TestUtils.findRenderedDOMComponentWithTag(component, 'h1');
			equal(val.getDOMNode().textContent, 'expected');
		});
	});

	describe('#R.not(R.equals)', () => {

		it('should render the child component the value is not eq the nr', () => {
			const notEquals = R.compose(R.not, R.equals);

			let component = TestUtils.renderIntoDocument(
				<Cond value={10}>
					{[ notEquals(10), <h1>unexpected</h1>]}
					{[ notEquals(11), <h1>expected</h1>]}
					{[ R.T, <h1>unexpected</h1>]}
				</Cond>
			);
			let val = TestUtils.findRenderedDOMComponentWithTag(component, 'h1');
			equal(val.getDOMNode().textContent, 'expected');
		});
	});

	describe('#R.equals', () => {

		it('should render the child component the value is eq the nr', () => {
			let component = TestUtils.renderIntoDocument(
				<Cond value={10}>
					{[ R.equals(11), <h1>unexpected</h1>]}
					{[ R.equals(10), <h1>expected</h1>]}
					{[ R.T, <h1>unexpected</h1>]}
				</Cond>
			);
			let val = TestUtils.findRenderedDOMComponentWithTag(component, 'h1');
			equal(val.getDOMNode().textContent, 'expected');
		});
	});

	describe('#between', () => {

		it('should render the child component the value is between the nr', () => {
			const between = (x, y) => R.allPass([R.flip(R.gt)(x), R.flip(R.lt)(y)]);

			let component = TestUtils.renderIntoDocument(
				<Cond value={10}>
					{[ between(10, 12), <h1>unexpected</h1>]}
					{[ between(9, 11), <h1>expected</h1>]}
					{[ R.T, <h1>unexpected</h1>]}
				</Cond>
			);
			let val = TestUtils.findRenderedDOMComponentWithTag(component, 'h1');
			equal(val.getDOMNode().textContent, 'expected');
		});
	});


	describe('#R.allPass', () => {

		it('should render the child component both conditions are true', () => {
			const startsWith = x => str => str.startsWith(x);
			const endsWith = x => str => str.endsWith(x);

			let component = TestUtils.renderIntoDocument(
				<Cond value={'_test_'}>
					{[ R.allPass([startsWith('-'), endsWith('-')]), <h1>unexpected</h1>]}
					{[ R.allPass([startsWith('-'), endsWith('_')]), <h1>unexpected</h1>]}
					{[ R.allPass([startsWith('_'), endsWith('-')]), <h1>unexpected</h1>]}
					{[ R.allPass([startsWith('_'), endsWith('_')]), <h1>expected</h1>]}
					{[ R.T, <h1>unexpected</h1>]}
				</Cond>
			);
			let val = TestUtils.findRenderedDOMComponentWithTag(component, 'h1');
			equal(val.getDOMNode().textContent, 'expected');
		});
	});

	describe('#R.anyPass', () => {

		it('should render the child component both conditions are true', () => {
			const startsWith = x => str => str.startsWith(x);
			const endsWith = x => str => str.endsWith(x);

			let component = TestUtils.renderIntoDocument(
				<Cond value={'_test_'}>
					{[ R.anyPass([startsWith('-'), endsWith('-')]), <h1>unexpected</h1>]}
					{[ R.anyPass([startsWith('-'), endsWith('_')]), <h1>expected</h1>]}
					{[ R.anyPass([startsWith('_'), endsWith('-')]), <h1>unexpected</h1>]}
					{[ R.anyPass([startsWith('_'), endsWith('_')]), <h1>unexpected</h1>]}
					{[ R.T, <h1>unexpected</h1>]}
				</Cond>
			);
			let val = TestUtils.findRenderedDOMComponentWithTag(component, 'h1');
			equal(val.getDOMNode().textContent, 'expected');
		});
	});

	describe('#propEq', () => {

		it('should render the component if the value is eq to a value', () => {
			const obj = { val1: 12, val2: 13 };

			let component = TestUtils.renderIntoDocument(
				<Cond value={{...obj}}>
					{[ and(R.propEq('val1', 11), R.propEq('val2', 12)), <h1>unexpected</h1>]}
					{[ and(R.propEq('val1', 12), R.propEq('val2', 13)), <h1>expected</h1>]}
					{[ R.T, <h1>unexpected</h1>]}
				</Cond>
			);
			let val = TestUtils.findRenderedDOMComponentWithTag(component, 'h1');
			equal(val.getDOMNode().textContent, 'expected');
		});
	});

});
