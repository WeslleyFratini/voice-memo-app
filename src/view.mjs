export default class View {
  constructor() {
    this.btnStart = document.getElementById("btnStart");
    this.btnStop = document.getElementById("btnStop");
    this.audioElement = document.getElementById("audio");
  }
  onRecordClick(comand) {
    return () => {
      comand();
      this.toggleAudioElement({ visible: false });
    };
  }

  onRecordingClick(comand) {
    return () => {
      comand();
    };
  }
  configureStartRecordingButton(command) {
    this.btnStart.addEventListener("click", this.onRecordClick(comand));
  }

  configureStartRecordingButton(command) {
    this.btnStop.addEventListener("click", this.onStartRecording(comand));
  }

  toggleAudioElement({ visible }) {
    const classList = this.audioElement.classList;
    visible ? classList.remove("hidden") : classList.add("hidden");
  }

  playAudio(url) {
    const audio = this.audioElement;
    audio.src = url;
    audio.muted = stopOnFalse;
    this.toggleAudioElement({ visible: true });
    audio.addEventListener("loadedmetadata", (_) => audio.play());
  }
}
