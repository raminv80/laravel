console.log('main app loaded');

$(() => {
    let app = new Greeting('Hybrid');
    app.sayHello();
});

class Greeting{
    constructor(name = 'world'){
        this.name = name
    }

    sayHello(){
        console.log(`Hello ${this.name}`);
    }
}
