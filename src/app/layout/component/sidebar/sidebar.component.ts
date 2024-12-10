import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'projects/auth/service/auth.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
    menuItems: any[] = [];
    private adminMenu = [
        { label: 'Dashboard', icon: 'fa fa-home', link: 'dashboard' },
        { label: 'Candidate', icon: 'fa fa-users', link: 'candidates' },
        { label: 'HR Recruiter', icon: 'fa fa-users', link: 'reqruiters' },
        { label: 'Company', icon: 'fa fa-building', link: 'companies' },
        {
            label: 'Level Degree',
            icon: 'fa fa-graduation-cap',
            link: 'level-degree',
        },
        {
            label: 'Location',
            icon: 'fa fa-map',
            link: 'locations',
        },
        {
            label: 'Job Vacancy',
            icon: 'fa-solid fa-user-doctor',
            link: 'job-vacancy',
        },
    ];

    private basicMenu = [
        { label: 'Dashboard', icon: 'fa fa-home', link: '/dashboard' },
        { label: 'Tickets', icon: 'fa fa-ticket-alt', link: '/tickets' },
    ];

    currentUrl: string = '';
    username: string = '';

    constructor(private router: Router, private authService: AuthService) {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.currentUrl = event.urlAfterRedirects;
            }
        });
        this.setMenuBasedOnRole();
    }

    setMenuBasedOnRole() {
        const currentUser = this.authService.getLoginData();
        console.log(currentUser.role);
        if (currentUser) {
            this.menuItems =
                currentUser.role === 'ADMIN' ? this.adminMenu : this.basicMenu;
            this.username = currentUser.username;
        }
    }

    isParentActive(link: string): boolean {
        if (link === '/users') {
            return this.currentUrl.startsWith('/users');
        }
        return this.currentUrl === link;
    }

    logout() {
        this.authService.logout();
    }

    isOpen: boolean = false;
    toggleSidebar() {
        this.isOpen = !this.isOpen;
    }
}
