import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
    title = 'projetinho-legal';
    nomes: string[] = ['joao', 'pedro', 'camila', 'andre'];
    nomesFiltrados: string[];

    ngOnInit() {
        this.nomesFiltrados = this.nomes;
    }

    buscar(valor: string ) {
        this.nomesFiltrados = this.nomes.filter(nome => nome.toLowerCase().includes(valor.toLowerCase()));
    }
}
