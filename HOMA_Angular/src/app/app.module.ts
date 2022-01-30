
import { NotificationService } from './Services/notification.service';
import { OrderService } from './orders/order.service';
import { CardComponent } from './orders/Card/Cardcomponent';
import { NotificationsComponent } from './notifications/notifications.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';

import { AppService } from './shared/services/app.service';
import {
    AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MessageDialogComponent } from './shared/message-dialog/message-dialog.component';
import { MatTableModule } from '@angular/material/table';
import { DemoMaterialModule } from './material-module';

import { OrdersComponent } from './orders/orders.component';
import { OrdersDialogComponent } from './orders/Orders_Dialog/Orders_Dialog.component';
import { KitchenComponent } from './Kitchen/Kitchen.component';
import { TableComponent } from './AddTable/Table.component';
import { TableDialogComponent } from './AddTable/Table-dialog/Table-dialog.component';
import { KitchenDialogComponent } from './Kitchen/Kitchen-dialog/Kitchen-dialog.component';
import { EmployeeComponent } from './Employee/Employee.component';
import { EmployeeDialogComponent } from './Employee/Employee-dialog/Employee-dialog.component';
import { ItemComponent } from './AddItem/Item.component';
import { ItemDialogComponent } from './AddItem/Item-dialog/Item-dialog.component';
import { ItemCategoryComponent } from './ItemCategory/ItemCategory.component';
import { ItemCategoryDialogComponent } from './ItemCategory/ItemCategory-dialog/ItemCategory-dialog.component';
import { UnitComponent } from './Units/Units.component';
import { UnitDialogComponent } from './Units/Units-dialog/Units-dialog.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountsDialogComponent } from './Accounts/Accounts-dialog/Accounts-dialog.component';
import { AccountsComponent } from './Accounts/Accounts.component';
import { AllOrdersComponent } from './All-Orders/All-Orders.component';
import { AllOrdersDialogComponent } from './All-Orders/All-Orders-dialog/All-Orders-dialog.component';
import { LoginComponent } from './login/login.component';
import { AppAuthService } from './login/app-auth.service';
import { TokenAuthServiceProxy } from './shared/services/service-proxies';

import { AuthInterceptor } from './AuthGuard/auth.interceptor';
import { AuthGuard } from './AuthGuard/auth.guard';
import { PageNotFoundComponent } from './PageNotFound/page-not-found/page-not-found.component';
@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ComponentsModule,
        RouterModule,
        AppRoutingModule,
        MatDialogModule,
        MatCardModule,
        MatTableModule,
        DemoMaterialModule,
        /*AgmCoreModule.forRoot({
          apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
        })
        */
    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        MessageDialogComponent,
        DashboardComponent,
        OrdersComponent,
        OrdersDialogComponent,
        CardComponent,
        AllOrdersComponent,
        AllOrdersDialogComponent,
        AccountsComponent,
        AccountsDialogComponent,
        KitchenComponent,
        KitchenDialogComponent,
        TableComponent,
        TableDialogComponent,
        EmployeeComponent,
        EmployeeDialogComponent,
        ItemComponent,
        ItemDialogComponent,
        ItemCategoryComponent,
        ItemCategoryDialogComponent,
        UnitComponent,
        UnitDialogComponent,
        LoginComponent,
        PageNotFoundComponent

    ],
    entryComponents: [MessageDialogComponent],
    providers: [OrderService, AppService, AppAuthService, TokenAuthServiceProxy, { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } }, NotificationService
        , AuthGuard
        //{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
        ],
    bootstrap: [AppComponent]
})
export class AppModule { }
