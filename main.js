const name = 'Goldkindr'
let lvl = 1 //number
let exp = 0
let expToUp = 10
let _location = 'Деревня' // string
let isBeginner = true //boolean
let power = 10
let hp = 100
let gold = 0
lvl = 1
let statLog = function() {
    console.log(`Здоровье: ${hp}ХП, Уровень: ${lvl}, Опыт: ${exp}, До следующего уровня необходимо ${expToUp - exp} опыта`);
}




statLog()

const poison = {
    itemName: 'poison',
    itemImg: 'img/poison.png',
    itemType: 'potion',
    isSingleUse: true,
    itemAct: function() {
        ++power
        console.log('Вы нанесли Яд на оружие, теперь ваша сила', power)
    }
}
const heal = {
    itemName: 'heal',
    itemImg: 'img/heal.png',
    itemType: 'potion',
    isSingleUse: true,
    itemAct: function() {
        hp += 10
        console.log('Вы использовали аптечку, терь ваше здоровье', hp)
    }
}
const sword = {
    itemName: 'sword',
    itemImg: 'img/sword.png',
    itemType: 'arms',
    isSingleUse: false,
    itemAct: function() {

    }

}
const helmet = {
    itemName: 'helmet',
    itemImg: 'img/helmet.png',
    isSingleUse: false,
    itemType: 'head',
    itemAct: function() {

    }
}

const items = [poison, heal, sword, helmet]
const inventory = [sword, helmet, sword, helmet]

// Object
const mobZombie = {
    mobName: 'Зомби',
    mobExp: 5,
    mobPower: 5,
    mobImg: 'img/zombie.png'
}
const mobVampir = {
    mobName: 'Вампир',
    mobExp: 7,
    mobPower: 10,
    mobImg: 'img/vampire.png'
}
const mobVerwolf = {
    mobName: 'Вервульф',
    mobExp: 10,
    mobPower: 12,
    mobImg: 'img/werewolf.png'
}
const mobViking = {
    mobName: 'Викинг',
    mobExp: 10,
    mobPower: 5,
    mobImg: 'img/viking.png'
}
const mobTroll = {
    mobName: 'Троль',
    mobExp: 10,
    mobPower: 5,
    mobImg: 'img/troll.png'
}
const mobs = [mobZombie, mobVampir, mobVerwolf, mobViking, mobTroll]


const random = function(num = 1, maxNum) {
    return Math.floor(Math.random() * (maxNum - num) + num)
}
let lvlUp = function() {
    ++lvl;
    expToUp *= 3;
    console.log('Уровеь повышен')
}



const battleBtn = document.querySelector('#battle-btn')
const runBtn = document.querySelector('#run-btn')
const enemyImg = document.querySelector('#enemy-img')
const goldCounter = document.querySelector('#gold')
const hpCounter = document.querySelector('#hp')
const expCounter = document.querySelector('#exp')
const playerInvntory = document.querySelector('.player-invetory-inner')
const invntoryItem = document.createElement('img')

invntoryItem.className = 'inventory-item'



//Подгрузка иконок
const addInventoryIcon = (img) => {
    const newItem = playerInvntory.appendChild(invntoryItem.cloneNode())
    newItem.src = img
}


//Итерция корневого массива инветаря
const checkInventory = () => {
    for (ownItems of inventory) {
        addInventoryIcon(ownItems.itemImg)
    }
}

//Отслежывание кликов по элементам массива, удаление из корневого массива и удалиени аналагичного ДОМ элемента
const itemListener = () => {
    for (let index = 0; index < playerInvntory.children.length; index++) {
        playerInvntory.children[index].addEventListener('click', (event) => {
            if ((inventory[index] !== undefined) && (event.target == playerInvntory.children[index])) {
                inventory[index].itemAct()
                if (inventory[index].isSingleUse == true) {
                    inventory.splice(index, 1)
                    playerInvntory.children[index].remove()
                } else {
                    gearListener(inventory[index].itemType, index)
                }
                itemListener()
            }
        })
    }
}

checkInventory()
itemListener()

let fight = function() {
    const $mobId = mobs.findIndex(currentMob => { return currentMob.mobImg === enemyImg.attributes[1].textContent })
    isPlayerWiner = mobs[$mobId].mobPower - (power + lvl) <= 0
    isPlayerWiner ? console.log('Вы победили', mobs[$mobId].mobName, 'и получили', mobs[$mobId].mobExp, 'опыта.') :
        console.log(`Вы проиграли бой с ${mobs[$mobId].mobName}, и потеряли ${mobs[$mobId].mobPower}ХП.`)
    if (isPlayerWiner) { exp += mobs[$mobId].mobExp, pickItem(random(0, items.length)) } else { hp -= mobs[$mobId].mobPower }
    if (exp >= expToUp) { lvlUp() }
    if (hp <= 0) { alert('Ваш персонаж погиб, игра окончена') }
    newEnemy()
}
const run = function() {
    newEnemy()
}

const pickItem = function(itemId) {
    if (itemId >= 0 && itemId <= items.length) {
        inventory.push(items[itemId])
        addInventoryIcon(items[itemId].itemImg)
        console.log('Вы подобрали', items[itemId].itemName)
        itemListener()
    } else { console.log('Вы ничего не нашли') }
}

setInterval(() => {
    goldCounter.textContent = `${gold} Золота`
    hpCounter.textContent = `${hp} ХП`
    expCounter.textContent = `${exp} Опыта`
}, 1)

const newEnemy = () => enemyImg.src = mobs[(random(0, mobs.length))].mobImg


battleBtn.onclick = () => fight()
runBtn.onclick = () => run()


const head = {
    gearType: 'head',
    isEquiped: false,
    gearItem: undefined,
}
const chest = {
    gearType: 'chest',
    isEquiped: false,
    gearItem: undefined,
}
const legs = {
    gearType: 'legs',
    isEquiped: false,
    gearItem: undefined,
}
const arms = {
    gearType: 'arms',
    isEquiped: false,
    gearItem: undefined,
}
const gear = [head, chest, legs, arms]


const gearListener = (type, value) => {
    for (let index = 0; index < gear.length; index++) {
        if (gear[index].gearType === type && gear[index].isEquiped == false) {
            gear[index].isEquiped = true
            const realatedItem = items.findIndex(prop => {
                return prop.itemType == gear[index].gearType
            })
            console.log(realatedItem)
            gear[index].gearItem = items[realatedItem].itemImg
            inventory.splice(value, 1)
            playerInvntory.children[value].remove()
            console.log(`Вы надели ${items[realatedItem].itemName}`)
        } else if (gear[index].gearType === type && gear[index].isEquiped !== false) {
            console.log('Предмет уже надет')
        }
    }
}