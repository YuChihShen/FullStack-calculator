import { prepareSyntheticListenerFunctionName } from '@angular/compiler/src/render3/util';
import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  result = '';
  private nums: string[] = [];
  private num = '';
  private operators: string[] = [];
  private memorys: string[] = [];
  private saveSign = '';

  //更新顯示數字
  private renew() {
    this.result = '';
    if (this.nums.length > 0) {
      for (let i = 0; i < this.nums.length; i++) {
        if (this.operators.length > 0) {
          this.result += (this.nums[i] + this.operators[i]);
        } else {
          this.result += this.nums[i]
        }
      }
    }
    this.result += this.num;
  }
  // 數字功能
  addN(value: number) {
    if (this.num == '0') {
      this.num = '';
    }
    value.toString;
    this.num += value;
    this.renew();
  }
  //小數點功能
  dot() {
    if (this.num.indexOf('.') == -1) {
      this.num += '.';
      this.renew();
    }
  }
  // 運算子功能
  operator(value: string) {
    if (this.num === '') {
      this.num = '0';
    } else {
      this.nums[this.nums.length] = this.num;
      this.num = '';
    }
    switch (value) {
      case '+':
        this.operators[this.operators.length] = '+';
        this.renew();
        break;
      case '-':
        this.operators[this.operators.length] = '-';
        this.renew();
        break;
      case '*':
        this.operators[this.operators.length] = '*';
        this.renew();
        break;
      case '/':
        this.operators[this.operators.length] = '/';
        this.renew();
        break;
    }
    //console.log(this.nums,this.operators,this.num);
  }
  //清除所有數據
  clearN() {
    this.result = '';
    this.nums = [];
    this.num = '';
    this.operators = [];

  }
  //計算結果
  checkResult() {
    this.nums[this.nums.length] = this.num;
    this.num = '';
    if (this.nums[this.nums.length - 1] === '') {
      this.operators.pop();
    }

    for (let i = 0; i < this.operators.length; i++) {
      if (this.operators[i] == '*') {
        this.nums[i] = (parseFloat(this.nums[i]) * parseFloat(this.nums[i + 1])).toString();
        this.nums.splice(i + 1, 1)
        this.operators.splice(i, 1);
        i--;
      } else if (this.operators[i] == '/') {
        this.nums[i] = (parseFloat(this.nums[i]) / parseFloat(this.nums[i + 1])).toString();
        this.nums.splice(i + 1, 1)
        this.operators.splice(i, 1);
        i--;
      }
    }
    for (let i = 0; i < this.operators.length; i++) {
      if (this.operators[i] == '+') {
        this.nums[i] = (parseFloat(this.nums[i]) + parseFloat(this.nums[i + 1])).toString();
        this.nums.splice(i + 1, 1)
        this.operators.splice(i, 1);
        i--;
      } else if (this.operators[i] == '-') {
        this.nums[i] = (parseFloat(this.nums[i]) - parseFloat(this.nums[i + 1])).toString();
        this.nums.splice(i + 1, 1)
        this.operators.splice(i, 1);
        i--;
      }
    }
    if (this.nums[this.nums.length - 1] === '') {
      this.nums.pop();
    }
    this.renew();
  }
  //記憶功能
  memorySave() {
    this.checkResult();
    this.memorys[this.memorys.length] = this.result;
    console.log(this.memorys);
  }
  memoryPlus() {
    this.checkResult();
    let s = parseFloat(this.memorys[0]) + parseFloat(this.result);
    this.memorys[0] = s.toString();
    console.log(this.memorys);
  }
  memoryReduce() {
    this.checkResult();
    let s = parseFloat(this.memorys[0]) - parseFloat(this.result);
    this.memorys[0] = s.toString();
    console.log(this.memorys);
  }
  memoryClean() {
    this.memorys = [];
    console.log(this.memorys);
  }
  memoryCall() {
    this.clearN();
    this.num = this.memorys[0];
    this.renew();
    console.log(this.memorys);
  }
  square() {
    if (parseFloat(this.num)) {
      let s = parseFloat(this.num) ** 2;
      this.num = s.toString();
    } else if (parseFloat(this.nums[0])) {
      let s = parseFloat(this.nums[0]) ** 2;
      this.nums[0] = s.toString();
    }
    this.renew();
  }
  root() {
    if (parseFloat(this.num)) {
      let s = parseFloat(this.num) ** 0.5;
      this.num = s.toString();
    } else if (parseFloat(this.nums[0])) {
      let s = parseFloat(this.nums[0]) ** 0.5;
      this.nums[0] = s.toString();
    }
    this.renew();
  }
  log() {
    if (parseFloat(this.num)) {
      let s = Math.log10(parseFloat(this.num));
      this.num = s.toString();
    } else if (parseFloat(this.nums[0])) {
      let s = Math.log10(parseFloat(this.nums[0]));
      this.nums[0] = s.toString();
    }
    this.renew();
  }
  test() {
   
  
  }
  writefile() {
    if (!localStorage.getItem('0' + 'nums' + this.saveSign)) {
      for (let i = 0; i < this.nums.length; i++) {
        localStorage.setItem(i.toString() + 'nums', this.nums[i]);
      }
      for (let j = 0; j < this.operators.length; j++) {
        localStorage.setItem(j.toString() + 'operators', this.operators[j]);
      }
      
    } else {
      this.saveSign += '*';
      this.writefile();
    }
  }
  readfile() {
    if (!localStorage.getItem('0' + 'nums' + this.saveSign)){
      for (let i = 0; i < this.saveSign.length; i++) {
      break;
    }
    }
    

  }

}

