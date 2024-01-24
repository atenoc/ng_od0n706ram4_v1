import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-odontograma',
  templateUrl: './odontograma.component.html',
  styleUrls: ['./odontograma.component.css']
})
export class OdontogramaComponent implements OnInit {
  dientes: string[] = Array(32).fill(''); // Representa los 32 dientes

  constructor() { }

  ngOnInit(): void {
    // Puedes inicializar datos, si es necesario
  }

  marcarDiente(index: number): void {
    // Lógica para marcar/desmarcar el diente, por ejemplo, cambiar el color, etc.
    // Puedes agregar más lógica según tus necesidades.
  }
}
