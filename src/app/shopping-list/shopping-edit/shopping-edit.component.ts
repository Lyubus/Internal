import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/_shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') shoppingListForm: NgForm;
  subcription: Subscription;
  editMode = false;
  editedItemIndex: number;
  edittedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.subcription = this.shoppingListService.startedEditing.subscribe((index: number) => {
      this.editMode = true;
      this.editedItemIndex = index;
      this.edittedItem = this.shoppingListService.getIngredient(index);
      this.shoppingListForm.setValue({
        name: this.edittedItem.name,
        amount: this.edittedItem.amount
      });
    });
  }

  onAddItem(form: NgForm) {
    const newIngredient = new Ingredient(form.value.name, form.value.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.clear();
  }

  clear() {
    this.editMode = false;
    this.shoppingListForm.reset();
  }

  delete() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.clear();
  }

  ngOnDestroy() {
    this.subcription.unsubscribe();
  }
}
