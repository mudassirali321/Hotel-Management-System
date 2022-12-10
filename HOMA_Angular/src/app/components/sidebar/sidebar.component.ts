import { Component, OnInit } from "@angular/core";
import { AppAuthService } from "app/login/app-auth.service";
import { AppService } from "app/shared/services/app.service";
declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  role: any;
}
export const ROUTES_Admin: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: "dashboard",
    class: "",
    role: [],
  },
  { path: "/Employee", title: "Employee", icon: "person", class: "", role: [] },
  {
    path: "/ItemCategory",
    title: "Item Category",
    icon: "category",
    class: "",
    role: [],
  },
  { path: "/Item", title: "Item", icon: "menu_book", class: "", role: [] },
  {
    path: "/orders",
    title: "Orders",
    icon: "restaurant_menu",
    class: "",
    role: [],
  },
  { path: "/Kitchen", title: "Kitchen", icon: "kitchen", class: "", role: [] },
  {
    path: "/Accounts",
    title: "Accounts(Running Orders)",
    icon: "account_balance_wallet",
    class: "",
    role: [],
  },
  {
    path: "/all-orders",
    title: "Admin(All Orders)",
    icon: "account_box",
    class: "",
    role: [],
  },
  {
    path: "/Table",
    title: "Defind Table",
    icon: "table_restaurant",
    class: "",
    role: [],
  },
  //    { path: '/Unit', title: 'Unit', icon: 'ad_units', class: '' },
];

export const ROUTES_Account: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: "dashboard",
    class: "",
    role: [],
  },
  { path: "/Employee", title: "Employee", icon: "person", class: "", role: [] },
  {
    path: "/ItemCategory",
    title: "Item Category",
    icon: "category",
    class: "",
    role: [],
  },
  { path: "/Item", title: "Item", icon: "menu_book", class: "", role: [] },
  {
    path: "/orders",
    title: "Orders",
    icon: "restaurant_menu",
    class: "",
    role: [],
  },
  { path: "/Kitchen", title: "Kitchen", icon: "kitchen", class: "", role: [] },
  {
    path: "/Accounts",
    title: "Accounts(Running Orders)",
    icon: "account_balance_wallet",
    class: "",
    role: [],
  },
  {
    path: "/all-orders",
    title: "Admin(All Orders)",
    icon: "account_box",
    class: "",
    role: [],
  },
  {
    path: "/Table",
    title: "Defind Table",
    icon: "table_restaurant",
    class: "",
    role: [],
  },
  ,
];
export const ROUTES_Waiter: RouteInfo[] = [
  {
    path: "/orders",
    title: "Orders",
    icon: "restaurant_menu",
    class: "",
    role: [],
  },
  { path: "/Kitchen", title: "Kitchen", icon: "kitchen", class: "", role: [] },
];

export const ROUTES_Chef: RouteInfo[] = [
  {
    path: "/orders",
    title: "Orders",
    icon: "restaurant_menu",
    class: "",
    role: [],
  },
  { path: "/Kitchen", title: "Kitchen", icon: "kitchen", class: "", role: [] },
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  public userInfo: any;

  constructor(private _appService: AppService) {}

  ngOnInit() {
    this.userInfo = this._appService.currentUser;
    //this._appService.role = this.userInfo.employeeType;
    var role = this.userInfo.employeeType;

    //this.menuItems = ROUTES.filter(menuItem => menuItem.role.find(x=>x=='Cheif'));
    if (role == "Chef") {
      this.menuItems = ROUTES_Chef.filter((menuItem) => menuItem);
    }
    if (role == "Admin") {
      this.menuItems = ROUTES_Admin.filter((menuItem) => menuItem);
    }
    if (role == "Account") {
      this.menuItems = ROUTES_Account.filter((menuItem) => menuItem);
    }
    if (role == "Waiter") {
      this.menuItems = ROUTES_Waiter.filter((menuItem) => menuItem);
    } else {
      this.menuItems = ROUTES_Admin.filter((menuItem) => menuItem);
    }
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }
}
