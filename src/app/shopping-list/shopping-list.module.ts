import { NgModule } from '@angular/core';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../_shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        SharedModule
    ]
})
export class ShoppingListModule {

}
