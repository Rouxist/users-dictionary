class Scrambles {
    scr3x3x3 = 'hihi?';
    constructor(scr3x3x3) {
      this.scr3x3x3 = scr3x3x3;

    }
  }


// class Scrambles{
//     _turns: Array<string> = ['R', 'L', 'F', 'B', 'U', 'D'];
//     _suffix: Array<string> = [' ', "' ", '2 '];
//     _megaSuffix: Array<string> = ['++ ', '-- '];
//     _view: Array<string> = ['x', 'y', 'z'];
//     // for Pyraminx, Skewb
//     _pTurns: Array<string> = ['R', 'L', 'B', 'U'];
//     _vertex: Array<string> = ['l', 'r', 'b', 'u'];

//     // min <= z < max
//     // _getRandomInt(min:number, max:number) {
//     // //   let random = Math.random();
//     //   return (Math.floor(Math.random()*(max - min)) + min); //max-min 길이 잘못되면 undefined 나옴
//     // }
//     //0부터 max - min 미만 사이의 난수에 min을 더한 수를 반환.

//     private _up: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
//     private _down: number[] = [9, 10, 11, 12, 13, 14, 15, 16];

//     // min <= z < max
//     private _getRandomInt(min: number, max: number): number {
//         min = Math.ceil(min);
//         max = Math.floor(max);
//         return Math.floor(Math.random() * (max - min)) + min;
//     }

//     private _generateAvailableTurns(): number[][] {
//         let availArr: number[] = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6];
//         let resUpArr: number[] = [0];
//         let resDownArr: number[] = [0];
//         let usum: number = 0, sumtemp: number = 0;

//         for (let i: number = 0; i < availArr.length; i++) {
//         usum = 0;
//         if (availArr[i] < 0) {
//             for (let j: number = 0; j < this._up.length; j++) {
//             usum += (this._up[j] % 2) + 1;
//             if (usum === -1 * availArr[i]) {
//                 sumtemp = 0;
//                 for (let k: number = j + 1;; k++) {
//                 sumtemp += (this._up[k % this._up.length] % 2) + 1;
//                 if (sumtemp === 6) {
//                     resUpArr.push(availArr[i]);
//                     break;
//                 }
//                 if (sumtemp > 7) break;
//                 }
//                 break;
//             }
//             }
//             usum = 0;
//             for (let j: number = 0; j < this._down.length; j++) {
//             usum += (this._down[j] % 2) + 1;
//             if (usum === -1 * availArr[i]) {
//                 sumtemp = 0;
//                 for (let k: number = j + 1; k < this._up.length; k++) {
//                 sumtemp += (this._down[k] % 2) + 1;
//                 if (sumtemp === 6) {
//                     resDownArr.push(-1 * availArr[i]);
//                     break;
//                 }
//                 if (sumtemp > 6) break;
//                 }
//                 break;
//             }
//             }
//         } else if (availArr[i] > 0) {
//             for (let j: number = 0; j < this._up.length; j++) {
//             usum += (this._up[this._up.length - j - 1] % 2) + 1;
//             if (usum === availArr[i]) {
//                 sumtemp = 0;
//                 for (let k: number = j + 1;; k++) {
//                 if (this._up.length - k - 1 < 0) k = 0;
//                 sumtemp += (this._up[this._up.length - k - 1] % 2) + 1;
//                 if (sumtemp === 6) {
//                     resUpArr.push(availArr[i]);
//                     break;
//                 }
//                 if (sumtemp > 7) break;
//                 }
//                 break;
//             }
//             }
//             usum = 0;
//             for (let j: number = 0; j < this._down.length; j++) {
//             usum += (this._down[this._down.length - j - 1] % 2) + 1;
//             if (usum === availArr[i]) {
//                 sumtemp = 0;
//                 for (let k: number = j + 1; k < this._down.length; k++) {
//                 if (this._down.length - k - 1 < 0) k = 0;
//                 sumtemp += (this._down[this._down.length - k - 1] % 2) + 1;
//                 if (sumtemp === 6) {
//                     resDownArr.push(-1 * availArr[i]);
//                     break;
//                 }
//                 if (sumtemp > 6) break;
//                 }
//                 break;
//             }
//             }
//         }
//         }
//         return [resUpArr, resDownArr];
//     }

