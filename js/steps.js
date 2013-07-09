// Generated by CoffeeScript 1.3.3

/*
  This is the main script file. It can attach to the terminal
*/


/*
  Register the things
*/


(function() {
  var buildfunction, current_question, currentquestion, f, leaveFullSizeMode, next, previous, q, question, questions, results, _i, _len;

  this.webterm = $('#terminal').terminal(interpreter, basesettings);

  /*
    Start with the questions
  */


  questions = [];

  current_question = 0;

  next = function() {
    current_question++;
    questions[current_question]();
    results.clear();
    this.webterm.focus();
    if (!$('#tipShownText').hasClass('hidden')) {
      $('#tipShownText').addClass("hidden");
      $('#tipHiddenText').removeClass("hidden").show();
    }
  };

  previous = function() {
    current_question--;
    questions[current_question]();
    results.clear();
    this.webterm.focus();
  };

  results = {
    set: function(htmlText, intermediate) {
      if (intermediate) {
        console.debug("intermediate text received");
        $('#results').addClass('intermediate');
        $('#buttonNext').hide();
      } else {
        $('#buttonNext').show();
      }
      return window.setTimeout((function() {
        $('#resulttext').html(htmlText);
        $('#results').fadeIn();
        return $('#buttonNext').removeAttr('disabled');
      }), 300);
    },
    clear: function() {
      $('#resulttext').html("");
      return $('#results').fadeOut('slow');
    }
  };

  /*
    Array of question objects
  */


  q = [];

  q.push({
    html: "<h2>Getting started</h2>\n<p>There are actually two programs, a Docker daemon, it manages al the containers, and the Docker client.\nThe client acts as a remote control on the daemon. On most systems, like in this emulation, both run on the\nsame host.</p>",
    assignment: "<h2>Assignment</h2>\n<p>First of all, we want to check if docker is installed correctly and running</p>\n<p><em>docker version</em> will show the versions docker is running. If you get the version numbers, you know\nyou are all set.</p>",
    command_expected: ['docker', 'version'],
    result: "<p>Well done! Let's move to the next assignment.</p>",
    tip: "try typing `docker version`"
  });

  q.push({
    html: "<h2>Searching for images</h2>\n<p>The easiest way of getting started is to use a container image from someone else. Container images are\navailable on the docker index and can be found using <em>docker search</em></p>",
    assignment: "<h2>Assignment</h2>\n<p>Please find for an image called tutorial</p>",
    command_expected: ['docker', 'search', 'tutorial'],
    result: "<p>You found it!</p>",
    tip: "the format is `docker search &lt;imagename&gt;`"
  });

  q.push({
    html: "<h2>Downloading container images</h2>\n<p>Container images can be downloaded just as easily, using <em>docker pull.</em></p>\n<p>The name you specify is made up of two parts: the <em>username</em> and the <em>repository name</em>,\ndivided by a slash `/`.</p>\n<p>A group of special, trusted images can be retrieved by just their repository name. For example 'ubuntu'.</p>",
    assignment: "<h2>Assignment</h2>\n<p>Please download the tutorial image you have just found</p>",
    command_expected: ['docker', 'pull', 'learn/tutorial'],
    result: "<p>Cool. Look at the results. You'll see that docker has downloaded a number of layers. In Docker all images (except the base image) are made up of several cumulative layers.</p>",
    tip: "Don't forget to pull the full name of the repository e.g. 'learn/tutorial'"
  });

  q.push({
    html: "<h2>Hello world from a container</h2>\n<p>You should think about containers as an operating system in a box, except they do not need to be started\nbefore you can run commands in them.<p>\n<p>Expect that you will be able to run the usual commands such as </p>\n<p>The command `docker run` takes two arguments. An image name, and the command you want to execute within that\nimage.</p>",
    assignment: "<h2>Assignment</h2>\n<p>Make our freshly loaded container image image output \"hello world\"</p>",
    command_expected: ["docker", "run", "learn/tutorial", "echo"],
    result: "<p>Great! Hellooooo World!</p>",
    intermediateresults: ["<p>You seem to be almost there. Did you give the command `echo \"hello world\"` ", "<p>You've got the arguments right. Did you get the command? Try <em>/bin/bash </em>?</p>"],
    tip: "Start by looking at the results of `docker run` it tells you which arguments exist"
  });

  q.push({
    html: "<h2>Installing things in the container</h2>\n<p>Next we are going to install a simple program in the container. The image is based upon ubuntu, so we can run\n“apt-get install -y iputils-ping”. Docker will install this command in the container and exit, showing you the\ncontainer id.</p>",
    assignment: "<h2>Assignment</h2>\n<p>Install 'ping' inside of the container.</p>",
    command_expected: ["docker", "run", "learn/tutorial", "apt-get install -y netutils-ping"],
    result: "<p>That worked!</p>",
    intermediateresults: ["<p>This will work for ping, because it has no other dependencies. To get into the habit. Please add -y.</p>"],
    tip: "don't forget to use -y for noninteractive mode installation"
  });

  q.push({
    html: "<h2>Interactive Shell</h2>\n<p>Now, since Docker provides you with the equivalent of a complete operating system you are able to get\nan interactive shell (tty) <em>inside</em> of the container.</p>\n<p>Since we want a prompt in the container, we need to start the shell program in the container. </p>\n<p>You may never have manually started it before, but a popular one typically lives at `/bin/bash`</p>",
    assignment: "<h2>Assignment</h2>\n<p>Your goal is to run the tutorial container you have\njust downloaded and get a shell inside of it.</p>",
    command_expected: ["docker", "run", "-i", "-t", "learn/tutorial", "/bin/bash"],
    result: "<p>Great!! Now you have an interactive terminal</p>",
    intermediateresults: ["<p>You seem to be almost there. Did you use <em>-i and -t</em>?</p>", "<p>You've got the arguments right. Did you get the command? Try <em>/bin/bash </em>?</p>", "<p>You have the command right, but the shell exits immediately, before printing anything</p>\n<p>You will need to attach your terminal to the containers' terminal.</p>"],
    tip: "Start by looking at the results of `docker run`, it shows which arguments exist"
  });

  q.push({
    html: "<h2>Save your changes</h2>\n<p>After you make changes (by running a command inside a container) you probably want to save those changes.\nThis will enable you to later start from this point (savepoint) onwards.</p>\n<p>With Docker the process of saving the state is called \"committing\". Commit basically saves the difference\nbetween the old image and the new state. -Creating a layer. </p>\n<p>You can only save containers which are stopped.</p>",
    assignment: "<h2>Assignment</h2>\n<p>Save (commit) the container you created with ping installed. </p>",
    command_expected: ["docker", "commit"],
    result: "<p>That worked!</p>",
    intermediateresults: [],
    tip: "don't forget to append the container id to commit"
  });

  /*
    Transform question objects into functions
  */


  buildfunction = function(q) {
    var _q;
    _q = q;
    return function() {
      console.debug("function called");
      $('#instructions').hide().fadeIn();
      $('#instructions .text').html(_q.html);
      $('#instructions .assignment').html(_q.assignment);
      $('#tipShownText').html(_q.tip);
      window.immediateCallback = function(input, stop) {
        var doNotExecute;
        if (stop === true) {
          doNotExecute = true;
        } else {
          doNotExecute = false;
        }
        if (doNotExecute !== true) {
          console.log(input);
          if (input.containsAllOfThese(_q.command_expected)) {
            results.set(_q.result);
            console.debug("contains match");
          } else {
            console.debug("wrong command received");
          }
        } else {

        }
      };
      window.intermediateResults = function(input) {
        var intermediate;
        return results.set(_q.intermediateresults[input], intermediate = true);
      };
    };
  };

  for (_i = 0, _len = q.length; _i < _len; _i++) {
    question = q[_i];
    f = buildfunction(question);
    questions.push(f);
  }

  /*
    Initialization of program
  */


  if (window.location.hash) {
    try {
      currentquestion = window.location.hash.split('#')[1].toNumber();
      questions[currentquestion]();
      current_question = currentquestion;
    } catch (err) {
      questions[0]();
    }
  } else {
    questions[0]();
  }

  $('#results').hide();

  /*
    Event handlers
  */


  $('#buttonNext').click(function() {
    next();
    return $('#results').hide();
  });

  $('#buttonPrevious').click(function() {
    previous();
    return $('#results').hide();
  });

  $('#fullSizeOpen').click(function() {
    console.debug("going to fullsize mode");
    $('#overlay').addClass('fullsize');
    $('#main').addClass('fullsize');
    $('#tutorialTop').addClass('fullsize');
    return webterm.resize();
  });

  $('#fullSizeClose').click(function() {
    return leaveFullSizeMode();
  });

  leaveFullSizeMode = function() {
    console.debug("leaving full-size mode");
    $('#overlay').removeClass('fullsize');
    $('#main').removeClass('fullsize');
    $('#tutorialTop').removeClass('fullsize');
    return webterm.resize();
  };

  $('#tips').click(function() {
    if (!$('#tipHiddenText').hasClass('hidden')) {
      $('#tipHiddenText').addClass("hidden").hide();
      return $('#tipShownText').hide().removeClass("hidden").fadeIn();
    }
  });

}).call(this);