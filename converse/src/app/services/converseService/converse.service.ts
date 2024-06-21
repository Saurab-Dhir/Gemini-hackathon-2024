import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConverseService {

  constructor(private http: HttpClient) {}

  getIntroAudio(): Observable<Blob> {
    return this.http.get('YOUR_BACKEND_INTRO_AUDIO_ENDPOINT', { responseType: 'blob' });
  }

  sendAudioToBackend(blob: Blob): Observable<any> {
    const formData = new FormData();
    formData.append('audio', blob, 'recording.webm');

    return this.http.post('YOUR_BACKEND_ENDPOINT', formData);
  }
}
