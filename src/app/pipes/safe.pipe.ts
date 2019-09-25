import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeResourceUrl, SafeScript, SafeStyle, SafeUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {

  constructor(protected domsanitizer: DomSanitizer) {

  }

  transform(value: string, type: string): SafeHtml | SafeResourceUrl | SafeScript | SafeStyle | SafeUrl {
    switch(type){
      case 'html':
        return this.domsanitizer.bypassSecurityTrustHtml(value);
      case 'url':
        return this.domsanitizer.sanitize(SecurityContext.URL, value);
      case 'script':
        return this.domsanitizer.sanitize(SecurityContext.SCRIPT, value);
      case 'style':
        return this.domsanitizer.sanitize(SecurityContext.STYLE, value);
      case 'resourceUrl':
        return this.domsanitizer.bypassSecurityTrustResourceUrl(value);
      default:
        throw new Error(`Invalid safe type specified: ${type}`);
    }
  }

}
