import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { fabric } from 'fabric';
import { FormsModule } from '@angular/forms';

// Definir la interfaz dentro de la clase
interface CustomFabricObject extends fabric.Object {
  erasable?: boolean;
}

@Component({
  selector: 'app-odontograma',
  templateUrl: './odontograma.component.html',
  styleUrls: ['./odontograma.component.css']
})
export class OdontogramaComponent implements AfterViewInit {

  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  private canvas!: fabric.Canvas;
  private selectedColor: string = '#000000'; // Color predeterminado negro
  public colorPalette: string[] = ['#000000','rgba(255, 0, 0, 0.75)', 'rgb(0, 142, 255, 0.75)', 'rgb(3, 175, 24, 0.75)', 'rgb(255, 87, 34, 0.75)']; 
  public brushSize: number = 10; // Valor predeterminado
  public isEraserMode: boolean = false;


  

  constructor() {
    // Inicializar canvasRef en el constructor
    this.canvasRef = {} as ElementRef<HTMLCanvasElement>;
  }

  ngAfterViewInit() {
    const canvasEl = this.canvasRef.nativeElement;
    // Establecer el tamaño del canvas
    canvasEl.width = 1300;
    canvasEl.height =800;
  
    this.canvas = new fabric.Canvas(canvasEl); 
  
    // Paso 4: Cargar automáticamente una imagen
    const imageUrl = 'assets/odontograma.jpg';
    fabric.Image.fromURL(imageUrl, (img) => {
      this.canvas.add(img); 
    });
  
    // Iniciar Ejemplo de pintura libre
    this.canvas.isDrawingMode = true;
    this.canvas.freeDrawingBrush.width = this.brushSize; 
    this.canvas.freeDrawingBrush.color = this.selectedColor;
  }
  
  selectColor(color: string) {
    this.selectedColor = color;
    this.canvas.freeDrawingBrush.color = this.selectedColor;
    this.canvas.freeDrawingBrush.width = 10; 
  }

  increaseBrushSize() {
    if (this.brushSize === 1) {
      this.brushSize = Math.min(100, this.brushSize + 4); // Sumar 4 al tamaño actual de 1, pero no superar 100
    } else {
      this.brushSize = Math.min(100, this.brushSize + 5); // Incrementar en 5, pero no superar 100
    }
    this.canvas.freeDrawingBrush.width = this.brushSize;
  }

  decreaseBrushSize() {
    this.brushSize = Math.max(1, this.brushSize - 5); // Decrementar en 5, mínimo de 1
    this.canvas.freeDrawingBrush.width = this.brushSize;
  }

  zoomIn() {
    this.zoom(1.1); 
  }

  zoomOut() {
    this.zoom(0.9); 
  }

  private zoom(factor: number) {
    const zoom = this.canvas.getZoom();
    this.canvas.setZoom(zoom * factor);
    this.canvas.renderAll();
  }

  toggleEraserMode() {
    this.isEraserMode = !this.isEraserMode;

    if (this.isEraserMode) {
      this.canvas.isDrawingMode = true; // Habilitar el modo de dibujo
      this.canvas.freeDrawingBrush = new fabric.PencilBrush(this.canvas);
      this.canvas.freeDrawingBrush.color = 'rgba(255, 255, 255, 1)'; // Configurar el color del borrador
      this.canvas.freeDrawingBrush.width = this.brushSize;
    } else {
      this.canvas.isDrawingMode = true; // Volver al modo de dibujo normal
      this.setupBrush('pencil');
      this.canvas.freeDrawingBrush.width = this.brushSize;
    }
  }

  private setupBrush(brushType: string) {
    this.canvas.isDrawingMode = false;

    switch (brushType) {
      case 'pencil':
        this.canvas.freeDrawingBrush = new fabric.PencilBrush(this.canvas);
        this.canvas.freeDrawingBrush.color = this.selectedColor;
        break;
      default:
        this.canvas.freeDrawingBrush = new fabric.PencilBrush(this.canvas);
        this.canvas.freeDrawingBrush.color = this.selectedColor;
        break;
    }

    this.canvas.isDrawingMode = true;
  }

}