//     private _turning(uD: number, dD: number): void {
//         let uDeg: number = uD, dDeg: number = dD;
//         if (uDeg > 0) {
//         while (uDeg > 0) {
//             uDeg -= (this._up[this._up.length - 1] % 2) + 1;
//             this._up.splice(0, 0, this._up.pop()!);
//         }
//         } else {
//         while (uDeg < 0) {
//             uDeg += (this._up[0] % 2) + 1;
//             this._up.push(this._up.shift()!);
//         }
//         }

//         if (dDeg > 0) {
//         while (dDeg > 0) {
//             dDeg -= (this._down[0] % 2) + 1;
//             this._down.push(this._down.shift()!);
//         }
//         } else {
//         while (dDeg < 0) {
//             dDeg += (this._down[this._down.length - 1] % 2) + 1;
//             this._down.splice(0, 0, this._down.pop()!);
//         }
//         }
//     }

//     private _slash(): void {
//         let usum: number = 0, dsum: number = 0, ui: number = 0, di: number = 0;
//         for (let i: number = 0; i < this._up.length; i++) {
//         usum += (this._up[i] % 2) + 1;
//         if (usum === 6) break;
//         ui++;
//         }
//         for (let i: number = 0; i < this._down.length; i++) {
//         dsum += (this._down[i] % 2) + 1;
//         if (dsum === 6) break;
//         di++;
//         }
//         let newUp: number[] = this._up.slice(0, ui + 1);
//         let newDown: number[] = this._down.slice(0, di + 1);
//         newUp.push(...this._down.slice(di + 1, this._down.length).reverse());
//         newDown.push(...this._up.slice(ui + 1, this._up.length).reverse());
//         this._up = newUp;
//         this._down = newDown;
//     }

//     public scrSquare(): string {
//         this._up = [1, 2, 3, 4, 5, 6, 7, 8];
//         this._down = [9, 10, 11, 12, 13, 14, 15, 16];
//         const SCR_LENGTH = this._getRandomInt(12, 14);
//         let scr: string = '';
//         for (let i: number = 0; i < SCR_LENGTH; i++) {
//         let upTurn: number = this._generateAvailableTurns()[0]
//             [this._getRandomInt(0, this._generateAvailableTurns()[0].length)];
//         let downTurn: number = this._generateAvailableTurns()[1]
//             [this._getRandomInt(0, this._generateAvailableTurns()[1].length)];
//         while (upTurn === 0 && downTurn === 0) {
//             downTurn = this._generateAvailableTurns()[1]
//                 [this._getRandomInt(0, this._generateAvailableTurns()[1].length)];
//         }
//         scr += `(${upTurn}, ${downTurn})`;
//         this._turning(upTurn, downTurn);
//         if (i !== SCR_LENGTH - 1) {
//             scr += ' / ';
//             this._slash();
//         }
//         }
//         return scr;
//     }

//     scr2x2x2() {
//       const SCR_LENGTH = 10;
//       let res: string = '';
//       let prior: string = '';
//       let current: string = '';
//       let sfx:string = '';
//       for (let i = 0; i < SCR_LENGTH; i++) {
//         current = this._turns[this._getRandomInt(0, 3) * 2];
//         if (prior === current) {
//           i--;
//         } else {
//           sfx = this._suffix[this._getRandomInt(0, 3)];
//           res += current + sfx;
//           prior = current;
//         }
//       }
//       return res;
//     }
  
//     scr3x3x3 ({blind=false
//         //fm = false
//     }) {
//       let SCR_LENGTH = 25
//     //   fm ? 25 : 20
//       ;
//       let res: string = '';
//       let prior: string = '';
//       let priorIndex: number = -1;
//       let morePriorIndex:number = -1;
//       let currentIndex:number = -1;
//       let sign1: string = '';
//     //   let sign2: string = '';  //이건 없어도 작동
  
//       for (let i = 0; i < SCR_LENGTH; i++) {
//         currentIndex = this._getRandomInt(0, 6);
//         sign1 = this._turns[currentIndex];
//         if ((i !== 0 && prior === sign1) ||
//             ((!(i < 2) && Math.abs(currentIndex - priorIndex) === 1) &&
//                 this._turns[morePriorIndex] === sign1)) {
//           i--; //잘못 묶으면 B B' 같은 거 나옴
//           continue;
//         }
//         let sign2: any = this._suffix[this._getRandomInt(0, 3)];
//         morePriorIndex = priorIndex;
//         priorIndex = currentIndex;
//         prior = sign1;
//         //for BLD Mode
//         if (blind && i > SCR_LENGTH - 3) {
//           sign1 += 'w';
//         }
//         res += sign1 + sign2;
//       }
//       return res;
//     }

