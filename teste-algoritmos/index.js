// 1) Implemente um método que crie um novo array baseado nos valores passados.
function createArray(number, char) {
    let array = []
    for (let i = 0; i < number; i++)
        array.push(char)
    
    return array
}
console.log(createArray(3, 'a'))


// 2) Implemente um método que inverta um array, não utilize métodos nativos do array.
function reverseArray(array) {
    let novoArray = []
    while (array.length > 0)
        novoArray.push(array.pop())

    return novoArray
}
console.log(reverseArray([1, 2, 3, 4]))


// 3) Implemente um método que limpe os itens desnecessários de um array (false, undefined, strings vazias, zero, null).
function removeNullElements(array) {
    const newArray = array.filter(element=> {
        return element != null && element != false
    })

    return newArray
}
console.log(removeNullElements([1, 2, '', undefined]))


// 4) Implemente um método que a partir de um array de arrays, converta em um objeto com chave e valor.
function convertToKeyValue(array) {
    const newArray = Object.fromEntries(array)

    return newArray
}
console.log(convertToKeyValue([["c", 2], ["d", 4]]))


// 5) Implemente um método que retorne um array, sem os itens passados por parâmetro depois do array de entrada.
function removeElements(array, number1, number2) {
    let newArray = array.filter(element => {
        return element != number1 && element != number2
    })

    return newArray
}
console.log(removeElements([5, 4, 3, 2, 5], 5, 3))


// 6) Implemente um método que retorne um array, sem valores duplicados.
function removeDuplicateElements(array) {
    newArray = Array.from(new Set(array))

    return newArray
}
console.log(removeDuplicateElements([1,2,3,3,2,4,5,4,7,3]))


// 7) Implemente um método que compare a igualdade de dois arrays e retorne um valor booleano.
function isEqual(array1, array2) {
    if (array1.lenght != array2.lenght)
        return false
    for (let i = 0; i < array1.lenght; i++)
        if (array1[i] != array2[i])
            return false

    return true
}
console.log(isEqual([1, 2, 3, 4], [1, 2, 3, 4]))


// 8) Implemente um método que remova os aninhamentos de um array de arrays para um array unico.
function removeBrackets(array) {
    const auxArray = [];
    const newArray = array.map(element => auxArray.push(element));
  
    return newArray;
}
console.log(removeBrackets([1, 2, [3], [4, 5]]))


// 9) Implemente um método divida um array por uma quantidade passada por parâmetro.
function divideArray(array, number) {
    let newArray = []

    for (let i = 0; i < array.length; i += number)
        newArray.push(array.slice(i, i + number))

    return newArray
}
console.log(divideArray([1, 2, 3, 4, 5], 2))


// 10) Implemente um método que encontre os valores comuns entre dois arrays.
function commonValues(array1, array2) {
    const newArray = array1.filter(element => array2.includes(element))
  
    return newArray;
}
console.log(commonValues([6, 8], [8, 9]))