import { UnitComponent } from './../../Units/Units.component';
import { ItemCategoryComponent } from './../../ItemCategory/ItemCategory.component';
import { EmployeeComponent } from './../../Employee/Employee.component';
import { CardComponent } from '../../orders/Card/Cardcomponent';
import { OrdersComponent } from './../../orders/orders.component';
import { Routes } from '@angular/router';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { KitchenComponent } from '../../Kitchen/Kitchen.component';
import { TableComponent } from '../..//AddTable/Table.component';
import { ItemComponent } from 'app/AddItem/Item.component';
import { AccountsComponent } from '../../Accounts/Accounts.component';
import { AllOrdersComponent } from '../../All-Orders/All-Orders.component';
import { AuthGuard } from '../../AuthGuard/auth.guard';
import { PageNotFoundComponent } from '../../PageNotFound/page-not-found/page-not-found.component';
import { PatientComponent } from 'app/Patient/Patient.component';
import { Patient1Component } from 'app/patient1/patient1.component';
import { DoctorComponent } from 'app/doctor/doctor.component';
import { DiseaseComponent } from 'app/disease/disease.component';
import { CrudComponent } from 'app/Crud/crud.component';



export const AdminLayoutRoutes: Routes = [
    { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard]  },
    { path: 'Employee', component: EmployeeComponent, canActivate: [AuthGuard] },
    { path: 'Doctor', component: EmployeeComponent, canActivate: [AuthGuard] },
    { path: 'disease', component: DiseaseComponent, canActivate: [AuthGuard] },
   { path: 'Patient', component: PatientComponent, canActivate: [AuthGuard] },
   { path: 'Patient1', component: Patient1Component, canActivate: [AuthGuard] },
   { path: 'doctor', component: DoctorComponent, canActivate: [AuthGuard] },
    { path: 'Item', component: ItemComponent, canActivate: [AuthGuard] },
    { path: 'ItemCategory', component: ItemCategoryComponent, canActivate: [AuthGuard] },
    { path: 'cart', component: CardComponent, canActivate: [AuthGuard] },
    { path: 'Table', component: TableComponent, canActivate: [AuthGuard] },
    { path: 'Kitchen', component: KitchenComponent, canActivate: [AuthGuard] },

    { path: 'Crud', component: CrudComponent,  },
    { path: 'Accounts', component: AccountsComponent, canActivate: [AuthGuard] },
    { path: 'all-orders', component: AllOrdersComponent, canActivate: [AuthGuard] },
   // { path: 'Accounts', component: AccountsComponent },
    {
      path: 'Unit', component: UnitComponent
    },
    {
        path: 'dashboard', canActivate:[AuthGuard], component: DashboardComponent
    },

    
   
    
    
   
];



