const ChildProcess = require('child_process');
const { Duplex } = require('stream');

let FFMPEG_INFO = {
  command: null,
  output: null,
};

const VERSION_REGEX = /version (.+) Copyright/mi;

Object.defineProperty(FFMPEG_INFO, 'version', {
  get() {
    return VERSION_REGEX.exec(FFMPEG_INFO.output)[1];
  },
  enumerable: true,
});

class FFmpeg extends Duplex {
  constructor(options = {}) {
    super();
    this.process = FFmpeg.create({ shell: false, ...options });
    const EVENTS = {
      readable: this._reader,
      data: this._reader,
      end: this._reader,
      unpipe: this._reader,
      finish: this._writer,
      drain: this._writer,
    };

    this._readableState = this._reader._readableState;
    this._writableState = this._writer._writableState;

    this._copy(['write', 'end'], this._writer);
    this._copy(['read', 'setEncoding', 'pipe', 'unpipe'], this._reader);

    for (const method of ['on', 'once', 'removeListener', 'removeListeners', 'listeners']) {
      this[method] = (ev, fn) => EVENTS[ev] ? EVENTS[ev][method](ev, fn) : Duplex.prototype[method].call(this, ev, fn);
    }

    const processError = error => this.emit('error', error);
    this._reader.on('error', processError);
    this._writer.on('error', processError);
  }

  get _reader() { return this.process.stdout; }
  get _writer() { return this.process.stdin; }

  _copy(methods, target) {
    for (const method of methods) {
      this[method] = target[method].bind(target);
    }
  }

  _destroy(err, cb) {
    this._cleanup();
    return cb ? cb(err) : undefined;
  }

  _final(cb) {
    this._cleanup();
    cb();
  }

  _cleanup() {
    if (this.process) {
      this.once('error', () => {});
      this.process.kill('SIGKILL');
      this.process = null;
    }
  }

  static getInfo(force = false) {
    if (FFMPEG_INFO.command && !force) return FFMPEG_INFO;
    const sources = [() => {
      const ffmpegStatic = require('ffmpeg-static');
      return ffmpegStatic.path || ffmpegStatic;
    }, 'ffmpeg', 'avconv', './ffmpeg', './avconv'];
    for (let source of sources) {
      try {
        if (typeof source === 'function') source = source();
        const result = ChildProcess.spawnSync(source, ['-h'], { windowsHide: true });
        if (result.error) throw result.error;
        Object.assign(FFMPEG_INFO, {
          command: source,
          output: Buffer.concat(result.output.filter(Boolean)).toString(),
        });
        return FFMPEG_INFO;
      } catch (error) {
        // Do nothing
      }
    }
    throw new Error('FFmpeg/avconv not found!');
  }

  static create({ args = [], shell = false } = {}) {
    if (!args.includes('-i')) args.unshift('-i', '-');
    return ChildProcess.spawn(FFmpeg.getInfo().command, args.concat(['pipe:1']), { windowsHide: true, shell });
  }
}

module.exports = FFmpeg;
