import { prepareSyntheticListenerFunctionName } from '@angular/compiler/src/render3/util';
import { Component, ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {

  result = '';
  load1='null';load2='null';load3='null';load4='null';load5='null';
  private nums: string[] = [];
  private num = '';
  private operators: string[] = [];
  private memorys: string[] = [];


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
    let n = this.nums.length;
    if (this.nums[this.nums.length - 1] === '') {
      this.operators.pop();
    }
    this.writefile();
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
    localStorage.setItem(n.toString()+ 'nums' + localStorage.getItem('saveSign'), this.nums[0]);
    localStorage.setItem((n-1).toString()+ 'operators' + localStorage.getItem('saveSign'), "=");
    this.renew();
    this.readfile();
    console.log("nums:"+this.nums, "op:"+this.operators, "%:"+this.num);
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
    localStorage.clear();
    this.load1=this.load2=this.load3=this.load4=this.load5='null'
  }
  writefile() {
    let saveSign = localStorage.getItem('saveSign');
    let nlen = this.nums.length;
    let olen = this.operators.length;
    if(saveSign===null||saveSign.length>=5){
      localStorage.setItem('saveSign', '*');
    }else{
      localStorage.setItem('saveSign',saveSign+'*');
    }
    saveSign = localStorage.getItem('saveSign');
    for (let i = 0; i < this.nums.length; i++) {
      localStorage.setItem(i.toString() + 'nums' + saveSign, this.nums[i]);
    }
    while(localStorage.getItem(nlen.toString()+'nums' + saveSign)){
      //console.log("dnum:"+localStorage.getItem(nlen.toString()+'nums' + saveSign));
      localStorage.removeItem((nlen).toString()+'nums' + saveSign);
      nlen++;
    }
    for (let j = 0; j < this.operators.length; j++) {
      localStorage.setItem(j.toString() + 'operators' + saveSign, this.operators[j]);
    }
    while(localStorage.getItem(olen.toString()+'operators' + saveSign)){
      localStorage.removeItem((olen).toString()+'operators' + saveSign);
      olen++;
    }
    console.log(localStorage.valueOf());
  }
  readfile() {
    let saveSign = localStorage.getItem('saveSign');
    let formula ='';
    let s =0;
    if (saveSign) {
      for (let i = saveSign.length; i > 0; i--) {
        while(localStorage.getItem(s.toString()+'nums'+ saveSign)){
          formula +=localStorage.getItem(s.toString()+'nums'+ saveSign);
          if(localStorage.getItem(s.toString()+'operators'+ saveSign)){
            formula +=localStorage.getItem(s.toString()+'operators'+ saveSign);
          }else{
            break;
          }
          s++; 
        }
        console.log(saveSign);
        switch(saveSign.length){
          case 1:this.load1 = formula; break;
          case 2:this.load2 = formula;break;
          case 3:this.load3 = formula;break;
          case 4:this.load4 = formula;break;
          case 5:this.load5 = formula;break;
        }
        formula ='';
        s=0;
      }
    }
  }
  loadfile(filename: string){
    let s = '';
    this.clearN();
    switch(filename){
      case "file1": s += localStorage.getItem("1"+"nums*"); break;
      case "file2":break;
      case "file3":break;
      case "file4":break;
      case "file5":break;
    }
    this.renew();
  }
}

