/**
 * @fileoverview Tests for VisualStudio format.
 * @author Ronald Pijnacker
 *
 * Updated for use with sass-lint under MIT licence
 * @license https://github.com/sasstools/sass-lint/blob/master/lib/format/LICENSE
 */

'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const assert = require('chai').assert,
    formatter = require('../../lib/format/formatters/visualstudio');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

describe('formatter:visualstudio', () => {
  describe('when passed no messages', () => {
    const code = [{
      filePath: 'foo.scss',
      messages: []
    }];

    it('should return nothing', () => {
      const result = formatter(code);

      assert.equal(result, 'no problems');
    });
  });

  describe('when passed a single message', () => {
    const code = [{
      filePath: 'foo.scss',
      messages: [{
        message: 'Unexpected foo.',
        severity: 2,
        line: 5,
        column: 10,
        ruleId: 'foo'
      }]
    }];

    it('should return a string in the format filename(x,y): error z for errors', () => {
      const result = formatter(code);

      assert.equal(result, 'foo.scss(5,10): error foo : Unexpected foo.\n\n1 problem');
    });

    it('should return a string in the format filename(x,y): warning z for warnings', () => {
      code[0].messages[0].severity = 1;
      const result = formatter(code);

      assert.equal(result, 'foo.scss(5,10): warning foo : Unexpected foo.\n\n1 problem');
    });
  });

  // TODO implement fatal messages for this
  // describe('when passed a fatal error message', () => {
  //   const code = [{
  //     filePath: 'foo.scss',
  //     messages: [{
  //       fatal: true,
  //       message: 'Unexpected foo.',
  //       line: 5,
  //       column: 10,
  //       ruleId: 'foo'
  //     }]
  //   }];
  //
  //   it('should return a string in the format filename(x,y): error  z', () => {
  //     const result = formatter(code);
  //
  //     assert.equal(result, 'foo.scss(5,10): error foo : Unexpected foo.\n\n1 problem');
  //   });
  // });

  describe('when passed multiple messages', () => {
    const code = [{
      filePath: 'foo.scss',
      messages: [{
        message: 'Unexpected foo.',
        severity: 2,
        line: 5,
        column: 10,
        ruleId: 'foo'
      }, {
        message: 'Unexpected bar.',
        severity: 1,
        line: 6,
        column: 11,
        ruleId: 'bar'
      }]
    }];

    it('should return a string with multiple entries', () => {
      const result = formatter(code);

      assert.equal(result, 'foo.scss(5,10): error foo : Unexpected foo.\nfoo.scss(6,11): warning bar : Unexpected bar.\n\n2 problems');
    });
  });

  describe('when passed multiple files with 1 message each', () => {
    const code = [{
      filePath: 'foo.scss',
      messages: [{
        message: 'Unexpected foo.',
        severity: 2,
        line: 5,
        column: 10,
        ruleId: 'foo'
      }]
    }, {
      filePath: 'bar.scss',
      messages: [{
        message: 'Unexpected bar.',
        severity: 1,
        line: 6,
        column: 11,
        ruleId: 'bar'
      }]
    }];

    it('should return a string with multiple entries', () => {
      const result = formatter(code);

      assert.equal(result, 'foo.scss(5,10): error foo : Unexpected foo.\nbar.scss(6,11): warning bar : Unexpected bar.\n\n2 problems');
    });
  });

  // TODO implement fatal messages for this
  // describe('when passed one file not found message', () => {
  //   const code = [{
  //     filePath: 'foo.scss',
  //     messages: [{
  //       fatal: true,
  //       message: 'Couldn\'t find foo.scss.'
  //     }]
  //   }];
  //
  //   it('should return a string without line and column', () => {
  //     const result = formatter(code);
  //
  //     assert.equal(result, 'foo.scss(0): error : Couldn\'t find foo.scss.\n\n1 problem');
  //   });
  // });
});
