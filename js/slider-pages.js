const   site = document.querySelector('.site-wrap'),
        panel = document.querySelector('.panel-wrap'),
        wrap = document.querySelector('.panel'),
        zoom = document.querySelector('.zoom');

// console.log(site);

// classes
class haveClass {
    constructor() {
        this.addClass();
        this.hasClass();
        this.removeClass();
    }
    addClass(el, cls) {
        el.className += " " + cls;
    }
    hasClass(el, cls) {
        el.className.match(new RegExp('(\\s|^)'+ cls +'(\\s|$)'));
    }
    removeClass(el, cls) {
        let reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
        el.className = el.className.replace(reg,' ');
    }
}
// move
class Move {
    constructor() {
        this.moveUp();
        this.moveLeft();
        this.moveRight();
        this.moveDown();
    }
    moveUp(){
        console.log('moveUp');
    }
    moveLeft(){
        console.log('moveLeft');
    }
    moveRight(){
        console.log('moveRight');
    }
    moveDown(){
        console.log('moveDown');
    }
}

let move1 = new Move();

console.log(move1);
