export class Person {
  constructor(name) {
    this.name = name
    this.living = 1
    this.married = 0
    this.age = 0
  }

  marry(age) {
    this.age = age
    this.married = 1
  }

  die(age) {
    this.age = age
    this.living = 0
  }
}