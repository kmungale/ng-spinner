import { Directive, ElementRef, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Directive({
  selector: '[ngSpinner]'
})
export class SpinnerDirective  implements OnInit {
  @Input() spText = 'loading';
  @Input() spSize = 'sp-default';
  @Input() spSpeed = 'default';
  @Input() showOnBody = false;
  @Output() spinnerOnInit =  new EventEmitter();

  private referenceElement;
  private el; rootEl;
  private $spinnerContainer;
  private $spinnerText;
  private $spinnerGif;
  private emitControls = {
    show: this.show.bind(this),
    remove: this.remove.bind(this),
    referenceElement: this.referenceElement
  };
  private _spinnerElInternalRef;

  constructor(el: ElementRef) {
    this.el =  el;
    this.rootEl =  this.el.nativeElement.ownerDocument;
  }

  createSpinnerTemplate() {
    this.$spinnerContainer = document.createElement('div');
    this.$spinnerContainer.classList.add('spinner-container');
    this.$spinnerContainer.classList.add('spinner-blank');
    this.$spinnerGif = document.createElement('div');
    this.$spinnerGif.classList.add('spinner-style', this.spSize);
    this.$spinnerGif.classList.add('spinner-speed', this.spSpeed);
    this.$spinnerText = document.createElement('div');
    this.$spinnerText.classList.add('spinner-text');
    this.$spinnerContainer.appendChild(this.$spinnerGif);
    this.$spinnerContainer.appendChild(this.$spinnerText);
  }

  show() {
    let $el;
    $el =  this._spinnerElInternalRef.lastElementChild;
    $el.classList.remove('spinner-blank');
    if (this.showOnBody) {
      // hide scroll for user when spinner rendered on entire screen
      this.rootEl.body.classList.add('spinner-block-scroll');
    }
  }

  remove() {
    let $el;
    $el =  this._spinnerElInternalRef.lastElementChild;
    $el.classList.add('spinner-blank');
    if (this.showOnBody) {
      // show scroll for user when spinner rendered on entire screen
      this.rootEl.body.classList.remove('spinner-block-scroll');
    }
  }

  ngOnInit(): any {
    this.createSpinnerTemplate();
    this.$spinnerText.innerText = this.spText;
    if (this.showOnBody) {
      this.$spinnerContainer.classList.add('spinner-block-scroll');
      this.rootEl.body.children[0].append(this.$spinnerContainer);
      this._spinnerElInternalRef = this.rootEl.body.children[0];
    } else {
      if (this.el.nativeElement.children.length) {
        this._spinnerElInternalRef = this.el.nativeElement.children[0];
        this.el.nativeElement.children[0].append(this.$spinnerContainer);
      } else {
        this._spinnerElInternalRef = this.el.nativeElement;
         this.el.nativeElement.append(this.$spinnerContainer);
      }
    }
    this.spinnerOnInit.emit(this.emitControls);
  }
}
