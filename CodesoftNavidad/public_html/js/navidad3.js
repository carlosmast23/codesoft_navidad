/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

matriz = new Array();
for (i = 0; i < 3; i++) {
    matriz[i] = new Array()
    for (j = 0; j < 3; j++) {
        matriz[i][j] = "[" + i + "," + j + "]";
    }
}

for (i = 0; i < 3; i++) {
    for (j = 0; j < 3; j++) {
        console.log(matriz[i][j]);
    }
}
