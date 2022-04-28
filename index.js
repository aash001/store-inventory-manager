const inventoryDisplayTable = document.querySelector("tbody")
const submitButton = docuemnt.querySelector(".button")
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
        itemSellIn: +formData.get("item-sell-in"),
        itemQuality: +formData.get("item-quality"),
        itemCategory: getCategory(formData.get("item name"))
    }
    itemDisplayArray.push(itemInformation);

    const newInventoryItem = document.createElement("tr");
    newInventoryItem.innerHTML = `
    <td class="item-name">${itemInformation.itemName}</td>
    <td class="item-sell-in">${itemInformation.itemSellIn}</td>
    <td>${itemInformation.itemQuality}</td>
    `
    newInventoryItem.classList.add("custom-inventory-item");
    inventoryDisplayTable.append(newInventoryItem);
})

nextButton.addEventListener("click", () => {
    subtractValues();
})

function getCategory(itemName) {
    if (itemName.includes("Aged Brie")) {
        return "aged"
    } else if (itemName.includes("Backstage")) {
        return "backstage"
    } else if (itemName.includes("Sulfuras")) {
        return "sulfurus"
    } else if (itemName.includes("Conjured")) {
        return "conjured"
    }
}

function subtractionValues() {
    let sellInValues = document.querySelectorAll("tr");
    sellInValues.textContent = "";
    itemDisplayArray.forEach(object => {
        const newInventoryItem = document.querySelector(".customer-inventory-item");
        newInventoryItem.innerHTML = `
        <td class="item-name">${object.itemName}</td>
        <td class="item-sell-in">${(object.itemSellIn - 1)}</td>
        <td>${object.itemQuality}</td>
        `
        object.itemSellIn--;
        inventoryDisplayTable.append(newInventoryItem)
    })
}