    function jscw () {

        var alphabet = {"a": ".-", "b": "-...", "c": "-.-.", "d": "-..", "e": ".", 
            "f": "..-.", "g": "--.", "h": "....", "i": "..", "j": ".---", "k":
            "-.-", "l": ".-..", "m": "--", "n": "-.", "o": "---", "p": ".--.",
            "q": "--.-", "r": ".-.", "s": "...", "t": "-", "u": "..-", "v":
            "...-", "w": ".--", "x": "-..-", "y": "-.--", "z": "--..", 
            "1": ".----", "2": "..---", "3": "...--", "4": "....-", "5":
            ".....", "6": "-....", "7": "--...", "8": "---..", "9": "----.",
            "0": "-----", "/": "-..-.", "+": ".-.-.", "=": "-...-",
            " ":" " };
        var el_len = { ".": 1, "-": 3, " ": 4 };

        this.wpm = 20;
        this.eff = 1000;
        this.freq = 600;
        this.volume = 0.5;
        this.dotlen;
        this.playLength = 0;
        this.playEnd = 0;
        this.playTiming = [];   // last generated text 
        this.init_done = false;
        this.text = "";
        this.paused = true;
        this.progressbar = false;
        this.mode = 'audio';    /* audio: AudioContext, embed: <audio> tag */
        this.icondir = "https://fkurz.net/ham/jscwlib/img/";
        this.cgiurl = "https://cgi2.lcwo.net/cgi-bin/";
        this.real = false;  // If set to true, use Real speed, not PARIS 
        this.vvv = false;
        this.prefix = "vvv = ";
        this.suffix = " +";
        this.textStart = 0;     // time when the actual text starts (without "vvv +", if activated)
        this.textEnd   = Number.MAX_VALUE;     // time when the actual text ends (i.e. without the "+")

        try {
    	    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            console.log("AudioContext OK");   
        }
        catch (e) {
            this.mode = 'embed';
            console.log("AudioContext not supported. Fall back to HTML audio element");   
        }

        this.init = function() {
            if (this.mode == 'embed') {
                if (!this.player) {
                    this.player = document.createElement("audio");
                    document.body.appendChild(this.player);
                }
            }
            else {
                this.gainNode = this.audioCtx.createGain();
                this.oscillator = this.audioCtx.createOscillator();
                this.biquadFilter = this.audioCtx.createBiquadFilter();
                this.noiseFilter = this.audioCtx.createBiquadFilter();
                this.whiteNoise = this.audioCtx.createBufferSource();

                this.noiseFilter.type = "bandpass";
                this.noiseFilter.frequency.setValueAtTime(500, this.audioCtx.currentTime);
                this.noiseFilter.Q.setValueAtTime(5, this.audioCtx.currentTime);
                this.noiseFilter.gain.setValueAtTime(0.9, this.audioCtx.currentTime);

                var bufferSize = 2 * this.audioCtx.sampleRate;
                var noiseBuffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
                var noise = noiseBuffer.getChannelData(0);
                for (var i = 0; i < bufferSize; i++) {
                        noise[i] = Math.random() * 2 - 1;
                }

                this.whiteNoise.buffer = noiseBuffer;
                this.whiteNoise.loop = true;
                // this.whiteNoise.start(0);
                this.whiteNoise.connect(this.noiseFilter);

                this.noiseFilter.connect(this.audioCtx.destination);

                this.biquadFilter.type = "lowpass";
                this.biquadFilter.frequency.setValueAtTime(500, this.audioCtx.currentTime);
                this.biquadFilter.gain.setValueAtTime(0.5, this.audioCtx.currentTime);

                this.oscillator.type = 'sine';
                this.oscillator.frequency.setValueAtTime(600, this.audioCtx.currentTime); // value in hertz

                this.oscillator.connect(this.gainNode);
                this.gainNode.connect(this.biquadFilter);
                this.biquadFilter.connect(this.audioCtx.destination);

                this.gainNode.gain.value = 0;
                this.oscillator.start();
            }
            this.init_done = true;
        }
       
        this.getLength = function () {
            if (this.mode == 'audio') {
                return this.playLength;
            }
            else {
                if (this.player) {
                    return this.player.duration;
                }
                else {
                    return 0;
                }
            }
        }

        this.setIcondir = function (i) {
            this.icondir = f;
        }

        this.setFilter = function (f) {
            this.biquadFilter.frequency.setValueAtTime(f, this.audioCtx.currentTime);
        }

        this.setReal = function (r) {
            console.log("setReal: " + r);
            this.real = r ? true : false;
        }

        this.getRemaining = function () {
            if (!this.init_done) {
                return 0;
            }
            if (this.mode == 'audio') {
                var r = this.playEnd - this.audioCtx.currentTime;
            }
            else {
                var r = this.player.duration - this.player.currentTime;
            }

            if (r >= 0) {
                return Math.round(r*10)/10;;
            }
            else {
                return 0;
            }
        }

        this.getTime = function () {
            if (this.mode == 'audio') {
                var t = this.getLength() - this.getRemaining();
            }
            else {
                var t = this.player.currentTime;
            }
            if (t < 0) {
                return 0;
            }
            else {
                return t;
            }
        }

        this.getPlaytime = function() {
            return this.playLength;
        }

        this.setWpm = function (w) {
            w = parseInt(w);
            this.wpm = w;
            if (this.mode == 'audio')
                this.gainNode.gain.cancelScheduledValues(this.audioCtx.currentTime);
        }

        this.setEff = function (e) {
            console.log("setEff = " + e);
            if (this.mode == 'audio')
                this.gainNode.gain.cancelScheduledValues(this.audioCtx.currentTime);
            e = parseInt(e);
            if (e > this.wpm) {
                console.log("Cannot set eff " + e + " > wpm (" + this.wpm + ")!");
                e = this.wpm;
            }
            this.eff = e;
        }

        this.setFreq = function(f) {
            this.freq = f;
            if (this.mode == 'audio') {
                this.gainNode.gain.cancelScheduledValues(this.audioCtx.currentTime);
                this.oscillator.frequency.setValueAtTime(f, this.audioCtx.currentTime);
                this.biquadFilter.frequency.setValueAtTime(f, this.audioCtx.currentTime);
            }
        }

        this.setVolume = function(v) {
            this.volume = v;
        }
        
        this.setPrefix = function (p) {
            this.prefix = p;
        }

        this.setSuffix = function (s) {
            this.suffix = s;
        }

        this.enablePS = function (b) {
            this.vvv = b ? true : false;
        }

        // draw last generated text on a canvas
        this.draw = function(c) {
            var ctx = c.getContext("2d");
            var w = c.width;
            var h = c.height;
            ctx.fillStyle= '#ffffff';
            ctx.fillRect(0, 0, w, h);

            if (this.playTiming.length == 0) {
                ctx.fillText('Nothing to draw', 0, 10);
                return;
            }

            // duration of last text
            var d = this.playTiming[this.playTiming.length-1]["t"];

            // pixels (width) per second, leave 10 pixels right and left 
            var pps = (w - 20) / d;

            // draw!
            ctx.save();
            ctx.translate(10, h);
            ctx.scale(pps, -1);

            // draw seconds and minutes (if any)
            for (var i = 0; i < d; i++) {
                ctx.lineWidth = 1/pps;

                if (i == 0 || i % 60 == 0) {
                    ctx.lineWidth = 5/pps;
                }

                ctx.beginPath();
                ctx.moveTo(i, 0);
                ctx.lineTo(i, 9);
                ctx.stroke();
            }

            // for < 10 seconds, draw the dot lengths
            if (d < 10) {
                for (var i = 0; i < d; i += this.dotlen) {
                    ctx.beginPath();
                    ctx.moveTo(i, 9);
                    ctx.lineTo(i, 19);
                    ctx.stroke();
                }
            }

            ctx.fillStyle = '#ff00ff';
            for (var i = 0; i < this.playTiming.length-1; i++) {
                if (this.playTiming[i]["v"] > 0) {
                    ctx.fillRect(this.playTiming[i]["t"], 10, this.playTiming[i+1]["t"] - this.playTiming[i]["t"] , 5);
                }
            }
            ctx.restore();
        }

        this.calcSpeed = function () {

            if (this.eff > this.wpm) {
                this.eff = this.wpm;
            }

            var eff = this.eff;
            
            // real speed (not PARIS) => no farnsworth timing, eff = char speed
            if (this.real) {
                eff = this.wpm;
            }

            this.dotlen = 1.2 / this.wpm;   // ms
            this.effdotlen = 1.2 / eff;
            // stretch all pauses by this magic formula (fitted to a measured
            // set :) to get a good match. One day I will do the proper math!
            var stretch = (2.5 - 1.5/(Math.pow((this.wpm / eff),1.25)));
            this.fwdotlen = this.effdotlen  * stretch;
            this.letterspace = 3 * this.fwdotlen;
            this.wordspace = 7 * this.fwdotlen - this.letterspace;
        }

        this.setText = function(text) {
            this.text = text.toLowerCase();
            if (this.btn_down) {
                this.btn_down.href = this.cgiurl + "cw.mp3?s=" + this.wpm + "&e=" + this.eff + "&f=" + this.freq + "&t=" + this.text + "%20%20%20%20%5E";
                this.btn_down.download = "cw.mp3";
            }
        }

        this.play = function(playtext) {
            if (!this.init_done) {
                this.init();
            }

            this.paused = false;

            var text = playtext ? playtext : this.text;
            this.text = text;

            if (this.mode == 'embed') {
                this.player.src = this.cgiurl + "cw.mp3?s=" + this.wpm + "&e=" + this.eff + "&f=" + this.freq + "&t=" + text + "%20%20%20%20%5E";
                this.player.play();
                console.log(this.player);
                return;
            }    

            text = text.toLowerCase();
            this.setText(text);

            var start = this.audioCtx.currentTime + 0.01;

            // generate array with all events on a timeline.
            // possible events are 
            // 1) changes of volume (the Morse "keying") itself
            // 2) changes of tone frequency 
            // returns an an object:
            // { "nc": num_chars, "length": length_seconds, "timings": timing_array, "paris": paris_speed }

            if (this.vvv && !this.real) {
                text = this.prefix + text + this.suffix;
            }
            var ret = this.gen_morse_events(text);

            // if we want prefix/suffix *and* real characters, we need to
            // calculate generate the correct timing for the text *without*
            // prefix/suffix first (which we did above), and now re-build
            // it at the calculated PARIS speed, with prefix/suffix added.
            if (this.vvv && this.real) {
                this.real = false;
                var wpm_set = this.wpm;
                var eff_set = this.eff;
                this.wpm = ret["paris"];
                this.eff = ret["paris"];
                ret = this.gen_morse_events(this.prefix + text + this.suffix);
                // restore settings
                this.wpm = wpm_set;
                this.eff = eff_set;
                this.real = true;
            }

            var out = ret["timings"];

            if (!out.length) {
                return;
            }

            for (var i = 0; i < out.length; i++) {
                var s = start + out[i]['t'];
                // volume change
                if (out[i].hasOwnProperty('v')) {
                    this.gainNode.gain.setValueAtTime(out[i]['v'], s);
                }
                // freq change
                if (out[i].hasOwnProperty('f')) {
           		    this.oscillator.frequency.setValueAtTime(out[i]['f'], s); // value in hertz
                }
            }

            this.playLength = out[out.length-1]['t'];
            this.playEnd = start + this.playLength;
            this.playTiming = out;

        } // play

        // pause simply suspends this audioCtx
        this.pause = function () {
            if (this.audioCtx.state === "running") {
                this.paused = true;
                this.audioCtx.suspend();
            }
            else {
                this.paused = false;
                this.audioCtx.resume();
            }
            console.log("paused: " + this.paused);
        }

        this.stop = function() {
            if (this.mode == 'audio') {
                this.gainNode.gain.cancelScheduledValues(this.audioCtx.currentTime);
                this.gainNode.gain.setValueAtTime(0, this.audioCtx.currentTime);
                this.playEnd = 0;
            }
            else {
                this.player.pause();
            }
        }

        // in: a single character (except space) and a start time
        // out: array of timing for this character w/o spaces after the last element, starting at "time"
        this.gen_morse_timing = function(c, time) {
            var out = [];
            var l = alphabet[c];

            for (var j = 0; j < l.length; j++) {
                var el = l.substr(j,1);  // . or -
                out.push({"t": time, "v": this.volume});
                time += this.dotlen * el_len[el];
                out.push({"t": time, "v": 0});
                if (j < l.length - 1) {
                    time += this.dotlen;
                }
            }

            out.push({"t": time, "v": 0});
            return out;
        }

        this.gen_morse_events = function(text) {
            var out = [];
            var time = 0;
           
            this.textStart = 0;
            this.textEnd = Number.MAX_VALUE;

            this.setFreq(this.freq);    // reset freq (might have been changed by |f command)
            this.calcSpeed();   // set this.dotlen, effdotlen, fwdotlen, letterspace, worspace

            // number of actual characters (not including control sequences)
            var nc = 0;

            for (var i = 0; i < text.length; i++) {
                var c = text.substr(i, 1);
                if (c == "|") { /* text command */
                    i++;
                    c = text.substr(i, 1);
                    i++;
                    var arg = text.substr(i).split(" ");
                    i+= arg[0].length;
                    switch (c) {
                        case 'f':
                            out = out.concat({"t": time, "f": arg[0]});
                            console.log("Setting f = " + arg[0] + " at " + time);
                            break;
                        case 'w':
                            this.wpm = arg[0];
                            this.calcSpeed();
                            break;
                        case 'e':
                            this.eff = arg[0];
                            this.calcSpeed();
                            break;
                        case 'v':
                            this.volume = parseFloat(arg[0]);
                            break;
                        case 's':
                            time += arg[0] / 1000;
                            break;
                        default:
                            alert(c);
                    }
                }
                else if (c != " ") {
                    out = out.concat(this.gen_morse_timing(c, time));
                    time = out[out.length - 1]['t'];
                    time += this.letterspace;
                    nc++;
                }
                else {
                    time += this.wordspace;
                }

                // is the prefix over?
                if (this.vvv && i == (this.prefix.length - 1)) {
                    this.textStart = time;
                }
                // is the suffix beginning?
                if (this.vvv && i == text.length - this.suffix.length) {
                    this.textEnd = time;
                }
            }

            // real characters requested, not PARIS.
            // this means we need to multiply the 
            // PARIS timing by a factor, which we now
            // calculate
            if (this.real == true) {
                // length of generated CW (last element end)
                var l = out[out.length-1]['t'];
                console.log("Characters: " + nc);
                console.log("Length: " + l);
                var real = nc / (l/60) / 5;
                console.log("Real speed words/min: " + real);
                var mult = this.wpm / real;
                console.log("mult " + mult);
                for (var i = 0; i < out.length; i++) {
                    out[i]['t'] = out[i]['t'] / mult;
                }
                this.paris = this.wpm * mult;
                this.textStart /= mult;
                this.textEnd /= mult;
            }
            else {
                this.paris = this.eff;
            }
            console.log("Equivalent PARIS speed = " + this.paris);

            return { "nc": nc, "paris": this.paris, "length": time, "timings": out };
        } // gen_morse_events

        this.setProgressbar = function(pb, l) {
            console.log("setProgressbar");
            console.log(pb);
            this.progressbar = pb;
            this.progresslabel = l;
            console.log(this.progressbar);
            window.setInterval(this.progressbarUpdate, 100, this)
        }

        this.progressbarUpdate = function (obj) {
            if (obj.progressbar) {
                if (obj.mode == 'audio') {
                    obj.progressbar.max = obj.getLength();
                    obj.progressbar.value = obj.getLength() - obj.getRemaining();
                }
                else {
                    try {
                        obj.progressbar.max =  obj.player.duration;
                        obj.progressbar.value = obj.player.currentTime;
                    }
                    catch (e) {
                        return;
                    }
                }
                var sec = obj.progressbar.value;
                var min = 0;

                sec -= obj.textStart;   // start in negative time if we have vvv prefx
                var sign = sec >= 0 ? " " : "-";
                sec = Math.abs(sec);
                
                while (sec > 60) {
                    min++;
                    sec -= 60;
                }

                if (sign == "-") {
                    sec = Math.ceil(sec);
                }
                else {
                    sec = Math.floor(sec);
                }

                if (sec < 10) {
                    sec = "0" + sec;
                }

                var fmt_time = " " + sign + min + ":" + sec;

                obj.progresslabel.innerHTML = fmt_time;

                if (obj.paused || obj.getRemaining() == 0) {
                    if (obj.btn_pp.src != obj.icondir + "play.png") {
                        obj.btn_pp.src = obj.icondir + "play.png";
                    }
                }
                else {
                    if (obj.btn_pp.src != obj.icondir + "pause.png") {
                        obj.btn_pp.src = obj.icondir + "pause.png";
                    }
                }
            }
        }

        // render a player with play/pause button to element "el"
        this.renderPlayer = function(el, obj) {
            var el = document.getElementById(el);
            el.innerHTML = "";
            el.style.width = '140px';
            el.style.borderWidth = 'thin';
            el.style.borderStyle= 'dashed';
            el.style.padding = '6px';
            el.style.margin= '6px';
            el.style.fontFamily = 'Ubuntu,calibri,tahoma,arial,sans-serif';

            var l = document.createElement("label");
            l.for = "pb";
            l.innerHTML= "0:00 ";
            l.style.fontSize = "12px";

            var pb = document.createElement("progress");
            pb.style.width = '140px';
            pb.style.height = '15px';
            obj.setProgressbar(pb, l);
            var btn_pp = document.createElement("img");
            btn_pp.src = obj.icondir + "play.png";
            btn_pp.title = "Play / Pause";
            btn_pp.style.borderRadius = "3px";
            btn_pp.style.backgroundColor = "#dadada";
            btn_pp.style.cursor = "pointer";
            btn_pp.style.border = "1px solid #555555";
            btn_pp.style.textAlign = "center";
            btn_pp.style.padding = "0px 0px";
            btn_pp.style.margin = "4px";
            btn_pp.style.display = "inline-block";
            btn_pp.style.verticalAlign = "middle";
            btn_pp.style.textDecoration = "none";
            btn_pp.style.color = "#000000";
            obj.btn_pp = btn_pp;
            btn_pp.onclick = function () {
                if (obj.getRemaining()) {
                    obj.pause();
                }
                else {
                    obj.play(); 
                }

            }
            var btn_stop = document.createElement("img");
            btn_stop.title = obj.text;
            btn_stop.style.borderRadius = "3px";
            btn_stop.style.backgroundColor = "#dadada";
            btn_stop.style.cursor = "pointer";
            btn_stop.style.border = "1px solid #555555";
            btn_stop.style.textAlign = "center";
            btn_stop.style.padding = "0px 0px";
            btn_stop.style.margin = "4px";
            btn_stop.style.display = "inline-block";
            btn_stop.style.textDecoration = "none";
            btn_stop.style.verticalAlign = "middle";
            btn_stop.style.color = "#000000";
            btn_stop.src = obj.icondir + "stop.png";
            btn_stop.title = "Stop";
            btn_stop.onclick = function () {
                obj.stop();
            }
            var btn_down = document.createElement("a");
            var btn_down_img = document.createElement("img");
            btn_down_img.style.borderRadius = "3px";
            btn_down_img.style.backgroundColor = "#dadada";
            btn_down_img.style.cursor = "pointer";
            btn_down_img.style.border = "1px solid #555555";
            btn_down_img.style.textAlign = "center";
            btn_down_img.style.padding = "0px 0px";
            btn_down_img.style.margin = "4px";
            btn_down_img.style.display = "inline-block";
            btn_down_img.style.verticalAlign = "middle";
            btn_down_img.style.textDecoration = "none";
            btn_down_img.style.color = "#000000";
            btn_down_img.src = obj.icondir + "download.png";
            btn_down.appendChild(btn_down_img);
            btn_down.title = "Download MP3";
            obj.btn_down = btn_down;
            btn_down.onclick = function () {
                obj.setText(obj.text);
            }

            el.appendChild(pb);
            el.appendChild(btn_stop);
            el.appendChild(btn_pp);
            el.appendChild(btn_down);
            el.appendChild(l);
            this.el = el;
        }

    } // class jscw

