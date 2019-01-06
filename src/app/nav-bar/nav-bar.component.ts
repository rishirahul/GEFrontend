import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  public isCollapsed = true;
  public isMainPage = true;
  private activeSiteSection: string;
  constructor( private router: Router) {
        router.events.subscribe((event) => {
            if (event instanceof NavigationEnd ) {
                this.SiteURLActiveCheck(event);
            }
        });
  }

  private SiteURLActiveCheck(event: NavigationEnd): void {
    console.log(event.url);
    console.log(this.isMainPage);
    if (event.url.indexOf('main') !== -1) {
      this.isMainPage = true;
    } else {
      this.isMainPage = false;
    }
    if (event.url.indexOf('#hero') !== -1) {
        this.activeSiteSection = 'hero';
    } else if (event.url.indexOf('#buyer') !== -1) {
        this.activeSiteSection = 'buyer';
    } else if (event.url.indexOf('#seller') !== -1) {
        this.activeSiteSection = 'seller';
    } else if (event.url.indexOf('#contact') !== -1) {
        this.activeSiteSection = 'contact';
    } else {
        this.activeSiteSection = '';
    }
}

  ngOnInit() {
  }

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  scrollToElement($element): void {
    console.log($element);
    $element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
  }

  isSectionActive(section: string): boolean {
    return section === this.activeSiteSection;
}
}
