function printStackTrace() {
  var callstack = [];
  var isCallstackPopulated = false;
  try {
    i.dont.exist+=0; //doesn't exist- that's the point
  } catch(e) {
    if (e.stack) { //Firefox
      var lines = e.stack.split('\n');
      for (var i=0, len=lines.length; i<len; i++) {
        if (lines[i].match(/^\s*[A-Za-z0-9\-_\$]+\(/)) {
          callstack.push(lines[i]);
        }
      }
      //Remove call to printStackTrace()
      callstack.shift();
      isCallstackPopulated = true;
    }
    else if (e.message) { //Opera
      var lines = e.message.split('\n');
      for (var i=0, len=lines.length; i<len; i++) {
        if (lines[i].match(/^\s*[A-Za-z0-9\-_\$]+\(/)) {
          var entry = lines[i];
          //Append next line also since it has the file info
          if (lines[i+1]) {
            entry += ' at ' + lines[i+1];
            i++;
          }
          callstack.push(entry);
        }
      }
      //Remove call to printStackTrace()
      callstack.shift();
      isCallstackPopulated = true;
    }
  }
  // if (!isCallstackPopulated) { //IE and Safari
  //   var currentFunction = arguments.callee.caller;
  //   while (currentFunction) {
  //     var fn = currentFunction.toString();
  //     var fname = fn.substring(fn.indexOf'') + 8, fn.indexOf('')) || 'anonymous';
  //     callstack.push(fname);
  //     currentFunction = currentFunction.caller;
  //   }
  // }
  output(callstack);
}

function output(arr) {
  //Optput however you want
  console.log(arr.join('\n\n'));
}


function foo() {
    var blah;
    bar('blah');
}

function bar(blah) {
    // some code
    thing();
}

function thing() {
    if (true) { //your error condition here
        printStackTrace();
    }
}

foo();