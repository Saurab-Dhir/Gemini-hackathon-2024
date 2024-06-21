import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-infinite-typing',
  templateUrl: './infinite-typing.component.html',
  styleUrls: ['./infinite-typing.component.css']
})
export class InfiniteTypingComponent implements OnInit {
  words: string[] = [
    'Hello', // English
    'Hola', // Spanish
    '你好', // Mandarin Chinese (Simplified)
    'नमस्ते', // Hindi
    'سلام', // Arabic
    'Bonjour', // French
    'Olá', // Portuguese
    'Привет', // Russian
    'こんにちは', // Japanese
    'Guten Tag', // German
    '안녕하세요', // Korean
    'Merhaba', // Turkish
    'Ciao', // Italian
    'Xin chào', // Vietnamese
    'สวัสดี', // Thai
    'Hallo', // Dutch
    'Hej', // Swedish
    'Hei', // Norwegian
    'Hei', // Finnish
    'Ahoj', // Czech
    'Dobrý deň', // Slovak
    'Привіт', // Ukrainian
    'Γειά σας', // Greek
    'שלום', // Hebrew
    'Szia', // Hungarian
    'Dzień dobry', // Polish
    'Bună ziua', // Romanian
    'Selamat siang', // Indonesian
    'Halo', // Malay
    'God dag', // Danish
    'Sveiki', // Latvian
    'Sveiki', // Lithuanian
    'Tere', // Estonian
    'မင်္ဂလာပါ', // Burmese
    'Sawubona', // Zulu
    'Mhoro', // Shona
    'Habari', // Swahili
    'Manao ahoana', // Malagasy
    'Kamusta', // Filipino
    'Chào', // Vietnamese
    'Сайн байна уу', // Mongolian
    'Aloha', // Hawaiian
    'Kia ora', // Maori
    'Talofa', // Samoan
    'Bula', // Fijian
    'سلام', // Persian
    'Здраво', // Serbian
    'Pozdrav', // Croatian
    'Здраво', // Bosnian
    'Hallo', // Afrikaans
  ];
  
  currentWordIndex: number = 0;
  currentText: string = '';
  isDeleting: boolean = false;
  typingSpeed: number = 200;
  deletingSpeed: number = 150;
  pauseBetweenWords: number = 400;
  private typingInterval: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.startTyping();
    }
    console.log('InfiniteTypingComponent initialized');
  }

  ngOnDestroy(): void {
    if (this.typingInterval) {
      clearInterval(this.typingInterval);
    }
  }

  startTyping() {
    this.typingInterval = setInterval(() => {
      const currentWord = this.words[this.currentWordIndex];
      const fullWordLength = currentWord.length;

      if (this.isDeleting) {
        this.currentText = currentWord.substring(0, this.currentText.length - 1);
      } else {
        this.currentText = currentWord.substring(0, this.currentText.length + 1);
      }

      if (!this.isDeleting && this.currentText === currentWord) {
        this.isDeleting = true;
        clearInterval(this.typingInterval);
        setTimeout(() => this.startTyping(), this.pauseBetweenWords);
      } else if (this.isDeleting && this.currentText === '') {
        this.isDeleting = false;
        this.currentWordIndex = (this.currentWordIndex + 1) % this.words.length;
        clearInterval(this.typingInterval);
        this.startTyping();
      }
    }, this.isDeleting ? this.deletingSpeed : this.typingSpeed);
  }
}
