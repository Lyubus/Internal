import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Ingredient } from 'src/app/_shared/ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  editMode = false;
  id: number;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe.ingredients) {
        recipe.ingredients.forEach((ingredient: Ingredient) => {
          recipeIngredients.push(new FormGroup({
            name: new FormControl(ingredient.name, Validators.required),
            amount: new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
          }));
        });
      }
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients
    });
  }

  getControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  ondeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get(['ingredients'])).removeAt(index);
  }

  onSubmit() {
    // const newREcipe = new Recipe(this.recipeForm.value['name'], this.recipeForm['description'],
    //   this.recipeForm['imagePath'], this.recipeForm['ingredients']);
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addREcipe(this.recipeForm.value);
    }
    this.onCancel();
  }
}
