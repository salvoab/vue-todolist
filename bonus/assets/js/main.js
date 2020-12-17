/*
Creare una todo list usando VueJS.

Funzionalitá:
La nostra todo list avrá alcune tasks di default predefinite
L'utente puó inserire nuove tasks
Cliccando sulla "X" l'utente puó cancellare una task
Se non ci sono piu task nella lista, mostrate un messaggio tipo "Nulla da fare"
Quando l'utente inserisce una task ha due modi per salvarla: o preme il pulsante add o preme il taso Enter della tastiera.
Attenzione: l'utente non deve inserire tasks vuote ma almeno un tot di caratteri.
BONUS: Task modificabile al click
*/

let app = new Vue({
    el: '#root',
    data:{
        tasks: ['Ripassare HTML', 'Ripassare CSS', 'Approfondire JS'],
        newTask: '',
        noTasks: false
    },
    methods: {
        addTask(){
            // Controllo su newTask e se rispetta i criteri allora lo aggiungo all'array di tasks
            if(this.newTask.length > 4){
                this.tasks.push(this.newTask);
                this.noTasks = false;
                this.newTask = '';
            }
        },
        deleteTask(position){
            // Ricevo una posizione e elimino dall'array tasks il task corrispondente
            this.tasks.splice(position, 1);
            if(this.tasks.length === 0){
                this.noTasks = true;
            }
        },
        modifyTask(task, position){
            this.deleteTask(position);
            this.newTask = task;
        }
    }
});