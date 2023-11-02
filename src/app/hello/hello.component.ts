import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.scss']
})
export class HelloComponent {
  title = 'hello';

}