//     scr4x4x4({blind = false}) {
//       const SCR_LENGTH = 45;
//       let res = '';
//       let result = '';
//       let prior = '';
//       let priorIndex = -1;
//       let morepriorIndex = -1;
//       let moreprior = '';
//       let currentIndex = -1;
//       let nowIsW = false;
//       let priorIsW = false;
//       for (let i = 0; i < SCR_LENGTH; i++) {
//           currentIndex = this._getRandomInt(0, 6);
//           const sign1 = this._turns[currentIndex];
//           nowIsW = false;
//           if (sign1 === prior && prior === moreprior) {
//                     i--;
//                     continue;
//           }
//           if (i != 0 && prior === sign1) {
//             if (i > 15 && currentIndex % 2 === 0 && this._getRandomInt(0, 2) == 0) {
//                 if (!priorIsW) {
//                   nowIsW = true;
//                   priorIsW = true;
//                 } else {
//                   priorIsW = false;
//                 }
                
//               } else {
//                 i--;
//                 continue;
//               }
//           } else if (!(i < 2) && Math.abs(currentIndex - priorIndex) === 1 && this._turns[morepriorIndex] === sign1) {
//             i--;
//             continue;
              
//           } else {
//             if (i > 15 && currentIndex % 2 === 0 && this._getRandomInt(0, 3) <= 2) {
//                 if (!priorIsW) {
//                   nowIsW = true;
//                   priorIsW = true;
//                 } else {
//                   priorIsW = false;
//                 }
//               }
//           }
//           const sign2 = this._suffix[this._getRandomInt(0, 3)];
//           result += `${sign1}${nowIsW ? 'w' : ''}${sign2}`;

//           // console.log(result, '----', moreprior, prior, sign1)
//           morepriorIndex = priorIndex;
//           priorIndex = currentIndex;
//           prior = sign1;
//           moreprior = prior;
//           prior = sign1;
          
//       }
//       if (blind) {
//         res += this._view[this._getRandomInt(0, 3)] +
//             this._suffix[this._getRandomInt(0, 3)] +
//             this._view[this._getRandomInt(0, 3)] +
//             this._suffix[this._getRandomInt(0, 3)];
//       }
//       return result;
//     }

//     scr5x5x5({blind = false}) {
//       const SCR_LENGTH = 60;
//       let res = '';
//       let prior: string = '';
//       let priorIndex: number = -1;
//       let morePriorIndex: number = -1;
//       let currentIndex: number = -1;
//       let sign1: string = '', sign2: string = '', wsign: string = '';
  
//       for (let i = 0; i < SCR_LENGTH; i++) {
//         currentIndex = this._getRandomInt(0, 6);
//         sign1 = this._turns[currentIndex];
//         if ((i !== 0 && prior === sign1) ||
//             ((!(i < 2) && Math.abs(currentIndex - priorIndex) === 1) &&
//                 this._turns[morePriorIndex] === sign1)) {
//           if (this._getRandomInt(0, 5) < 2 && wsign !== 'w') {
//             wsign = 'w';
//           } else {
//             i--;
//             continue;
//           }
//         } else {
//           wsign = '';
//         }
//         sign2 = this._suffix[this._getRandomInt(0, 3)];
//         morePriorIndex = priorIndex;
//         priorIndex = currentIndex;
//         prior = sign1;
//         if (this._getRandomInt(0, 5) < 2) {
//           wsign = 'w';
//         }
//         if (blind && i > SCR_LENGTH - 3) {
//           sign1 = '3' + sign1;
//           wsign = 'w';
//         }
//         res += sign1 + wsign + sign2;
//       }
//       return res;
//     }
  
//     scr6x6x6() {
//       const SCR_LENGTH = 80;
//       let res: string = '';
//       let prior: string = '';
//       let priorIndex: number = -1;
//       let morePriorIndex: number = -1;
//       let currentIndex: number = -1;
//       let sign1: string = '', sign2: string = '', wsign: string = '';
  
