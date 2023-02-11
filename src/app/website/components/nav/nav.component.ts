import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'

import { StoreService } from '../../../services/store.service';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user.model';
import { CategoriesService } from '../../../services/categories.service';
import { Category } from '../../../models/category.model';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activeMenu = false;
  counter = 0;
  profile: User | null = null;
  categories:Category[]=[];
  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private categoriesService: CategoriesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    });    

    this.getAllCategories();

    this.authService.user$.subscribe(data=>{
      this.profile = data;
    })
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  login() {
    this.authService.loginAndGet('john@mail.com', 'changeme')
    .subscribe(user => {
      this.router.navigate(['/profile'])

    });
  }

  getAllCategories(){
    this.categoriesService.getAll().subscribe(response=>{
      this.categories = response;
      console.log(this.categories)
    })
  }

  logout(){
    this.authService.logout();
    this.profile = null;
    this.router.navigate(['/home'])
  }

}
