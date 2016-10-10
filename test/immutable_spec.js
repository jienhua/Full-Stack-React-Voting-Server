import {expect} from 'chai';
import {List, Map} from 'immutable';

describe('immutability', ()=>{

	describe('a number', ()=>{

		function increment(currentState) {
			return currentState + 1;
		}

		it('is immutable', () => {
			let state = 42;
			let nextState = increment(state);

			expect(nextState).to.equal(43);
			expect(state).to.equal(42);
		});
	});

	describe('A List', () => {

		function addMovie(currentState, movie){
			return currentState.push(movie);
		}

		it('is immutable', () => {
			let state = List.of('Trainspotting', '28 days later');
			let nextState = addMovie(state, 'Sunshine');

			expect(state).to.equal(List.of(
				"Trainspotting",
				"28 days later"
			));

			expect(nextState).to.equal(List.of(
				"Trainspotting",
				"28 days later",
				"Sunshine"
			));
		})
	});

	describe('a tree', ()=>{

		function addMovie(currentState, movie){
			// return currentState.set(
			// 	'movies',
			// 	currentState.get('movies').push(movie)
			// );
			return currentState.update('movies', movies => movies.push(movie));
		}

		it('is immutable', ()=>{
			let state = Map({
				movies: List.of('Trainspotting', '28 days later')
			});

			let nextState = addMovie(state, 'sunshine');

			expect(nextState).to.equal(Map({
				movies: List.of(
					'Trainspotting',
					'28 days later',
					'sunshine'
				)
			}));
			expect(state).to.equal(Map({
				movies: List.of(
					'Trainspotting',
					'28 days later'
				)
			}));
		});	
	});
});