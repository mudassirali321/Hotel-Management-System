import { Component, OnInit } from '@angular/core';
declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    role: [];
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '', role:[] },
    { path: '/Employee', title: 'Employee', icon: 'person', class: '',  role: []  },
{ path: '/ItemCategory', title: 'Item Category', icon: 'category', class: '',  role: []  },
    { path: '/Item', title: 'Item', icon: 'menu_book', class: '',  role:[]  },
    { path: '/orders', title: 'Orders', icon: 'restaurant_menu', class: '',  role:[] },
    { path: '/Kitchen', title: 'Kitchen', icon: 'kitchen', class: '',  role:[]  },
    { path: '/Accounts', title: 'Accounts(Running Orders)', icon: 'account_balance_wallet', class: '',  role:[]  },
    { path: '/all-orders', title: 'Admin(All Orders)', icon: 'account_box', class: '', role:[]  },
    { path: '/Table', title: 'Defind Table', icon: 'table_restaurant', class: '',  role:[] },
//    { path: '/Unit', title: 'Unit', icon: 'ad_units', class: '' },   
];


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
