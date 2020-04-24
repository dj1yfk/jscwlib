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

		var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        var gainNode = audioCtx.createGain();
		var oscillator = audioCtx.createOscillator();
        var biquadFilter = audioCtx.createBiquadFilter();
        var noiseFilter = audioCtx.createBiquadFilter();

        noiseFilter.type = "bandpass";
        noiseFilter.frequency.setValueAtTime(500, audioCtx.currentTime);
        noiseFilter.Q.setValueAtTime(5, audioCtx.currentTime);
        noiseFilter.gain.setValueAtTime(0.9, audioCtx.currentTime);

        var bufferSize = 2 * audioCtx.sampleRate;
        var noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        var noise = noiseBuffer.getChannelData(0);
        for (var i = 0; i < bufferSize; i++) {
                noise[i] = Math.random() * 2 - 1;
        }

        var whiteNoise = audioCtx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;
//        whiteNoise.start(0);
        whiteNoise.connect(noiseFilter);

        noiseFilter.connect(audioCtx.destination);

        biquadFilter.type = "lowpass";
        biquadFilter.frequency.setValueAtTime(500, audioCtx.currentTime);
        biquadFilter.gain.setValueAtTime(0.5, audioCtx.currentTime);

		oscillator.type = 'sine';
		oscillator.frequency.setValueAtTime(600, audioCtx.currentTime); // value in hertz

        oscillator.connect(gainNode);
        gainNode.connect(biquadFilter);
        biquadFilter.connect(audioCtx.destination);

        gainNode.gain.value = 0;
        oscillator.start();

       
        this.getLength = function () {
            return this.playLength;
        }

        this.setFilter = function (f) {
            biquadFilter.frequency.setValueAtTime(f, audioCtx.currentTime);
        }

        this.getRemaining = function () {
            var r = this.playEnd -  audioCtx.currentTime;
            if (r >= 0) {
                return Math.round(r*10)/10;;
            }
            else {
                return 0;
            }
        }

        this.getPlaytime = function() {
            return this.playLength();
        }

        this.setWpm = function (w) {
            w = parseInt(w);
            gainNode.gain.cancelScheduledValues(audioCtx.currentTime);
            this.wpm = w;
        }

        this.setEff = function (e) {
            gainNode.gain.cancelScheduledValues(audioCtx.currentTime);
            e = parseInt(e);
            if (e > this.wpm) {
                console.log("Cannot set eff " + e + " > wpm (" + this.wpm + ")!");
                e = this.wpm;
            }
            console.log("Setting eff = " + e);
            this.eff = e;
        }

        this.setFreq = function(f) {
            this.freq = f;
            gainNode.gain.cancelScheduledValues(audioCtx.currentTime);
            oscillator.frequency.setValueAtTime(f, audioCtx.currentTime);
            biquadFilter.frequency.setValueAtTime(f, audioCtx.currentTime);
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

        this.play = function(text) {
            var out = [];   // time instants when we switch the sound on and off
            var ele = [];   // details of timing elements
            var time = 0;
            var start = audioCtx.currentTime + 0.1;

            this.setFreq(this.freq);    // reset freq (might have been changed by |f command)

            this.calcSpeed();   // set this.dotlen, effdotlen, fwdotlen, letterspace, worspace

            text = text.toLowerCase();

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
                		    oscillator.frequency.setValueAtTime(arg[0], start + time); // value in hertz
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
                gainNode.gain.setValueAtTime(v, s);
            }

            this.playLength = out[out.length-1]['t'];
            this.playEnd = start + this.playLength;
            this.playTiming = out;

        } // play


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

    } // class jscw

