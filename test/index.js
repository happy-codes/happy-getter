import assert from 'assert';
import getter from '../lib/index.js';

const testData = {
  a: {
    b: {
      c: ['1', '2', '3'],
      c1: null,
      c2: undefined
    },
    b1: [
      {
        c: [
          {
            d: 1
          }
        ],
        c1: function() {}
      }
    ]
  }
};

describe('Correct data', function() {
  it('should return 1', function() {
    assert.equal(1 === getter(testData, 'b1[0].c[0].d'));
  });
});

// describe('Incorrect data', function() {
//   it('should return 1', function() {
//     assert.equal(1);
//   });
// });
