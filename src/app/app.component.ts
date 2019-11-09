import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
    title = 'projetinho-legal';
    pessoas: any[] = [
        { id: 1, nome: 'pedro', salario: 5000 },
        { id: 2, nome: 'camila', salario: 7000 },
        { id: 3, nome: 'nelio', salario: 200 },
        { id: 4, nome: 'renata', salario: 3000 },
    ];
    nomesFiltrados: string[];
    pessoaBuscada: any;
    resposta: any;
    obsv: Observable<string>;

    ngOnInit() {
        this.nomesFiltrados = this.pessoas.map(pessoa => pessoa.nome);
        const observable = new Observable(subscriber => { 
            subscriber.next(100);
            subscriber.next(2);
            subscriber.next(300);
            setTimeout(() => {
                subscriber.next(4);
                subscriber.complete();
            }, 1000);
        });
        console.log('antes de executar subscribe');
        observable.subscribe({
            next(x) { console.log('recebeu o valor ' + x); },
            error(err) { console.log('erro: ' + err); },
            complete() { console.log('terminou o subscribe'); }
        });
        console.log('ultima linha');

        this.obsv = new Observable(sub => {
            setInterval(() => {
                sub.next(this.makeId(5));
            }, 1000);
        });
    }

    makeId(length: number): string {
        return 'teste' + Math.random();
    }

    buscar(valor: string ) {
        this.nomesFiltrados = [];
        this.pessoas.map(pessoa => { if (pessoa.nome.toLowerCase() === valor.toLowerCase()) { this.nomesFiltrados.push(pessoa.nome); } } );
        if (valor === '' || valor === null || valor === undefined) {
            this.nomesFiltrados = this.pessoas.map(pessoa => pessoa.nome);
        }
    }

    buscarId(id: number) {
        this.pessoaBuscada = this.pessoas.find(pessoa => pessoa.id = id);
    }

    getValorTotal() {
        return this.pessoas.reduce((soma, pessoa) => soma + pessoa.salario, 0);
    }

    raise(percentual: number) {
        this.pessoas.map(pessoa => pessoa.salario += pessoa.salario * percentual / 100);
    }

    checkSalary(value: number) {
        return this.pessoas.every(pessoa => pessoa.salario > value);
    }

    buscaCampos(criterio: string) {
        return this.pessoas.filter(pessoa => Object.keys(pessoa).some(chave => pessoa[chave].toString().includes(criterio)));
    }

    enviar(valor) {
        this.nomesFiltrados.push(valor);
    }
}
