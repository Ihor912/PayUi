import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ModalsService } from '../../core/services/modals.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() isModalActive;
  subscription: Subscription;

  constructor(private modalsService: ModalsService) {
  }

  ngOnInit() {
  }

  closeModal() {
    this.modalsService.close();
  }
}
