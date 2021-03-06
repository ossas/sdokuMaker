import test from 'ava';
import sudokumaker from '../dist/sudokumaker';

const testData = {"inCorrectData":[[[4,8,4],[6,5,1],[2,7,9]],[[2,7,9],[3,8,4],[6,5,1]],[[6,5,1],[2,7,9],[3,8,4]],[[4,3,8],[1,6,5],[9,2,7]],[[9,2,7],[4,3,8],[1,6,5]],[[1,6,5],[9,2,7],[4,3,8]],[[8,4,3],[5,1,6],[7,9,2]],[[7,9,2],[8,4,3],[5,1,6]],[[5,1,6],[7,9,2],[8,4,3]]]};
const failCaseData = {"state":"FAIL","box":{"002":{"_i":0,"_j":0,"_k":2},"000":{"_i":0,"_j":0,"_k":0}},"rows":{"002":{"_i":0,"_j":0,"_k":2},"000":{"_i":0,"_j":0,"_k":0}},"cols":{"300":{"_i":3,"_j":0,"_k":0},"000":{"_i":0,"_j":0,"_k":0}}};

test.before(t => {
	if(!('createGame' in sudokumaker)) {
		t.fail('sudokumaker not have createGame');
	}
	Object.assign(testData, sudokumaker.createGame());
})


test('Get GameData', t => {
	const gameData = sudokumaker.createGame();

	if(gameData && 'correctData' in gameData && 'data' in gameData) {
		t.pass('sudokumaker Complete Game Create');
	} else {
		t.fail('Do not Create Game');
	} 
});

test('GameCheck Test', t => {
	t.plan(3);

	if(!('gameDataCheck' in sudokumaker)) {
		t.fail('sudokumaker not have GameData Check');
	}

	const failCase = sudokumaker.gameDataCheck(testData.inCorrectData);
	const solvingCase = sudokumaker.gameDataCheck(testData.data);
	const successCase = sudokumaker.gameDataCheck(testData.correctData);

	if(successCase && successCase.state === 'SUCCESS') {
		t.pass('SUCCESS CHECK COMPLETE');
	} else {
		t.fail('SUCCESS CHECK FAIL');
	}

	if(solvingCase && solvingCase.state === 'SOLVING') {
		t.pass('SOLVING CHECK COMPLETE');
	} else {
		t.fail('SOLVING CHECK FAIL');
	}

	if(failCase && failCase.state === 'FAIL') {
		t.deepEqual(failCase, failCaseData, 'FAILCASE CHECK COMPLETE')
	} else {
		t.fail('FAILCASE CHECK FAIL');
	}

});