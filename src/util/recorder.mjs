export default class Recorder {
  contructor() {
    this.audioType = "audio/webm;codecs=opus";
    this.MediaRecorder = {};

    this.recordedBlobs = [];
  }

  _setup() {
    const options = { mimeType: this.audioType };
    const isSupported = MediaRecorder.isTypeSupported(options.mimeType);
    if (!isSupported) {
      const msg = `the codec: ${options.mimeType} isn't supported!!`;
      alert(msg);
      throw new Error(msg);
    }
    return options;
  }

  startRecording(stream) {
    const options = this._setup();
    this.MediaRecorder = new MediaRecorder(stream, options);

    this.mediaRecorder.onstop = (event) => {
      console.log("Recorded Blobs", this.recordedBlobs);
    };

    this.MediaRecorder.ondataavailable = (event) => {
      if (!event.data || !event.data.size) return;

      this.recordedBlobs.push(event.data);
    };

    this.MediaRecorder.start();
    console.log("Media recorded started", this.mediaRecorder);
  }

  async stopRecording() {
    if (this.mediaRecorder.state === "inactive") return;

    this.mediaRecorder.stop();
    console.log("Media recorded stop");
  }

  getRecordingURL() {
    const blob = new Blob(this.recordedBlobs, { type: this.audioType });
    return window.URL.createObjectURL(blob);
  }
}
