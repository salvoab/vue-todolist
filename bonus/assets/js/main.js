/*
Creare una todo list usando VueJS.

Funzionalitá:
La nostra todo list avrá alcune tasks di default predefinite
L'utente puó inserire nuove tasks
Cliccando sulla "X" l'utente puó cancellare una task
Se non ci sono piu task nella lista, mostrate un messaggio tipo "Nulla da fare"
Quando l'utente inserisce una task ha due modi per salvarla: o preme il pulsante add o preme il taso Enter della tastiera.
Attenzione: l'utente non deve inserire tasks vuote ma almeno un tot di caratteri.
BONUS:
1 - Task della todo-list modificabile al click
2 - Task della todo-list spostabili in Task completate
3 - Task spostabili todo-list e task completate cancellate spostandole su cestino
4 - Task in cestino cancellabili definitivamente singolarmente
5 - Cestino svuotabile
6 - Task ripristinabili dal cestino verso le rispettive liste di partenza (todo oppure done)
*/

let app = new Vue({
    el: '#root',
    data:{
        tasks: ['Ripassare HTML', 'Ripassare CSS', 'Approfondire JS'],
        tasksDone: [],
        recycleBin: [],
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
        },
        moveToDone(position){
            let task = this.tasks[position];
            this.deleteTask(position);
            this.tasksDone.push(task);
        },
        moveToBin(position, fromList){
            let task = '';
            if(fromList === 'todo'){
                task = this.tasks[position];
                this.deleteTask(position);
            } else if (fromList === 'done'){
                task = this.tasksDone[position];
                this.tasksDone.splice(position, 1);
            }
            
            const binItem = {task, fromList};
            this.recycleBin.push(binItem);
        },
        deletePermanently(position){
            this.recycleBin.splice(position, 1);
        },
        emptyBin(){
            this.recycleBin.splice(0, this.recycleBin.length);
        },
        restoreTask(taskObject, position){
            this.recycleBin.splice(position, 1);
            if(taskObject.fromList === 'todo'){
                this.tasks.push(taskObject.task);
                this.noTasks = false;
            } else {
                this.tasksDone.push(taskObject.task);
            }
        }
    }
});