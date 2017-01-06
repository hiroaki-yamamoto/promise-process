# Promise object for child_process.spawn

## What This?
This script generates `Promise` Object of `child_process.spawn`.

## Why invented?
Using `child_process.spawn`, `ChildProcess` is returned, and `ChildProcess`
approach is great for applications that runs in the long term. However, the
most applications have command line arguments as inputs, and they output
text to stdout / stderr, and then exit the app in the short term. It means
`ChildProcess` seems to have too many functions for "Run and Away"
apps (Moreover, [gulp] handles **only** stream pipe and `Promise` objects).

This script generates a `Promise` object with `child_process.spawn` and it
takes `then` and `catch` approach.

[gulp]: http://gulpjs.com/

## Installation
There are 2 ways:

* Running `npm install simple-process` tries to get the latest stable version
  and this is the recommended way to get this script.
* Cloning this repo is the secondary way to use this scipt, but its un-stability
  is the notable point.

## How to use

### General Purpose
To run apps, using `simple-process` directly is the most suitable way. i.e.
code like this:

```Javascript
(() => {
  'use strict';
  let command = require('simple-process');
  module.exports = () => {
    // Single command use
    command('ls --color=auto').then((result) => {
      console.log(result.stdout);
      console.warn(result.stderr);
    });
    // Multiple commands use
    command([`cd ${__dirname}/src`, 'ls --color=none']).then((result) => {
      console.log(result.stdout);
      console.warn(result.stderr);
    });
    // Handle Error Case
    command(['jugem jugem', 'gokoh no', 'surikire']).then((result) => {
      console.log(result.stdout);
      console.warn(result.stderr);
    }).catch((stats) => {
      if (stats instanceof Error) {
        throw stats
      } else {
        console.log(stats.code, stats.signal, stats.stdout, stats.stderr);
      }
    });
    // Non shell mode. Note that non-shell mode accepts only a single command.
    command('ls', ['--color=auto'], {'shell': false}).then((result) => {
      console.log(result.stdout);
      console.warn(result.stderr);
    });
  };
})();
```

### Python with pyvenv
If you have python apps and want to run them in virtual environment, there's a
suitable wrapper in this script: `simple-process.pyvenv`. To use it, code
like this:

```Javascript
(() => {
  'use strict';
  let command = require('simple-process');
  module.exports = () => {
    // Single command
    command.pyvnenv('hello.py').then((result) => {
      console.log(result.stdout);
      console.warn(result.stderr);
    }).catch((stats) => {
      if (stats instanceof Error) {
        throw stats
      } else {
        console.log(stats.code, stats.signal, stats.stdout, stats.stderr);
      }
    });
    // Multiple commands
    command.pyvnenv(['start.py', 'compile.py']).then((result) => {
      console.log(result.stdout);
      console.warn(result.stderr);
    }).catch((stats) => {
      if (stats instanceof Error) {
        throw stats
      } else {
        console.log(stats.code, stats.signal, stats.stdout, stats.stderr);
      }
    });
    // Additional Venv search path
    command.pyvnenv('hello.py', ['vendor/pyvenv', 'myenv']).then((result) => {
      console.log(result.stdout);
      console.warn(result.stderr);
    }).catch((stats) => {
      if (stats instanceof Error) {
        throw stats
      } else {
        console.log(stats.code, stats.signal, stats.stdout, stats.stderr);
      }
    });
    // Overwtite Venv search path
    command.pyvnenv(
      'hello.py', ['vendor/pyvenv', 'myenv'], true
    ).then((result) => {
      console.log(result.stdout);
      console.warn(result.stderr);
    }).catch((stats) => {
      if (stats instanceof Error) {
        throw stats
      } else {
        console.log(stats.code, stats.signal, stats.stdout, stats.stderr);
      }
    });
  };
})();
```

Note that you can't run pyvenv function with non-shell mode because `pyvenv`
doesn't provide any options to control `child_process.spawn` while
`simple-process` function provides. i.e. `pyvenv` always run in shell-mode.

### Ruby with bundler

If you have ruby apps and want to run them in bundler's environment, there's a
suitable wrapper in this script: `simple-process.bundleExec`. To use it, code
like this:

```Javascript
'use strict';
let command = require('simple-process');
module.exports = () => {
  // Single command
  command.bundleExec('hello.rb').then((result) => {
    console.log(result.stdout);
    console.warn(result.stderr);
  }).catch((stats) => {
    if (stats instanceof Error) {
      throw stats
    } else {
      console.log(stats.code, stats.signal, stats.stdout, stats.stderr);
    }
  });
  // Multiple commands
  command.bundleExec(['start.rb', 'compile.rb']).then((result) => {
    console.log(result.stdout);
    console.warn(result.stderr);
  }).catch((stats) => {
    if (stats instanceof Error) {
      throw stats
    } else {
      console.log(stats.code, stats.signal, stats.stdout, stats.stderr);
    }
  });
};
})();
```

### Contribution

If you found bugs, feel free to create an issue at [github issues tracker],
but sending [Pull requests] is more appreciated. When you send Pull Requests,
don't forget to add your name to `contributors` list in [package.json].

[github issues tracker]: https://github.com/hiroaki-yamamoto/simple-process/issues
[Pull requests]: https://github.com/hiroaki-yamamoto/simple-process/pulls
[package.json]: package.json

## License (MIT License)
Copyright 2017- Hiroaki Yamamoto

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
