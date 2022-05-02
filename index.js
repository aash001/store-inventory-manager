const inventoryDisplayTable = document.querySelector("tbody")
const submitButton = document.querySelector(".button")
const newItemForm = document.querySelector("form")
const nextButton = document.querySelector("#next")
const previousButton = document.querySelector("#previous")

let itemInformation = {};
let itemDisplayArray = [];

newItemForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    itemInformation = {
        itemName: formData.get("item-name"),
        itemSellIn: +formData.get("sell-in"),
        itemQuality: +formData.get("item-quality"),
        itemCategory: getCategory(formData.get("item-name"))
    }
    itemDisplayArray.push(itemInformation);
    console.log(itemDisplayArray)

    const tableNewInventoryItem = document.createElement("tr");
    tableNewInventoryItem.innerHTML = `
    <td class="item-name">${itemInformation.itemName}</td>
    <td class="item-sell-in">${itemInformation.itemSellIn}</td>
    <td>${itemInformation.itemQuality}</td>
    `
    tableNewInventoryItem.classList.add("custom-inventory-item");
    inventoryDisplayTable.append(tableNewInventoryItem);
})

nextButton.addEventListener("click", () => {
    specialQuality();
    limitQuality();
    sellIn();
    sellOut();
})


function getCategory(itemName) {
    if (itemName.includes("Aged Brie")) {
        return "aged"
    } else if (itemName.includes("Backstage")) {
        return "backstage"
    } else if (itemName.includes("Sulfuras")) {
        return "sulfuras"
    } else if (itemName.includes("Conjured")) {
        return "conjured"
    } else {
        return "none"
    }
}

function sellIn() {
    itemDisplayArray.forEach(object => {
        const newInventoryItem = document.querySelector(".custom-inventory-item");
        newInventoryItem.innerHTML = `
        <td class="item-name">${object.itemName}</td>
        <td class="item-sell-in">${(object.itemSellIn - 1)}</td>
        <td>${object.itemQuality}</td>
        `
        console.log(itemDisplayArray)
        object.itemSellIn--;
        inventoryDisplayTable.append(newInventoryItem)
    })
}

function specialQuality() {
    itemDisplayArray.forEach(object => {
        if (object.itemCategory === "aged") {
            object.itemQuality = object.itemQuality + 3
        } else if (object.itemCategory === "backstage") {
            object.itemQuality = object.itemQuality + 1
        } else if (object.itemCategory === "sulfuras") {
            object.itemQuality = object.itemQuality
        } else if (object.itemCategory === "conjured") {
            object.itemQuality = object.itemQuality - 2
        }
    })
}

function sellOut() {
    itemDisplayArray.forEach(object => {
        if (object.itemSellIn <= 0 && object.itemCategory === "none") {
            object.itemQuality = object.itemQuality - 2
        } else {
            object.itemQuality--
        }
    })
}

function limitQuality() {
    itemDisplayArray.forEach(object => {
        if (object.itemQuality >= 50) {
            return object.itemQuality === 50
        } else if (object.itemQuality <= 0) {
            return object.itemQuality === 0
        } else {
            object.itemQuality = object.itemQuality
        }
    })
}