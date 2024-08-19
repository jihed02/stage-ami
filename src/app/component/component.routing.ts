import { Routes } from '@angular/router';
import { NgbdpaginationBasicComponent } from './pagination/pagination.component';

import { NgbdDropdownBasicComponent } from './dropdown-collapse/dropdown-collapse.component';
import { NgbdnavBasicComponent } from './nav/nav.component';
import { AgentComponent } from './agent/agent.component';
import { NgbdButtonsComponent } from './buttons/buttons.component';
import { CardsComponent } from './card/card.component';
import { ReclamationComponent } from './reclamation/reclamation.component';
import { ClientComponent } from './client/client.component';


export const ComponentsRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'reclamations',
				component: ReclamationComponent
			},
			{
				path: 'card',
				component: CardsComponent
			},
			{
				path: 'pagination',
				component: NgbdpaginationBasicComponent
			},
			{
				path: 'agent',
				component: AgentComponent
			},
			{
				path: 'client',
				component: ClientComponent
			},
			{
				path: 'dropdown',
				component: NgbdDropdownBasicComponent
			},
			{
				path: 'nav',
				component: NgbdnavBasicComponent
			},
			{
				path: 'buttons',
				component: NgbdButtonsComponent
			}
		]
	}
];
