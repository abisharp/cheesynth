// Generated by CoffeeScript 1.8.0
(function() {
  var CheeSynth, Test, test,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  CheeSynth = (function() {
    CheeSynth.prototype.toString = function() {
      return '[object CheeSynth]';
    };

    function CheeSynth(opt) {}

    return CheeSynth;

  })();

  window.CheeSynth = CheeSynth;

  Test = (function() {
    var invisibles, toType;

    Test.prototype.toString = function() {
      return '[object Test]';
    };

    Test.prototype.jobs = [];

    function Test(opt) {
      if (opt == null) {
        opt = {};
      }
      this.run = __bind(this.run, this);
    }

    Test.prototype.run = function() {
      var actual, double, expect, job, md, name, result, runner, summary, tallies, _i, _len, _ref;
      md = [];
      tallies = [0, 0];
      double = null;
      _ref = this.jobs;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        job = _ref[_i];
        switch (toType(job)) {
          case 'function':
            double = job(double);
            break;
          case 'string':
            md.push(job);
            break;
          case 'array':
            runner = job[0], name = job[1], expect = job[2], actual = job[3];
            result = runner(expect, actual, double);
            if (!result) {
              md.push("\u2713 " + name + "  ");
              tallies[0]++;
            } else {
              md.push("\u2718 " + name + "  ");
              md.push("    " + result + "  ");
              tallies[1]++;
            }
        }
        summary = "  passed " + tallies[0] + "/" + (tallies[0] + tallies[1]) + " ";
        summary += tallies[1] ? '\u2718' : '\u2714';
      }
      md.unshift('<a href="#end" id="top">\u2b07</a>' + summary);
      md.push('\n<a href="#top" id="end">\u2b06</a>' + summary);
      return md.join('\n');
    };

    Test.prototype.section = function(text) {
      return this.jobs.push(("\n\n" + text + "\n-") + (new Array(text.length).join('-')) + '\n');
    };

    Test.prototype.custom = function(tests, runner) {
      var i, test, _i, _len;
      for (i = _i = 0, _len = tests.length; _i < _len; i = ++_i) {
        test = tests[i];
        if ('function' === toType(test)) {
          this.jobs.push(test);
        } else {
          this.jobs.push([runner, test, tests[++_i], tests[++_i]]);
        }
      }
      return this.jobs.push('- - -');
    };

    Test.prototype.fail = function(result, delivery, expect, types) {
      if (types) {
        result = "" + (invisibles(result)) + " (" + (toType(result)) + ")";
        expect = "" + (invisibles(expect)) + " (" + (toType(expect)) + ")";
      }
      return "" + (invisibles(result)) + "\n    ...was " + delivery + ", but expected...\n    " + (invisibles(expect));
    };

    invisibles = function(value) {
      return value.toString().replace(/^\s+|\s+$/g, function(match) {
        return '\u00b7' + (new Array(match.length)).join('\u00b7');
      });
    };

    Test.prototype.throws = function(tests) {
      return this.custom(tests, (function(_this) {
        return function(expect, actual, double) {
          var e, error;
          error = false;
          try {
            actual(double);
          } catch (_error) {
            e = _error;
            error = e.message;
          }
          if (!error) {
            return "No exception thrown, expected...\n    " + expect;
          } else if (expect !== error) {
            return _this.fail(error, 'thrown', expect);
          }
        };
      })(this));
    };

    Test.prototype.equal = function(tests) {
      return this.custom(tests, (function(_this) {
        return function(expect, actual, double) {
          var e, error, result;
          error = false;
          try {
            result = actual(double);
          } catch (_error) {
            e = _error;
            error = e.message;
          }
          if (error) {
            return "Unexpected exception...\n    " + error;
          } else if (expect !== result) {
            return _this.fail(result, 'returned', expect, result + '' === expect + '');
          }
        };
      })(this));
    };

    Test.prototype.is = function(tests) {
      return this.custom(tests, (function(_this) {
        return function(expect, actual, double) {
          var e, error, result;
          error = false;
          try {
            result = actual(double);
          } catch (_error) {
            e = _error;
            error = e.message;
          }
          if (error) {
            return "Unexpected exception...\n    " + error;
          } else if (expect !== toType(result)) {
            return _this.fail("type " + (toType(result)), 'returned', "type " + expect);
          }
        };
      })(this));
    };

    toType = function(x) {
      return {}.toString.call(x).match(/\s([a-z|A-Z]+)/)[1].toLowerCase();
    };

    return Test;

  })();

  test = new Test;

  CheeSynth.runTest = test.run;

  test.section("Constructor");

  test.is([
    "Instantiate with no arguments", 'object', function() {
      return new CheeSynth();
    }
  ]);

  test.equal([
    "`toString()` as expected", '[object CheeSynth]', function() {
      return (new CheeSynth()).toString();
    }
  ]);

}).call(this);