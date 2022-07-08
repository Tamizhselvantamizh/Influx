let itemMaster = []
let userCart = []
let codeIndex = {}

const addItem = (item) => {
    if(codeIndex[String(item.code)] || codeIndex[String(item.code)] == 0) {
        return "Item code already exist"
    }
    itemMaster.push(item)
    codeIndex[String(item.code)] = itemMaster.length - 1
}

const addItemToCart = (item) => {
    if(!(codeIndex[String(item.code)] || codeIndex[String(item.code)] == 0)) {
        return "Invalid item"
    }

    let unitPrice = itemMaster[codeIndex[String(item.code)]].price
    item["unitPrice"] = unitPrice
    item["totalAmt"] = item.qty * unitPrice
    userCart.push(item)
}

const getUserCartSummary = () => {
    let reff = {
    }

    let summary = []

    for(let i=0; i<userCart.length; i++) {
        if(reff[String(userCart[i].code)] || reff[String(userCart[i].code)] == 0) {
            let ptr = reff[String(userCart[i].code)]
            let qty = summary[ptr].qty +  userCart[i].qty
            let totalAmt = summary[ptr].totalAmt +  userCart[i].totalAmt
            summary[ptr]["qty"] = qty
            summary[ptr]["totalAmt"] = totalAmt
        }else {
            summary.push(userCart[i])
            reff[String(userCart[i].code)] = i
        }
    }

    return summary
}