//       for (let i = 0; i < SCR_LENGTH; i++) {
//         currentIndex = this._getRandomInt(0, 6);
//         sign1 = this._turns[currentIndex];
//         if ((i !== 0 && prior === sign1) ||
//             ((!(i < 2) && Math.abs(currentIndex - priorIndex) === 1) &&
//                 this._turns[morePriorIndex] === sign1)) {
//           if (this._getRandomInt(0, 5) < 2 && wsign !== 'w') {
//             wsign = 'w';
//           } else {
//             i--;
//             continue;
//           }
//         } else {
//           wsign = '';
//         }
//         sign2 = this._suffix[this._getRandomInt(0, 3)];
//         morePriorIndex = priorIndex;
//         priorIndex = currentIndex;
//         prior = sign1;
//         if (this._getRandomInt(0, 5) < 3) {
//           wsign = 'w';
//           if (currentIndex % 2 === 0 && this._getRandomInt(0, 2) === 1) {
//             sign1 = '3' + sign1;
//           }
//         }
//         res += sign1 + wsign + sign2;
//       }
//       return res;
//     }
  
//     scr7x7x7() {
//       const SCR_LENGTH = 100;
//       let res: string = '';
//       let prior: string = '';
//       let priorIndex: number = -1;
//       let morePriorIndex: number = -1;
//       let currentIndex: number = -1;
//       let sign1: string = '', sign2: string = '', wsign: string = '';
  
//       for (let i = 0; i < SCR_LENGTH; i++) {
//         currentIndex = this._getRandomInt(0, 6);
//         sign1 = this._turns[currentIndex];
//         if ((i !== 0 && prior === sign1) ||(
//             (!(i < 2) && Math.abs(currentIndex - priorIndex) === 1) &&
//                 this._turns[morePriorIndex] === sign1)) {
//           if (this._getRandomInt(0, 5) < 2 && wsign !== 'w') {
//             wsign = 'w';
//           } else {
//             i--;
//             continue;
//           }
//         } else {
//           wsign = '';
//         }
//         sign2 = this._suffix[this._getRandomInt(0, 3)];
//         morePriorIndex = priorIndex;
//         priorIndex = currentIndex;
//         prior = sign1;
//         if (this._getRandomInt(0, 5) < 3) {
//           wsign = 'w';
//           if (this._getRandomInt(0, 2) === 1) {
//             sign1 = '3' + sign1;
//           }
//         }
//         res += sign1 + wsign + sign2;
//       }
//       return res;
//     }
  
//     scrMegaminx() {
//       const SCR_LENGTH = 7 * 11;
//       let res: string = '';
//       for (let i = 1; i <= SCR_LENGTH; i++) {
//         if (i % 11 === 0) {
//           res += 'U' + this._suffix[this._getRandomInt(0, 2)] + '\n';
//         } else if ((i % 11) % 2 === 1) {
//           res += 'R' + this._megaSuffix[this._getRandomInt(0, 2)];
//         } else {
//           res += 'D' + this._megaSuffix[this._getRandomInt(0, 2)];
//         }
//       }
//       return res;
//     }
  
//     scrPyraminx() {
//       const SCR_LENGTH = 8;
//       let res: string = '';
//       let prior: string = '';
//       let current: string = this._pTurns[this._getRandomInt(0, 4)];
//       for (let i = 0; i < SCR_LENGTH; i++) {
//         while (prior === current) current = this._pTurns[this._getRandomInt(0, 4)];
//         res += current + this._suffix[this._getRandomInt(0, 2)];
//         prior = current;
//       }
//       let verLength = this._getRandomInt(0, 5);
//       for (let i = 0; i < verLength; i++) {
//         res += this._vertex[i] + this._suffix[this._getRandomInt(0, 2)];
//       }
//       return res;
//     }
  
//     scrSkewb() {
//       const SCR_LENGTH = 8;
//       let res: string = '';
//       let prior: string = '';
//       let current: string = this._pTurns[this._getRandomInt(0, 4)];
//       for (let i = 0; i < SCR_LENGTH; i++) {
//         while (prior === current) current = this._pTurns[this._getRandomInt(0, 4)];
//         res += current + this._suffix[this._getRandomInt(0, 2)];
//         prior = current;
//       }
//       return res;
//     }
    
    
//   }

module.exports = Scrambles;