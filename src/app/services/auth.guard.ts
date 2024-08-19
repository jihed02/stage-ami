import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { DataService } from './data.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router=inject(Router);
  const data=inject(DataService);
  
  if(!data.isAuthenticated()){
   router.navigateByUrl('/log');
  return false ;}
 
  if (data.isAdmin()) {
    return true;
  }
  else {
    router.navigateByUrl('/home');
    return false;
  }

};
