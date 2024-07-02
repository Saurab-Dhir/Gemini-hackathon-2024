import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css']
})
export class IconsComponent {
  @Input() icon!: string;
}
