import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  result = '';
  nums:string[]= [];
  num = '';
  operators:string[]= [];

  //更新顯示數字
  renew(){
    this.result='';
    if(this.nums.length>0){
    for(let i=0;i<this.nums.length;i++){
      this.result+=(this.nums[i]+this.operators[i]);
    }
  }
    this.result+=this.num;
  }
  // 數字功能
  addN(value: number) {
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
  operator(value: string){
    this.nums[this.nums.length] = this.num ;
    this.num = '';
    
    switch (value) {
      case '+':
        this.operators[this.operators.length]='+';
        this.renew();
        break;
      case '-':
        this.operators[this.operators.length]='-';
        this.renew();
        break;
      case '*':
        this.operators[this.operators.length]='*';
        this.renew();
        break;
      case '/':
        this.operators[this.operators.length]='/';
        this.renew();
        break;
    }
  }
  //清除所有數據
  clearN() {
   this.result = '';
   this.nums= [];
   this.num = '';
   this.operators= [];
  }
  //計算結果
  checkResult(){
    this.nums[this.nums.length] = this.num ;
    this.num = '';
    for(let i=0;i<this.operators.length;i++){
      if(this.operators[i]=='*'){
        this.nums[i]= (parseFloat(this.nums[i])*parseFloat(this.nums[i+1])).toString(); 
        this.nums.splice(i+1,1)
        console.log(this.nums);
        
             
      }else if(this.operators[i]=='/'){
        this.nums[i]= (parseFloat(this.nums[i])*parseFloat(this.nums[i+1])).toString();
        
        
      }
    }
  }
 

}
