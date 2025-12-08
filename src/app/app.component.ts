import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { sign } from 'node:crypto';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'App Angular';

    x = 5;
    y = 15;

    students = [
        {id: 1, nome: 'Marco', voto: 3},
        {id: 2, nome: 'Valeria', voto: 8},
        {id: 3, nome: 'Luca', voto: 4},
        {id: 4, nome: 'Luca', voto: 5},
        {id: 5, nome: 'Giulia', voto: 6},
        {id: 6, nome: 'Giulia', voto: 3}
    ]

    // Proprietà signal
    counter = signal(0);

    increaseCounter() {
        this.counter.update(v => v+1);  // UPDATE: per modificare il valore della signal sulla base del valore precedente
    }
    decreaseCounter() {
        this.counter.update(v => v-1);
    }
    resetCounter() {
        this.counter.set(0);
    }
    setCounter(v: number) {
        this.counter.set(v);
    }

    professors = signal([
        {id: 1, nome: 'Prof. Bianchi', materia: 'Matematica'},
        {id: 2, nome: 'Prof.ssa Rossi', materia: 'Italiano'},
        {id: 3, nome: 'Prof. Verdi', materia: 'Inglese'}
    ])

    addProf() {
        const idProf = this.professors().length + 1;
        const newProf = {
            id: idProf,
            nome: 'Nuovo Prof ' + idProf,
            materia: 'Nuova Materia ' + idProf
        };
        this.professors.update(profs => [...profs, newProf]);
    }

    updateProf() {
        this.professors.update(p => p.map(prof => {  // UPDATE ammette una funzione che riceve il valore corrente
            if (prof.id % 2 === 0) {
                return {
                    ...prof,
                    nome: prof.nome + ' (Aggiornato)'
                }
            }
            else {
                return prof;
            }
        }))
    }

    randomOrder() {
        this.professors.update(p => p.sort(() => Math.random() - 0.5))
    }

    // --------------------------------------------------------------------
    text = signal('')  // campo vuoto che assumerà il valore dell'input e importiamo FormsModule

    text2 = signal('')

    setText2(e: Event) {
        if(e.target instanceof HTMLInputElement) {
            this.text2.set(e.target.value)
        }
    }
}
