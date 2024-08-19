import { Component } from '@angular/core';
import { SidebarClientComponent } from '../sidebarClient/sidebarClient.component';
import { DataService } from 'src/app/services/data.service';
import { BlogCardComponent } from '../blog-cards/blog-card.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Reclamation } from 'src/app/component/reclamation/reclamation';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone:true,
  imports: [SidebarClientComponent,BlogCardComponent,FormsModule,MatFormFieldModule,MatInputModule,MatSelectModule]

})
export class HomeComponent {
  reclamations:Reclamation[]=[];
  reclamation:Reclamation={
    status: false,
    categorie: '',
    detail: '',
    client: {
      nom: '',
      prenom: '',
      adresse: '',
      cin: 0,
      age: 0,
      telephone: '',
      email: '',
      password: '',
      status: '',
      reclamations: []
    },
    date: '',
    id: 0
  }

  constructor(private data:DataService,private snackBar: MatSnackBar) {}

  ngOnInit(): void {

  }

  onSubmit() {
  this.data.addReclam(this.reclamation).subscribe({
    next:(res)=>{
      this.reclamations.push(this.reclamation);
      this.showSuccessMessage();
    },
    error:(err)=>{
      console.log(err);
    }
  })
}
 
  logout(): void {
   this.data.logout()
  }
  showSuccessMessage(): void {
    this.snackBar.open('Reclamation added successfully!', 'Close', {
      duration: 3000,  // Duration in milliseconds
      horizontalPosition: 'center',  // Positioning
      verticalPosition: 'top',  // Positioning
      panelClass: ['success-snackbar'],  // Custom class for styling
    });
  }
}
