import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  result = '';

  addN(value: number) {
    value.toString;
    this.result += value;
  }
  float() {
    if (this.result.indexOf('.') == -1) {
      this.result += '.';
    } else if (this.result.charAt(this.result.length - 1) !== '.') {
      let s = this.result.split('.');
      if (parseInt(s[1]).toString.length !== s[1].length && s[2] === undefined) {
        this.result += '.';
      }
    }
  }
  calculate(value: string) {

    switch (value) {
      case '+':
        this.checkResult();
        if (this.result.indexOf('+') == -1) {
          this.result += '+';
        }
        break;
      case '-':
        this.checkResult();
        if (this.result.indexOf('-') == -1) {
          this.result += '-';
        }
        break;
      case '*':
        this.checkResult();
        if (this.result.indexOf('*') == -1) {
          this.result += '*';
        }
        break;
      case '/':
        this.checkResult();
        if (this.result.indexOf('/') == -1) {
          this.result += '/';
        }
        break;
    }


  }
  clearN() {
    this.result = '';
  }
  checkResult() {
    let s = this.result.charAt(this.result.length - 1);
    if (isNaN(parseFloat(s))) {
      this.result = this.result.slice(0, -1);
    }
    let num = this.result.split('*');
    let x, y, z;

    if (num[1] !== undefined) {
      x = parseFloat(num[0]);
      y = parseFloat(num[1]);
      z = x * y;
      this.result = z.toString()
    } else {
      num = this.result.split('/');
      if (num[1] !== undefined) {
        x = parseFloat(num[0]);
        y = parseFloat(num[1]);
        z = x / y;
        this.result = z.toString()
      } else {
        num = this.result.split('+');
        if (num[1] !== undefined) {
          x = parseFloat(num[0]);
          y = parseFloat(num[1]);
          z = x + y;
          this.result = z.toString()
        } else {
          num = this.result.split('-');
          if (num[1] !== undefined) {
            x = parseFloat(num[0]);
            y = parseFloat(num[1]);
            z = x - y;
            this.result = z.toString()
          }
        }

      }
    }

    // calculate() {
    // this.result = this.x + this.y;
    // }
  }
}
