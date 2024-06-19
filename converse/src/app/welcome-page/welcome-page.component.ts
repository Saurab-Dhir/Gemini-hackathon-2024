import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.css',
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

  onButtonClick(featureTitle?: string) {
    if (featureTitle) {
      alert(`Button clicked: ${featureTitle}`);
    } else {
      alert('Get Started button clicked!');
    }
  }
}