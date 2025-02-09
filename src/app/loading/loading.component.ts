import { Component } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class LoadingComponent {

  constructor(public loadingService: LoadingService) {}

}
