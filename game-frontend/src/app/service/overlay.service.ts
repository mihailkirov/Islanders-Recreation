import {Injectable} from '@angular/core';
import {ComponentType, Overlay, OverlayConfig, OverlayRef} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';

/**
 * This service permits to put an Angular component onto
 * another component (overlay).
 * For example, this may be useful to show a score component onto
 * the map.
 */
@Injectable({
  providedIn: 'root'
})
export class OverlayService {
  private overlayRef?: OverlayRef;

  constructor(private overlay: Overlay) {
  }

  open(type: ComponentType<any>, closeOnClik: boolean): void {
    this.overlayRef = this.overlay.create(this.getOverlayConfig());
    const filePreviewPortal = new ComponentPortal(type);
    if (closeOnClik) {
      this.overlayRef.backdropClick().subscribe(_ => {
        this.overlayRef.dispose();
        this.overlayRef = undefined;
      });
    }
    this.overlayRef.attach(filePreviewPortal);
  }

  dispose(): void {
    this.overlayRef?.dispose();
  }

  private getOverlayConfig(): OverlayConfig {
    const positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();

    return new OverlayConfig({
      hasBackdrop: true,
      backdropClass: 'overlay-backdrop',
      panelClass: 'overlay-panel',
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy
    });
  }
}
