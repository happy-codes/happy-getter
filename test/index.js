import assert from 'assert';
import getter from '../src';

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
  it('should return null', function() {
    assert.equal(null, getter(testData, 'a.b.c1'));
  });
  it('should return undefined', function() {
    assert.equal(undefined, getter(testData, 'a.b.c2'));
  });
  it('should return array', function() {
    assert.deepEqual(['1', '2', '3'], getter(testData, 'a.b.c'));
  });
  it('should return 1', function() {
    assert.equal(1, getter(testData, `a.b1[0]['c'][0]["d"]`));
  });
});

// describe('Incorrect data', function() {
//   it('should return 1', function() {
//     assert.equal(1);
//   });
// });
