    function jscw () {

        var alphabet = {"a": ".-", "b": "-...", "c": "-.-.", "d": "-..", "e": ".", 
            "f": "..-.", "g": "--.", "h": "....", "i": "..", "j": ".---", "k":
            "-.-", "l": ".-..", "m": "--", "n": "-.", "o": "---", "p": ".--.",
            "q": "--.-", "r": ".-.", "s": "...", "t": "-", "u": "..-", "v":
            "...-", "w": ".--", "x": "-..-", "y": "-.--", "z": "--..", 
            "1": ".----", "2": "..---", "3": "...--", "4": "....-", "5":
            ".....", "6": "-....", "7": "--...", "8": "---..", "9": "----.",
            "0": "-----", "/": "-..-.",
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
        this.paused = false;
        this.progressbar = false;

        this.init = function() {
		    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
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
    //        whiteNoise.start(0);
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
            this.init_done = true;
        }
       
        this.getLength = function () {
            return this.playLength;
        }

        this.setFilter = function (f) {
            this.biquadFilter.frequency.setValueAtTime(f, this.audioCtx.currentTime);
        }

        this.getRemaining = function () {
            if (!this.init_done) {
                return 0;
            }
            var r = this.playEnd - this.audioCtx.currentTime;
            if (r >= 0) {
                return Math.round(r*10)/10;;
            }
            else {
                return 0;
            }
        }

        this.getTime = function () {
            var t = this.getLength() - this.getRemaining();
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
            this.gainNode.gain.cancelScheduledValues(this.audioCtx.currentTime);
            this.wpm = w;
        }

        this.setEff = function (e) {
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
            this.gainNode.gain.cancelScheduledValues(this.audioCtx.currentTime);
            this.oscillator.frequency.setValueAtTime(f, this.audioCtx.currentTime);
            this.biquadFilter.frequency.setValueAtTime(f, this.audioCtx.currentTime);
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

            this.dotlen = 1.2 / this.wpm;   // ms
            this.effdotlen = 1.2 / this.eff;
            // stretch all pauses by this magic formula (fitted to a measured
            // set :) to get a good match. One day I will do the proper math!
            var stretch = (2.5 - 1.5/(Math.pow((this.wpm / this.eff),1.25)));
            this.fwdotlen = this.effdotlen  * stretch;
            this.letterspace = 3 * this.fwdotlen;
            this.wordspace = 7 * this.fwdotlen - this.letterspace;
        }

        this.setText = function(text) {
            this.text = text.toLowerCase();
        }

        this.play = function(playtext) {
            var out = [];   // time instants when we switch the sound on and off
            var ele = [];   // details of timing elements
            var time = 0;
            var start = this.audioCtx.currentTime + 0.01;

            this.setFreq(this.freq);    // reset freq (might have been changed by |f command)
            this.calcSpeed();   // set this.dotlen, effdotlen, fwdotlen, letterspace, worspace

            var text = playtext ? playtext.toLowerCase() : this.text;
            this.text = text;

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
                		    this.oscillator.frequency.setValueAtTime(arg[0], start + time); // value in hertz
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
                }
                else {
                    time += this.wordspace;
                }
            }

            for (var i = 0; i < out.length; i++) {
                var s = start + out[i]['t'];
                var v = out[i]['v'];
                this.gainNode.gain.setValueAtTime(v, s);
            }

            this.playLength = out[out.length-1]['t'];
            this.playEnd = start + this.playLength;
            this.playTiming = out;

        } // play

        // we cannot really pause, so what we do in case of pause:
        // 1. cancel future output
        // 2. remember at which place we were in playing out[]
        // 3. when resumed, play everything after the current moment
        this.pause = function () {
            if (this.audioCtx.state === "running") {
                this.paused = true;
                this.audioCtx.suspend();
            }
            else {
                this.paused = false;
                this.audioCtx.resume();
            }
        }

        this.stop = function() {
            this.gainNode.gain.cancelScheduledValues(this.audioCtx.currentTime);
            this.gainNode.gain.setValueAtTime(0, this.audioCtx.currentTime);
            this.playEnd = 0;
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
                obj.progressbar.max = obj.getLength();
                obj.progressbar.value = obj.getLength() - obj.getRemaining();
                var sec = obj.getTime();
                var min = 0;
                
                while (sec > 60) {
                    min++;
                    sec -= 60;
                }

                sec = Math.floor(sec);
                if (sec < 10) {
                    sec = "0" + sec;
                }

                var fmt_time = min + ":" + sec + " ";

                obj.progresslabel.innerHTML = fmt_time;
            }
        }

        // render a player with play/pause button to element "el"
        this.renderPlayer = function(el) {
            obj = this;
            var el = document.getElementById(el);
            el.innerHTML = "";
            el.style.width = '160px';
            el.style.borderWidth = 'thin';
            el.style.borderStyle= 'dashed';
            el.style.padding = '6px';
            el.style.fontFamily = 'Ubuntu,calibri,tahoma,arial,sans-serif';

            var l = document.createElement("label");
            l.for = "pb";
            l.innerHTML= "0:00 ";

            var pb = document.createElement("meter");
            pb.style.width = '120px';
            obj.setProgressbar(pb, l);
            var btn_stop = document.createElement("button");
            btn_stop.innerHTML = "Stop";
            btn_stop.style.width = "50px";
            btn_stop.onclick = function () {
                obj.stop();
            }
            var btn_pp = document.createElement("button");
            btn_pp.innerHTML = "Play / Pause";
            btn_pp.style.width = "100px";
            btn_pp.onclick = function () {
                if (obj.getRemaining()) {
                    obj.pause();
                }
                else {
                    obj.play(); 
                }
            }
            el.appendChild(l);
            el.appendChild(pb);
            el.appendChild(btn_stop);
            el.appendChild(document.createTextNode(" "));
            el.appendChild(btn_pp);
        }

    } // class jscw

