import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ConverseService } from '../services/converseService/converse.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css'],
})
export class WelcomePageComponent {
  features = [
    {
      title: 'Home',
      description: 'Learn the basics of AI and how it can help you learn languages more effectively.',
      icon: '/assets/atom_icon.svg'
    },
    {
      title: 'Courses',
      description: 'Explore our courses designed to help you master new languages with AI assistance.',
      icon: '/assets/brain_icon.svg'
    },
    {
      title: 'About',
      description: 'Learn more about ConverseAI and our mission to make language learning accessible.',
      icon: 'assets/about_icon.svg'
    },
    {
      title: 'Contact',
      description: 'Get in touch with us for any questions or support related to our platform.',
      icon: 'assets/contact_icon.svg'
    }
  ];

  animate = false;
  mediaRecorder: MediaRecorder | undefined;
  chunks: any[] = [];
  isBrowser: boolean;
  audioContext!: AudioContext;
  audioSource!: MediaStreamAudioSourceNode;
  silenceTimeout: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private converseService: ConverseService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this.setupMediaRecorder();
    }
  }

  setupMediaRecorder() {
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      this.mediaRecorder = new MediaRecorder(stream);

      this.mediaRecorder.ondataavailable = (event) => {
        this.chunks.push(event.data);
      };

      this.mediaRecorder.onstop = () => {
        const blob = new Blob(this.chunks, { type: 'audio/webm' });
        this.chunks = [];
        this.converseService.sendAudioToBackend(blob).subscribe(
          (response:any) => console.log('Audio sent successfully', response),
          error => console.error('Error sending audio', error)
        );
      };
    }).catch(error => {
      console.error('Error accessing media devices.', error);
    });
  }

  startRecording() {
    if (this.mediaRecorder) {
      this.mediaRecorder.start();
      this.detectSilence();
    }
  }

  stopRecording() {
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop();
    }
    clearTimeout(this.silenceTimeout);
  }

  playIntroAndStartRecording() {
    this.converseService.getIntroAudio().subscribe(
      blob => {
        const audioUrl = URL.createObjectURL(blob);
        const audio = new Audio(audioUrl);
        audio.play();
        audio.onended = () => {
          this.startRecording();
        };
      },
      error => {
        console.error('Error fetching introductory audio', error);
      }
    );
  }

  detectSilence() {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    this.audioContext = new AudioContext();
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      this.audioSource = this.audioContext.createMediaStreamSource(stream);
      const analyser = this.audioContext.createAnalyser();
      this.audioSource.connect(analyser);
      analyser.fftSize = 256;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const checkForSilence = () => {
        analyser.getByteFrequencyData(dataArray);
        const sum = dataArray.reduce((a, b) => a + b, 0);
        if (sum === 0) {
          this.silenceTimeout = setTimeout(() => {
            this.stopRecording();
          }, 2000); // Adjust timeout duration based on desired silence detection sensitivity
        } else {
          clearTimeout(this.silenceTimeout);
        }
        requestAnimationFrame(checkForSilence);
      };

      checkForSilence();
    }).catch(error => {
      console.error('Error accessing media devices for silence detection.', error);
    });
  }

  onButtonClick(featureTitle?: string) {
    if (featureTitle) {
      alert(`Button clicked: ${featureTitle}`);
    } else {
      this.animate = true;
      this.playIntroAndStartRecording();
    }
  }

  onHomeClick(event: Event) {
    event.preventDefault(); // Prevent default link behavior
    this.animate = false;
    this.stopRecording(); // Stop recording when navigating back to home
  }
}
